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
        $this->prohibitForeignUserAccess();
        $response = $this->service->getUserById($this->request["userId"]);
        
        if ($response->ok)
            Response::successResponse("successfully fetched user data", $response->data, 200);
        else
            Response::errorResponse("fetching user data failed", $response);
    }

    // register new user
    public function post()
    {
        $jsonPostData = $this->getPostData();
        $firstname = $jsonPostData->firstname;
        $lastname = $jsonPostData->lastname;
        $username = $jsonPostData->username;
        $password = $jsonPostData->password;

        $response = $this->service->registerUser($firstname, $lastname, $username, $password);

        if ($response->ok) {
            Response::successResponse("registration successful");
        } else {
            Response::errorResponse("failed to create new user", $response);
        }
    }

    public function put()
    {
        $this->prohibitForeignUserAccess();

        $userId = $this->request["userId"];
        $firstName = $this->request["firstname"];
        $lastName = $this->request["lastname"];
        $eMail = $this->request["email"];

        $response = $this->service->updateUserData($userId, $firstName, $lastName, $eMail);

        if ($response->ok) {
            Response::successResponse("profile updated successfully");
        } else {
            Response::errorResponse("failed to update user", $response);
        }
    }
}
