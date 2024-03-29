<?php
require_once getcwd() . "/api/BaseService.php";

class UsersService extends BaseService
{
    public function RegisterUser($firstname, $lastname, $username, $password)
    {
        try {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            $query = "INSERT INTO User (username, password, firstname, lastname) VALUES (?, ?, ?, ?)";

            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("ssss", $username, $hashedPassword, $firstname, $lastname);
            $stmt->execute();

            $userId = $this->conn->insert_id;

            return ServiceResponse::success();
        } catch (mysqli_sql_exception $e) {
            return ServiceResponse::fail($e);
        }
    }

    public function getUserById(int $userId)
    {
        try {
            $query =
                "SELECT userID, username, firstname, lastname, email
            FROM User
            WHERE userID = ?;";

            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("d", $userId);
            $stmt->execute();
            $result = $stmt->get_result();
            $user = $result->fetch_array(MYSQLI_ASSOC);

            return ServiceResponse::success($user);
        } catch (Exception $e) {
            return ServiceResponse::fail($e);
        }
    }

    public function getUserIdByAccountId(int $accountId)
    {
    }

    public function getUserIdByUserName(string $userName)
    {
        $query =
            "SELECT userId
        FROM users
        WHERE userName = ?;";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $userName);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_array(MYSQLI_ASSOC);

        return $user["userId"];
    }


    public function updateUserData($userId, $firstName, $lastName, $eMail)
    {
        try {
            $query = "UPDATE User SET firstname = ?, lastname = ?, email = ?
            WHERE userID = ?";

            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("sssd", $firstName, $lastName, $eMail, $userId);
            $stmt->execute();

            return ServiceResponse::success();
        } catch (mysqli_sql_exception $e) {
            return ServiceResponse::fail($e);
        }
    }
}
