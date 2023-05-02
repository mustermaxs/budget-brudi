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




    
    protected function getUserNameByUserId($userId)
    {
        $userId = $this->request["id"];
        $user = $this->model->getUserById($userId);

        $this->successResponse("SUCCESS!", $user);
    }

    public function get()
    {
        switch ($this->request["action"]) {
            case "getid":
                $this->getUserIdByUserName($this->request["username"]);
                break;
            case "getname":
                $this->getUserNameByUserId($this->request["id"]);
                break;
            default:
                $this->getUserNameByUserId($this->request["id"]);
                break;
        }
        $this->errorResponse("request malformed");
    }

    public function post()
    {
        $jsonPostData = $this->getPostData();
        $username = $jsonPostData->userName;
        $email = $jsonPostData->email;
        $this->model->addUser($username, $email);
    }

    public function setFirstName($userId, $firstName)
    {
        $query =
            "UPDATE users SET name = ?
            WHERE userId = ?";

            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("ds", $userId, $firstName);
            $stmt->execute();

            return $user["userId"];
    }

    public function setLastName($userId, $lastName)
    {
        $query =
            "UPDATE users SET lastname = ?
            WHERE userId = ?";

            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("ds", $userId, $lastName);
            $stmt->execute();

            return $user["userId"];
    }

    public function setEMail($userId, $eMail)
    {
        $query =
            "UPDATE users SET email = ?
            WHERE userId = ?";

            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("ds", $userId, $eMail);
            $stmt->execute();

            return $user["userId"];
    }
}


