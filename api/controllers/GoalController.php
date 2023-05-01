<?php

require_once getcwd() . "/api/BaseController.php";
require_once getcwd() . "/api/models/TransactionsModel.php";

class GoalController extends BaseController 
{
    protected function init()
    {
        $this->model = new GoalModel();
    }
 
    private function get()
    {
        $goals= $this->model->getGoalsByUserID($this->request["userId"]);

        return $goals;
            
    }
   
    public function post()
    {

        $title = $this->request["title"];
        $amount = $this->request["amount"];
        $Date = $this->request["Date"];
        $color = $this->request["color"];



        $createGoalSuccesful = $this->model->createNewGoal($title, $amount, $Date, $color);


        if($createGoalSuccesful) {

            Response::successResponse("new Goal created");

        } else {

            $this->errorResponse(" creation failed");

        }

    }
}