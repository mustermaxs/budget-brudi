<?php

require_once getcwd() . "/api/BaseService.php";

class GoalsService extends BaseService
{
    public function getGoalCountByAccountID($accountID)
    {
        try {
            $query = "
            SELECT COUNT(*) as count FROM Goal
            WHERE F_accountID = ?
            AND Date >= CURDATE()
            AND savedAmount < Amount;";

            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("d", $accountID);
            $stmt->execute();
            $result = $stmt->get_result();
            $data = $result->fetch_assoc();

            return $data['count'];
        } catch (mysqli_sql_exception $e) {
            return -1;
        }
    }

    public function createNewGoal($accountId, $goaltitle, $amount, $date, $color) // should it be really $goalTitle? and not the ID?
    {
        // $currentCount = $this->getGoalCountByAccountID($accountId);
        // if ($currentCount >= 5) {
        //     throw new Exception("Goal limit reached. You cannot have more than 5 goals.");
        //     return ServiceResponse::error("Goal limit reached. You cannot have more than 5 goals.", 403); // 403 Forbidden
        // }


        try {
            $query = "INSERT INTO Goal (F_accountID, title, amount, date, color)
            VALUES (?, ?, ?, ?, ?)";

            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("dsdss", $accountId, $goaltitle, $amount, $date, $color);
            $stmt->execute();
            $goalId = $stmt->insert_id; //returns the autoincrement ID Nr

            return ServiceResponse::send(array("goalId" => $goalId));
        } catch (mysqli_sql_exception $e) {
            return ServiceResponse::send($e);

            // } catch (Exception $e) {
            // return ServiceResponse::send($e);
        }
    }


    public function getGoalByID($GoalID)
    {
        try {
            $query = "SELECT * FROM Goal 
        WHERE GoalID = ?";


            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("d", $GoalID);
            $stmt->execute();
            $result = $stmt->get_result();
            $data = $result->fetch_array(MYSQLI_ASSOC);


            return ServiceResponse::send($data);
        } catch (mysqli_sql_exception $e) {
            return ServiceResponse::send($e);
        }
    }

    public function getGoalsByAccountID($accountID, $limit = 5)
    {
        try {
            $query = "SELECT * FROM Goal 
        WHERE F_accountID = ?
        ORDER BY Date
        LIMIT ?;";

            $limit = $limit ?? 10;

            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("dd", $accountID, $limit);
            $stmt->execute();
            $result = $stmt->get_result();
            $rows = [];

            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }

            return ServiceResponse::send($rows);
        } catch (mysqli_sql_exception $e) {
            return ServiceResponse::send($e);
        }
    }
    public function getUpcomingGoals($accountID, $limit = 5)
    {
        try {
            $query = "SELECT * FROM Goal 
        WHERE F_accountID = ?
        AND savedAmount < Amount
        AND CURDATE() <= Date
        ORDER BY Date
        LIMIT ?;";

            $limit = $limit ?? 10;

            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("dd", $accountID, $limit);
            $stmt->execute();
            $result = $stmt->get_result();
            $rows = [];

            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }

            return ServiceResponse::send($rows);
        } catch (mysqli_sql_exception $e) {
            return ServiceResponse::send($e);
        }
    }

    public function updateGoal($accountId, $goalId, $title, $amount, $date, $color)
    {
        try {
            $query = "UPDATE Goal SET title = ?, amount = ?, date = ?, color = ?
            WHERE F_accountID = ? AND goalID = ?";

            $stmt = $this->conn->prepare($query);
            $result = $stmt->execute([$title, $amount, $date, $color, $accountId, $goalId]);

            return ServiceResponse::send(array("result" => $result));
        } catch (mysqli_sql_exception $e) {
            return ServiceResponse::send($e);
        }
    }


    //Update Goal with share % 
    public function updateShare($goalID, $share)
    {
        try {
            // All the updates are made within begin_transaction --> 
            //if an error occurs there will be a rollback and the update will be undone. 
            //if no error occurs: changes are saved 
            $this->conn->begin_transaction();

            $query = "UPDATE Goal SET share = ? WHERE GoalID = ?";

            $stmt = $this->conn->prepare($query);

            $stmt->bind_param("dd", $share, $goalID);
            $stmt->execute();

            $this->conn->commit();

            return ServiceResponse::success();
        } catch (mysqli_sql_exception $e) {
            $this->conn->rollback();
            return ServiceResponse::send($e);
        }
    }

    public function updateMultipleShares($goals, $accountId)
    {

        $this->conn->begin_transaction();

        try {
            $query = "UPDATE Goal SET share = 0 WHERE F_accountID = ?";

            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("d", $accountId);
            $stmt->execute();
        } catch (Exception $e) {
            $this->conn->rollback();
            return ServiceResponse::fail($e);
        }

        $this->conn->commit();

        foreach ($goals as $goal) {
            $response = $this->updateShare($goal['GoalID'], $goal['share']);
            if (!$response->ok) {
                return $response;  // return immediately if any update fails
            }
        }

        return ServiceResponse::success();
    }

    public function deleteGoal($goalId)
    {
        try {
            $query = "DELETE FROM Goal WHERE GoalID = ?";

            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("d", $goalId);
            $stmt->execute();

            return ServiceResponse::success();
        } catch (mysqli_sql_exception $e) {
            return ServiceResponse::send($e);
        }
    }
}
