<?php

require_once getcwd() . "/api/BaseController.php";
require_once getcwd() . "/api/models/GoalsModel.php";

class GoalsController extends BaseController 
{
    protected function init()
    {
        $this->model = new GoalsModel();
    }
 
    public function get()
    {
        if (isset($this->request["id"]))
            $data = $this->model->getGoalById($this->request["id"]);
        
        else
            $data = $this->model->getGoalsByAccountID($this->request["userId"]);

        if ($data === null)
            Response::errorResponse("fetching goal/s failed");

        Response::successResponse("goals fetched successfully", $data);
    }
   
    public function post()
    {
        $accountId = $this->request["userId"];
        $title = $this->request["title"];
        $amount = $this->request["amount"];
        $date = $this->request["date"];
        $color = $this->request["color"];

        
        $createGoalSuccessful = $this->model->createNewGoal ($accountId, $title, $amount, $date, $color);

        if ($createGoalSuccessful){
            
            Response::successResponse("goal created successfully");

        } else {
            $this->errorResponse("login failed");
        }


    }
}