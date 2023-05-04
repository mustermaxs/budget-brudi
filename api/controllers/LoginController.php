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
        // hash password in LoginModel
        // $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $loginRequest = $this->model->loginUser($this->request["username"], $this->request["password"]);

        if ($loginRequest["successful"]){
            
            $auth = new Authenticator();
            $token = $auth->createToken("mustermax", $loginRequest["userId"], $loginRequest["accountId"]);
            $response = array("token"=>  $token);
            
            Response::successResponse("created token", $response);

        } else {
            $this->errorResponse("login failed");
        }
    }
}