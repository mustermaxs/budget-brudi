<?php

require_once getcwd() . "/api/BaseController.php";
require_once getcwd() . "/api/services/TransactionsService.php";
require_once getcwd() . "/api/services/SavingsService.php";

class TransactionsController extends BaseController
{
    private SavingsService $savingsService;

    protected function init()
    {
        $this->service = new TransactionsService();
        $this->savingsService = new SavingsService();
    }

    private function getExpenses()
    {
        if (isset($this->request["id"]))
            return $this->service->getExpenseByExpenseId($this->request["id"], $this->request["limit"] ?? null);

        else
            return $this->service->getExpenseByAccountId($this->request["accountId"]);
    }

    private function getIncomes()
    {
        if (isset($this->request["id"]))
            return $this->service->getIncomeByIncomeID($this->request["id"], $this->request["limit"] ?? null);

        else
            return $this->service->getIncomeByAccountId($this->request["accountId"]);
    }

    private function getSavedAmount()
    {
        $income = $this->request["amount"];
        $res = $this->savingsService->getSavingsSettings($this->request["accountId"]);

        if ($res->ok)
            $res->data["savedAmount"] = $income * ($res->data["incomePercentage"] / 100);

        return $res;
    }

    private function incomeHandler()
    {
        $savedAmountRes = $this->getSavedAmount();

        return $this->savingsService->shareAmount($this->request["accountId"], $savedAmountRes->data["savedAmount"]);
    }

    public function get()
    {
        if (@$this->request["summary"] == "timespan")
            $response = $this->service->getTransactionsInTimeSpan($this->request["accountId"], $this->request["start"], $this->request["end"]);

        else if (!isset($this->request["type"]))     // /api/transactions/  -> get all transactions
            $response = $this->service->getAllTransactionsByAccountId($this->request["accountId"], $this->request["limit"]);

        else if ($this->request["type"] == "expense")
            $response = $this->getExpenses();

        else if ($this->request["type"] == "income")
            $response = $this->getIncomes();

        else
            Response::errorResponse("transaction type invalid");

        if (!$response->ok)
            Response::errorResponse("fetching transactions failed", $response);

        Response::successResponse("data loaded successfully", $response->data);
    }

    // TODO
    public function post()
    {
        if (
            @$this->request["type"]
            && @$this->request["amount"]
            && @$this->request["date"]
            && @$this->request["title"]
            && @$this->request["categoryID"]
        ) {

            if ($this->request["type"] == "income") {
                $createIncomeRes = $this->service->createIncome($this->request["accountId"], $this->request["categoryID"], $this->request["title"], $this->request["date"], $this->request["amount"]);

                if ($createIncomeRes->ok)
                    $res = $this->incomeHandler();
            } else if ($this->request["type"] == "expense")
                $res = $this->service->createNewExpense($this->request["accountId"], $this->request["categoryID"], $this->request["title"], $this->request["date"], $this->request["amount"]);

            if ($res->ok)
                Response::successResponse("created new transaction");
        }

        Response::errorResponse("creating new transaction failed", $res);
    }

    public function put()
    {
        if (
            @$this->request["type"]
            &&  @$this->request["id"]
            && @$this->request["amount"]
            && @$this->request["date"]
            && @$this->request["title"]
            && @$this->request["categoryID"]
        ) {

            if ($this->request["type"] == "income")
                $response = $this->service->updateIncome($this->request["id"], $this->request["categoryID"], $this->request["title"], $this->request["date"], $this->request["amount"]);

            else if ($this->request["type"] == "expense")
                $response = $this->service->updateExpense($this->request["id"], $this->request["categoryID"], $this->request["title"], $this->request["date"], $this->request["amount"]);

            if ($response->ok)
                Response::successResponse("transaction Updated");
        }

        Response::errorResponse("Updating transaction failed", $response);
    }
}
