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
        $data = $result->fetch_array(MYSQLI_ASSOC);

        if (!password_verify($password, $data["password"]))
            return array("successful"=>false, "userId"=>-1);

            $query = "
            SELECT *
            FROM Account
            WHERE F_userID = ?;";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("d", $data["userID"]);
            $stmt->execute();
            $result = $stmt->get_result();
            $data = $result->fetch_array(MYSQLI_ASSOC);
        
            // userID ist eigentlich accountID
        return array("successful"=>true, "userId"=>$data["AccountId"]);
    }
}