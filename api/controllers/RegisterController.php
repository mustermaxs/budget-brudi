<?php
require_once getcwd() . "/api/BaseController.php";
require_once getcwd() . "/api/services/RegisterService.php";

class RegisterController extends BaseController
{
    protected function init()
    {
        $this->service = new RegisterService();
    }

    public function post()
    {
        $jsonPostData = $this->getPostData();
        $firstname = $jsonPostData->firstname;
        $lastname = $jsonPostData->lastname;
        $username = $jsonPostData->username;
        $password = $jsonPostData->password;

        $registerSuccessful = $this->service->registerUser($firstname, $lastname, $username, $password);

        if ($registerSuccessful){
            
            Response::successResponse("registered successful");

        } else {
            $this->errorResponse("login failed");
        }
    }
}