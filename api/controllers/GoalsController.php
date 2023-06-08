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

        // check if the goal limit is reached before creating a new goal
        $currentCount = $this->service->getGoalCountByAccountID($accountId);
        if ($currentCount >= 5) {
            Response::errorResponse("Goal limit reached. Goals are limited to 5 goals");
            return;
        }

        $response = $this->service->createNewGoal($accountId, $title, $amount, $date, $color);

        if ($response->ok) {

            Response::successResponse("goal created successfully");
        } else {
            Response::errorResponse($response->message);
        }
    }

    
    //Updating shares of the Goals -- IF PATCH works
    /*
    public function patch() 
    {
        $goals = $this->request["goals"]; // Assuming "goals" is an array of goal objects that includes goal ID and the new share value

        $response = $this->service->updateShares($goals);

        if ($response->ok) {
            Response::successResponse("Goal shares updated successfully");
        } else {
            Response::errorResponse($response->message);
        }
    }
    */




    public function put()
    {
        //for shares % to be updated for several goals
        if (isset($this->request["goals"])) {
            $goals = $this->request["goals"];
            $response = $this->service->updateMultipleShares($goals);
    
            if ($response->ok) {
                Response::successResponse("Goal shares updated successfully");
            } else {
                Response::errorResponse($response->message);
            }
    
            return;
        }
    

        $accountId = $this->request["accountId"];
        $title = $this->request["Title"];
        $amount = $this->request["Amount"];
        $date = $this->request["Date"];
        $color = $this->request["Color"];
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
