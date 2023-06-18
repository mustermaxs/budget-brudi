<?php
require_once getcwd() . "/api/BaseController.php";
require_once getcwd() . "/api/services/SavingsService.php";
require_once getcwd() . "/api/services/GoalsService.php";

class SavingsController extends BaseController
{
    private GoalsService $goalsService;


    protected function init()
    {
        $this->service = new SavingsService();
        $this->goalsService = new GoalsService();
    }


    public function put()
    {
        $accountId = $this->request["accountId"];
        $incomePercentage = $this->request["incomePercentage"];
        $mode = $this->request["mode"];
        $nbrOfIncludedGoals = $this->request["nbrOfIncludedGoals"];
        $shares = $this->request["shares"];


        // update account saving settings
        $response = $this->service->updateSavingSettings($accountId, $incomePercentage, $mode, $nbrOfIncludedGoals, $shares);

        //update share amount for all selected goals
        $response = $this->goalsService->updateMultipleShares($shares, $accountId);
        if ($response->ok) {
            Response::successResponse("Settings updated successfully", $response);
        } else {
            Response::errorResponse("updating settings failed", $response);
        }
    }

    public function get()
    {
        $accountId = $this->request["accountId"];

        $res = $this->service->getSavingsSettings($accountId);

        if (!$res->ok)
            Response::errorResponse("fetching settings failed", $res);

        Response::successResponse("savings settings loaded successfully", $res->data);
    }
}
