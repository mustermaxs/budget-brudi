<?php

require_once getcwd() . "/api/BaseController.php";
require_once getcwd() . "/api/services/CategoriesService.php";


class CategoriesController extends BaseController
{
    protected function init()
    {
        $this->service = new CategoriesService();
    }

    private function getCategory()
    {
        if (isset($this->request["id"]))
            return $this->service->getCategoryByCategoryId($this->request["id"]);

        else
            return $this->service->getAllCategories();
    }

    private function getExpenseCategory()
    {
        return $this->service->getCategoryIdByExpenseId($this->request["id"]);
    }

    private function getIncomeCategory()
    {
        return $this->service->getCategoryIdByIncomeId($this->request["id"]);
    }

    private function getGoalCategory()
    {
        return $this->service->getCategoryIdByGoalId($this->request["id"]);
    }

    public function get()
    {
        if (!isset($this->request["id"]))
            $res = $this->service->getAllCategories();

        // else if ($this->request["type"] == "expense")
        //     $data = $this->getExpenseCategory();

        // else if ($this->request["type"] == "income")
        //     $data = $this->getIncomeCategory();
            
        // else if ($this->request["type"] == "goal")
        //     $data = $this->getGoalCategory();

        // else 
        //     Response::errorResponse("Input invalid");

        else
            $res = $this->service->getCategoryByCategoryId($this->request["id"]);
        
            if (!$res->ok)
                Response::errorResponse($res->message);

        Response::successResponse("categories loaded successfully", $res->data);
    }
}