<?php
require_once getcwd() . "/api/BaseModel.php";



class LoginModel extends BaseModel
{
    public function loginUser($username, $password)
    {
        $query = "
        SELECT *
        FROM User
        WHERE username = ?;";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $userData = $result->fetch_array(MYSQLI_ASSOC);

        if (!password_verify($password, $userData["password"]))
            return array("successful"=>false, "userId"=>-1);

        $userId = $userData["userID"];

            $query = "
            SELECT *
            FROM Account
            WHERE F_userID = ?;";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("d", $userId);
            $stmt->execute();
            $result = $stmt->get_result();
            $accountData = $result->fetch_array(MYSQLI_ASSOC);

            // TODO check if account exists, else -> handle error
            $accountId = $accountData["AccountId"];
        
        return array("successful"=>true, "userId"=>$userId, "accountId"=>$accountId);
    }
}