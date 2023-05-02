<?php

require_once getcwd() . "/api/BaseController.php";
require_once getcwd() . "/api/models/UserModel.php";

class UserController extends BaseController
{
    protected function init()
    {
        $this->model = new UserModel();
    }

    public function getUserIdByUserName(string $userName)
    {
        $userId = $this->model->getUserIdByUserName($userName);
        if ($userId == null) {
            $userId = $this->model->addUser($userName, "");
        }
        $response = array();
        $response["userId"] = $userId;
        $this->successResponse("request successfull", $response);
    }





    public function get() 
    {
        $user = $this->model->getUserById($this->request["userId"]);
        $this->successResponse("request successfull", $user);

    }

    public function post()
    {
        $jsonPostData = $this->getPostData();
        $username = $jsonPostData->userName;
        $email = $jsonPostData->email;
        $this->model->updateUser($username, $email);
    }
}


