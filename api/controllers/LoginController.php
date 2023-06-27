<?php
require_once getcwd() . "/api/BaseController.php";
require_once getcwd() . "/api/services/LoginService.php";

class LoginController extends BaseController
{
    protected function init()
    {
        $this->service = new LoginService();
    }

    public function post()
    {
        // hash password in LoginService
        // $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $loginRequest = $this->service->loginUser($this->request["username"], $this->request["password"]);

        if ($loginRequest->ok){
            
            $auth = new Authenticator();
            $token = $auth->createToken($this->request["username"], $loginRequest->data["userId"], $loginRequest->data["accountId"]);
            $response = array("token"=>  $token);
            
            Response::successResponse("created token", $response);

        } else {
            $this->errorResponse("login failed");
        }
    }
}