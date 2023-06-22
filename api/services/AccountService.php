<?php

require_once getcwd() . "/api/BaseService.php";

class AccountService extends BaseService
{
    public function getAccountOverviewById($accountId)
    {
        try {
            $query = "
        SELECT a.* FROM Account a
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

    public function getBalanceInTimeSpan($accountId, $dateStart, $dateEnd)
    {
        
    }
}
