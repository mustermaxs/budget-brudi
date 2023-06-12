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
            isset($this->request["month"])
            &&
            isset($this->request["year"])
        ) {
            $year = $this->request["year"];
            $month = $this->request["month"];
            $accountId = $this->request["accountId"];

            $res = $this->service->getBalanceByMonthYearAccountId($month, $year, $accountId);
        }

        if ($res != null && $res->ok)
            Response::successResponse("fetched account balance successfully", $res->data);

        Response::errorResponse("fetching account balance failed", $res->message);
    }

    public function get()
    {

        $this->prohibitForeignUserAccess();

        if (isset($this->request["method"]) && $this->request["method"] == "date")
            $res = $this->getBalanceByDate();

        else
            $res = $this->service->getAccountOverviewById($this->request["accountId"]);

        if (!$res->ok)
            Response::errorResponse($res->message);

        Response::successResponse("successfully loaded account details", $res->data);
    }
}
