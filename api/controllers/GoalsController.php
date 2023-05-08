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
        $res = null;

        if (isset($this->request["id"]))
            $res = $this->model->getGoalById($this->request["id"]);

        else 
            $res = $this->model->getGoalsByAccountID($this->request["accountId"]);

        if (!$res->ok) 
            Response::errorResponse($res->message);
        

        Response::successResponse("goals fetched successfully", $res->data);
    }

    public function post()
    {
        $accountId = $this->request["accountId"];
        $title = $this->request["title"];
        $amount = $this->request["amount"];
        $date = $this->request["date"];
        $color = $this->request["color"];


        $response = $this->model->createNewGoal($accountId, $title, $amount, $date, $color);

        if ($response->ok) {

            Response::successResponse("goal created successfully");
        } else {
            $this->errorResponse($response->message);
        }
    }

    public function put()
    {
        $accountId = $this->request["accountId"];
        $title = $this->request["title"];
        $amount = $this->request["amount"];
        $date = $this->request["date"];
        $color = $this->request["color"];
        $goalId = $this->request["id"];

        $response = $this->model->updateGoal($accountId, $goalId, $title, $amount, $date, $color);

        if ($response->ok) {
            Response::successResponse("Goal updated successfully");
        } else {
            Response::errorResponse($response->message);
        }
    }
}
