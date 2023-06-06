<?php

require_once getcwd() . "/api/BaseController.php";
require_once getcwd() . "/api/services/TransactionsService.php";

class TransactionsController extends BaseController
{
    protected function init()
    {
        $this->service = new TransactionsService();
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

    public function get()
    {
        if (!isset($this->request["type"]))     // /api/transactions/  -> get all transactions
            $response = $this->service->getAllTransactionsByAccountId($this->request["accountId"], $this->request["limit"]);

        else if ($this->request["type"] == "expenses")
            $response = $this->getExpenses();

        else if ($this->request["type"] == "income")
            $response = $this->getIncomes();

        else 
            Response::errorResponse("transaction type invalid");

        if (!$response->ok)
            Response::errorResponse($response->message);
        
        Response::successResponse("data loaded successfully", $response->data);

    }

    // TODO
    public function post()
    {
        if (@$this->request["type"]
        && @$this->request["amount"]
        && @$this->request["date"]
        && @$this->request["title"]
        && @$this->request["categoryID"])
        {
            $insertedId = null;

            if ($this->request["type"] == "income")
                $insertedId = $this->service->createIncome($this->request["accountId"], $this->request["categoryID"], $this->request["title"], $this->request["date"], $this->request["amount"]);

            else if ($this->request["type"] == "expense")
                $insertedId = $this->service->createNewExpense($this->request["accountId"], $this->request["categoryID"], $this->request["title"], $this->request["date"], $this->request["amount"]);
            
            if ($insertedId >= 1)
                Response::successResponse("created new transaction");
        }

        Response::errorResponse("creating new transaction failed");
    }
}