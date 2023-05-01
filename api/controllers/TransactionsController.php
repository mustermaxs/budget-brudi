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
            return $this->model->getExpenseByUserID($this->request["userId"]);       
    }

    private function getIncomes()
    {
        if (isset($this->request["id"]))
            return $this->model->getIncomeByIncomeID($this->request["id"], $this->request["limit"] ?? null);
        
        else
            return $this->model->getIncomeByUserId($this->request["userId"]);       
    }

    public function get()
    {
        if (!isset($this->request["type"]))     // /api/transactions/  -> get all transactions
            $data = $this->model->getAllTransactionsByUserId($this->request["userId"], $this->request["limit"]);

        else if ($this->request["type"] == "expenses")
            $data = $this->getExpenses();

        else if ($this->request["type"] == "income")
            $data = $this->getIncomes();

        else 
            Response::errorResponse("transaction type invalid");

        Response::successResponse($this->request["type"]." loaded successfully", $data);

    }

    public function post()
    {
        if (!isset($this->request["type"]))
            Response::errorResponse("no transaction type declared");
        
        if ($this->request["type"] == "income")
        {
            $this->model->createIncome($this->request["userId"], $this->request["categoryId"], $this->request["title"], $this->request["date"], $this->request["amount"])
        }
        if ($this->request["type"] == "expense")
        {
            $this->model->createNewExpense($this->request["userId"], $this->request["categoryId"], $this->request["title"], $this->request["date"], $this->request["amount"])
        }
    }
}