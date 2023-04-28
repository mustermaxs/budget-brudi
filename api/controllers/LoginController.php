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

        if ($loginSuccessful){
            
            $auth = new Authenticator();
            $token = $auth->createToken("mustermax");
            $response = array("token"=>  $token);
            Response::successResponse("created token", $response);

        } else {
            $this->errorResponse("login failed");
        }
    }
}