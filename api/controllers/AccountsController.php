<?php

require_once getcwd() . "/api/BaseController.php";
require_once getcwd() . "/api/models/AccountModel.php";

class AccountsController extends BaseController
{
    protected function init()
    {
        $this->model = new AccountModel();
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

            return $this->model->getBalanceByMonthYearAccountId($month, $year, $accountId);
        }
        else
            return null;
    }

    public function get()
    {
        if (isset($this->request["method"]) && $this->request["method"] == "date")
            $data = $this->getBalanceByDate();

        else
            $data = $this->model->getAccountOverviewById($this->request["accountId"]);

        if ($data == null)
            Response::errorResponse("loading account details failed");

        Response::successResponse("successfully loaded account details", $data);
    }
}
