<?php

require_once getcwd() . "/api/BaseService.php";

class SavingsService extends BaseService
{


    public function updateSavingSettings($accountId, $incomePercentage, $mode, $nbrOfGoals, $shares) //  $shares will be for all selected goals
    {
        try {
            $this->conn->begin_transaction();

            // Update Account settings
            $query = "UPDATE savingssettings SET incomePercentage = ?, mode = ?, nbrOfincludedGoals = ? WHERE AccountId = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("dsii", $incomePercentage, $mode, $nbrOfGoals, $accountId);
            $stmt->execute();

            $this->conn->commit();
            return ServiceResponse::success();
        } catch (mysqli_sql_exception $e) {
            $this->conn->rollback();
            return ServiceResponse::send($e);
        }
    }
    /*
SavingsSetting
ADD COLUMN percentage INT,     // how much percentage of the whole amount will be designated for the goals
ADD COLUMN mode VARCHAR(30),   //         // equally or incrementally?
ADD COLUMN nbrOfGoals INT;                // to how many goals the amount will be splitt ?
*/
    public function getSavingsSettings($accountId)
    {
        try {
            $query = "SELECT * FROM SavingsSettings 
        WHERE F_accountID = ?";


            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("d", $accountId);
            $stmt->execute();
            $result = $stmt->get_result();
            $data = $result->fetch_array(MYSQLI_ASSOC);

            return ServiceResponse::send($data);
        } catch (mysqli_sql_exception $e) {
            return ServiceResponse::send($e);
        }
    }


    public function getShares($accountId)
    {

        try {
            $query = "CALL getShares(?)";

            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("d", $accountId);
            $stmt->execute();
            $result = $stmt->get_result();
            $data = $result->fetch_array(MYSQLI_ASSOC);

            return ServiceResponse::success($data);
        } catch (mysqli_sql_exception $e) {
            return ServiceResponse::fail($e);
        }
    }

    public function shareAmount($accountId, $savedAmount)
    {

        $shares[] = $this->getShares($accountId)->data;
        $this->conn->begin_transaction();

        try {
            foreach ($shares as $share) {
                $savedAmountGoal = $savedAmount * ($share["share"] / 100);

                $query = "UPDATE Goal SET savedAmount = savedAmount + ?
                WHERE GoalID = ?";

                $stmt = $this->conn->prepare($query);
                $stmt->bind_param("dd", $savedAmountGoal, $share["GoalID"]);
                $stmt->execute();
            }

            $this->conn->commit();
            return ServiceResponse::success();
        } catch (mysqli_sql_exception $e) {
            $this->conn->rollback();
            return ServiceResponse::fail($e);
        }
    }
}
