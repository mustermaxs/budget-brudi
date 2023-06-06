<?php

require_once getcwd() . "/api/BaseService.php";

class AccountService extends BaseService
{
    public function getAccountOverviewById($accountId)
    {
        try {
            $query = "
        SELECT a.Balance as balance, SUM(e.Amount) as expenses, SUM(i.Amount) as income
        FROM Account a
        JOIN Expense e ON e.F_accountID = a.AccountId
        JOIN Income i ON i.F_accountID = a.AccountId
        WHERE a.AccountId = ?;";

            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("d", $accountId);
            $stmt->execute();
            $result = $stmt->get_result();

            $accountOverview = $result->fetch_array(MYSQLI_ASSOC);

            return ServiceResponse::send($accountOverview);
        } catch (Exception $e) {
            return ServiceResponse::send($e);
        }
    }

    public function getBalanceByMonthYearAccountId($month, $year, $accountId)
    {
        try {
            $query = "
        SELECT (SELECT SUM(i.Amount) FROM Income i WHERE i.F_accountID = ? AND MONTH(i.date) = ? AND YEAR(i.date) = ?) 
       + 
       (SELECT SUM(e.Amount) FROM Expense e WHERE e.F_accountID = ? AND MONTH(e.date) = ? AND YEAR(e.date) = ?) 
       AS balance";

            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("dssdss", $accountId, $month, $year, $accountId, $month, $year);
            $stmt->execute();
            $result = $stmt->get_result();

            $balance = $result->fetch_array(MYSQLI_ASSOC);
            $balance["year"] = $year;
            $balance["month"] = $month;


            return ServiceResponse::send($balance);
        } catch (Exception $e) {
            return ServiceResponse::send($e);
        }
    }
}
