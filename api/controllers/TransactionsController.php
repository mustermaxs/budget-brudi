<?php

require_once getcwd() . "/api/BaseController.php";
require_once getcwd() . "/api/models/TransactionsModel.php";

class TransactionsController extends BaseController
{
    protected function init()
    {
        $this->model = new TransactionsModel();
    }

    private function getExpenses()
    {
        if (isset($this->request["id"]))
            return $this->model->getExpenseByExpenseId($this->request["id"], $this->request["limit"] ?? null);
        
        else
            return $this->model->getExpenseByAccountId($this->request["accountId"]);       
    }

    private function getIncomes()
    {
        if (isset($this->request["id"]))
            return $this->model->getIncomeByIncomeID($this->request["id"], $this->request["limit"] ?? null);
        
        else
            return $this->model->getIncomeByAccountId($this->request["accountId"]);       
    }

    public function get()
    {
        if (!isset($this->request["type"]))     // /api/transactions/  -> get all transactions
            $response = $this->model->getAllTransactionsByAccountId($this->request["accountId"], $this->request["limit"]);

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
                $insertedId = $this->model->createIncome($this->request["accountId"], $this->request["categoryID"], $this->request["title"], $this->request["date"], $this->request["amount"]);

            else if ($this->request["type"] == "expense")
                $insertedId = $this->model->createNewExpense($this->request["accountId"], $this->request["categoryID"], $this->request["title"], $this->request["date"], $this->request["amount"]);
            
            if ($insertedId >= 1)
                Response::successResponse("created new transaction");
        }

        Response::errorResponse("creating new transaction failed");
    }
}