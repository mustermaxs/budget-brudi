<?php

require_once getcwd() . "/api/BaseController.php";
require_once getcwd() . "/api/models/TransactionsModel.php";

class TransactionsController extends BaseController
{
    protected function init()
    {
        $this->model = new TransactionsModel();
    }

    public function get()
    {
        $jsonPostData = $this->getPostData();

        if ($this->request["type"] == "expenses")
            $data = $this->model->getExpenseByUserID($this->request["userId"]);

        else if ($this->request["type"] == "income")
            $data = $this->model->getIncomeByUserID($this->request["userId"]);

        else 
            Response::errorResponse("transaction type invalid");

        Response::successResponse($this->request["type"]." loaded successfully", $data);

    }
}