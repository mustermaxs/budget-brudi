<?php

require_once getcwd() . "/api/BaseController.php";
require_once getcwd() . "/api/services/UsersService.php";

class UsersController extends BaseController
{
    protected function init()
    {
        $this->service = new UsersService();
    }


    public function get()
    {
        $user = $this->service->getUserById($this->request["userId"]);
        $this->successResponse("request successfull", $user);
    }

    public function post()
    {
        $jsonPostData = $this->getPostData();
        $firstname = $jsonPostData->firstname;
        $lastname = $jsonPostData->lastname;
        $username = $jsonPostData->username;
        $password = $jsonPostData->password;

        $response = $this->service->registerUser($firstname, $lastname, $username, $password);

        if ($response->ok) {
            Response::successResponse("Register successful");
        } else {
            Response::errorResponse($response->message);
        }
    }

    public function put()
    {
        $userId = $this->request["userId"];
        $firstName = $this->request["firstname"];
        $lastName = $this->request["lastname"];
        $eMail = $this->request["email"];

        $response = $this->service->updateUserData($userId, $firstName, $lastName, $eMail);

        if ($response->ok) {
            Response::successResponse("Profile updated successfully");
        } else {
            Response::errorResponse($response->message);
        }
    }
}
