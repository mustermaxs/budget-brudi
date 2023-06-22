<?php

require_once getcwd() . "/api/BaseController.php";
require_once getcwd() . "/api/services/AccountService.php";

class AccountsController extends BaseController
{
    protected function init()
    {
        $this->service = new AccountService();
    }

    private function getBalanceByDate()
    {
        $res = null;

        if (
            isset($this->request["start"])
            &&
            isset($this->request["end"])
        ) {
            $startDate = $this->request["start"];
            $endDate = $this->request["end"];
            $accountId = $this->request["accountId"];

            $res = $this->service->getBalanceByMonthYearAccountId($accountId, $startDate, $endDate);
        }

        if ($res != null && $res->ok)
            Response::successResponse("fetched transactions in timespan successfully", $res->data);

        Response::errorResponse("fetching transactions in timespan failed", $res);
    }

    public function get()
    {

        $this->prohibitForeignUserAccess();

        if (isset($this->request["method"]) && $this->request["method"] == "timespan")
            $res = $this->getBalanceByDate();

        else
            $res = $this->service->getAccountOverviewById($this->request["accountId"]);

        if (!$res->ok)
            Response::errorResponse($res->message);

        Response::successResponse("successfully loaded account details", $res->data);
    }
}
