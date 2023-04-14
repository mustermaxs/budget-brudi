<?php
require_once getcwd() . "/api/BaseController.php";
require_once getcwd() . "/api/models/LoginModel.php";

class LoginController extends BaseController
{
    protected function init()
    {
        $this->model = new LoginModel();
    }

    public function post()
    {
        $jsonPostData = $this->getPostData();
        $username = $jsonPostData->username;
        $password = $jsonPostData->password;

        // hash password in LoginModel
        // $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $loginSuccessful = $this->model->loginUser($username, $password);

        if ($loginSuccessful)
            $this->successResponse("login successful");
        else
            $this->errorResponse("login failed");
    }
}
