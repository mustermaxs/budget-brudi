<?php
require_once getcwd() . "/api/BaseModel.php";

class UsersModel extends BaseModel
{
    public function getUserById(int $userId)
    {
        $query =
            "SELECT userID, username, firstname, lastname, email
            FROM User
            WHERE userID = ?;";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("d", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_array(MYSQLI_ASSOC);

        return $user;
    }

    public function getUserIdByAccountId(int $accountId)
    {}

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
