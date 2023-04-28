<?php
require_once getcwd() . "/api/BaseModel.php";



class LoginModel extends BaseModel
{
    public function loginUser($username, $password)
    {
        $query = "
        SELECT password
        FROM User
        WHERE username = ?;";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_array(MYSQLI_ASSOC);

        return password_verify($password, $data["password"]);
    }
}