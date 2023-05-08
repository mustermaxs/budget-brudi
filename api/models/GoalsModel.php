<?php

require_once getcwd() . "/api/BaseModel.php";

class GoalsModel extends BaseModel
{
    public function createNewGoal($accountId, $goaltitle, $amount, $date, $color) // should it be really $goalTitle? and not the ID?
    {
        try {
            $query = "INSERT INTO Goal (F_accountID, title, amount, date, color)
        VALUES (?, ?, ?, ?, ?)";

            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("dsdss", $accountId, $goaltitle, $amount, $date, $color);
            $stmt->execute();
            $goalId = $stmt->insert_id; //returns the autoincrement ID Nr

            return ServiceResponse::send(array("goalId"=>$goalId));
        } catch (mysqli_sql_exception $e) {
            return ServiceResponse::send($e);
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


    public function getGoalsByAccountID($accountID)
    {
        try {
            $query = "SELECT * FROM Goal 
        WHERE F_accountID = ?";


            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("d", $accountID);
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
            $query = "UPDATE Goals SET title=?, amount=?, date=?, color=?
            WHERE F_accountID=? AND goalID=?";

            $stmt = $this->conn->prepare($query);
            $result = $stmt->execute([$title, $amount, $date, $color, $accountId, $goalId]);

            return ServiceResponse::send(array("result"=>$result));

        } catch (mysqli_sql_exception $e) {
            return ServiceResponse::send($e);
        }
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
