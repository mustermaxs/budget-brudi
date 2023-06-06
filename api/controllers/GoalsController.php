<?php

require_once getcwd() . "/api/BaseController.php";
require_once getcwd() . "/api/services/GoalsService.php";

class GoalsController extends BaseController
{
    protected function init()
    {
        $this->service = new GoalsService();
    }

    public function get()
    {
        $res = null;

        if (isset($this->request["id"]))
            $res = $this->service->getGoalById($this->request["id"]);

        else {
            $res = $this->service->getGoalsByAccountID($this->request["accountId"], @$this->request["limit"]);
        }

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


        $response = $this->service->createNewGoal($accountId, $title, $amount, $date, $color);

        if ($response->ok) {

            Response::successResponse("goal created successfully");
        } else {
            Response::errorResponse($response->message);
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

        $response = $this->service->updateGoal($accountId, $goalId, $title, $amount, $date, $color);

        if ($response->ok) {
            Response::successResponse("Goal updated successfully");
        } else {
            Response::errorResponse($response->message);
        }
    }

    public function delete()
    {
        $goalId = $this->request["id"];
        $response = $this->service->deleteGoal($goalId);

        if ($response->ok) {
            Response::successResponse("Goal deleted successfully");
        } else {
            Response::errorResponse($response->message);
        }
    }
}
