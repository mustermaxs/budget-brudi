<?php
// require_once getcwd() . "/api/BaseModel.php";



// class RegisterModel extends BaseModel
// {
//     public function RegisterUser($firstname, $lastname, $username, $password)
//     {

//         $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

//         $query = "INSERT INTO User (username, password, firstname, lastname) VALUES (?, ?, ?, ?)";

//         $stmt = $this->conn->prepare($query);
//         $stmt->bind_param("ssss", $username, $hashedPassword, $firstname, $lastname);
//         $stmt->execute();
//         $userId = $stmt->insert_id;

//         return $userId;
//     }
// }