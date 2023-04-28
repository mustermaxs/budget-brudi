<?php
require_once getcwd() . "/api/BaseController.php";
require_once getcwd() . "/api/models/RegisterModel.php";

class RegisterController extends BaseController
{
    protected function init()
    {
        $this->model = new RegisterModel();
    }

    public function post()
    {
        $jsonPostData = $this->getPostData();
        $firstname = $jsonPostData->firstname;
        $lastname = $jsonPostData->lastname;
        $username = $jsonPostData->username;
        $password = $jsonPostData->password;

        $registerSuccessful = $this->model->registerUser($firstname, $lastname, $username, $password);

        if ($registerSuccessful){
            
            Response::successResponse("registered successful");

        } else {
            $this->errorResponse("login failed");
        }
    }
}