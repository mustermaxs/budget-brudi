<?php

require_once getcwd() . "/api/BaseController.php";
require_once getcwd() . "/api/models/CategoriesModel.php";


class CategoriesController extends BaseController
{
    protected function init()
    {
        $this->model = new CategoriesModel();
    }

    private function getCategory()
    {
        if (isset($this->request["id"]))
            return $this->model->getCategoryByCategoryId($this->request["id"]);

        else
            return $this->model->getAllCategories();
    }

    private function getExpenseCategory()
    {
        return $this->model->getCategoryIdByExpenseId($this->request["id"]);
    }

    private function getIncomeCategory()
    {
        return $this->model->getCategoryIdByIncomeId($this->request["id"]);
    }

    private function getGoalCategory()
    {
        return $this->model->getCategoryIdByGoalId($this->request["id"]);
    }

    public function get()
    {
        if (!isset($this->request["id"]))
            $data = $this->model->getAllCategories();

        // else if ($this->request["type"] == "expense")
        //     $data = $this->getExpenseCategory();

        // else if ($this->request["type"] == "income")
        //     $data = $this->getIncomeCategory();
            
        // else if ($this->request["type"] == "goal")
        //     $data = $this->getGoalCategory();

        // else 
        //     Response::errorResponse("Input invalid");

        else
            $data = $this->model->getCategoryByCategoryId($this->request["id"]);
        
            if ($data == null)
                Response::errorResponse("no categories found");

        Response::successResponse("categories loaded successfully", $data);
    }
}