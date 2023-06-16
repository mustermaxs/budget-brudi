<?php

require_once getcwd() . "/api/BaseService.php";

class SavingsService extends BaseService
{


    public function updateSavingSettings($accountId, $incomePercentage, $mode, $nbrOfGoals, $shares) //  $shares will be for all selected goals
    {
        try {
            $this->conn->begin_transaction();

            // Update Account settings
            $query = "UPDATE SavingsSettings SET incomePercentage = ?, mode = ?, nbrOfincludedGoals = ? WHERE F_accountID = ?";
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

    public function getSavingPercentage($accountId)
    {
        try {
            $query = "SELECT incomePercentage FROM SavingsSettings
            WHERE F_accountID = ?";


            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("d", $accountId);
            $stmt->execute();
            $result = $stmt->get_result();
            // $data = $result->fetch_array(MYSQLI_ASSOC);

            return ServiceResponse::success($data);
        } catch (mysqli_sql_exception $e) {
            return ServiceResponse::fail($e);
        }
    }

    public function getSavedAmount($incomeId, $accountId)
    {
        $income = getIncomebyIncomeId($incomeId);
        $percentage = $this->getSavingPercentage($accountId);

        $savedAmount = $income * ($percentage / 100);

        return $savedAmount;
    }

    public function getShares($accountId)
    {

        try {
            $query = "SELECT * FROM goal WHERE F_accountID = ?";

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

    public function shareAmount($incomeId, $accountId)
    {
        $savedAmount = $this->getSavedAmount($incomeId, $accountId);
        $shares[] = $this->getShares($accountId);

        $this->conn->begin_transaction();

        try {
            foreach ($shares as $share) {
                $savedAmountGoal = $savedAmount * ($share["share"] / 100);


                $query = "UPDATE Goal SET savedAmount = savedAmount + ?
                WHERE F_accountID = ? AND GoalID = ?";

                $stmt = $this->conn->prepare($query);
                $stmt->bind_param("ddd", $savedAmountGoal, $incomeId, $accountId);
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


/**
 * SELECT * FROM GoalShares WHERE F_accountID = ?
 * [
 *      goal,
 *      goal,
 *      goal,
 *         ...
 * ]
 */
