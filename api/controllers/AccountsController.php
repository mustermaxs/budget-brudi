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
        if (
            isset($this->request["month"])
            &&
            isset($this->request["year"])
        ) {
            $year = $this->request["year"];
            $month = $this->request["month"];
            $accountId = $this->request["accountId"];

            return $this->service->getBalanceByMonthYearAccountId($month, $year, $accountId);
        }
        else
            return null;
    }

    public function get()
    {
        if (isset($this->request["method"]) && $this->request["method"] == "date")
            $res = $this->getBalanceByDate();

        else
            $res = $this->service->getAccountOverviewById($this->request["accountId"]);

        if (!$res->ok)
            Response::errorResponse($res->message);

        Response::successResponse("successfully loaded account details", $res->data);
    }
}
