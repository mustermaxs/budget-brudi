<?php

require_once getcwd() . "/api/BaseModel.php";

class UserModel extends BaseModel
{
    public function getUserById(int $userId)
    {
        $query =
            "SELECT iserId, username, name, lastname, email
            FROM user
            WHERE userId = ?;";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("d", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_array(MYSQLI_ASSOC);

        return $user["userId"];
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
}
