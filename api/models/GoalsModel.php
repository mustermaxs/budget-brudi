<?php

require_once getcwd() . "/api/BaseModel.php";

class GoalsModel extends BaseModel
{
    public function createNewGoal($accountId, $goaltitle, $amount, $date, $color) // should it be really $goalTitle? and not the ID?
    {

        $query = "INSERT INTO Goal (F_accountID, title, amount, date, color)
        VALUES (?, ?, ?, ?, ?)";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("dsdsd",$accountId, $goaltitle, $amount, $date, $color);
        $stmt->execute();
        $goalId = $stmt->insert_id;//returns the autoincrement ID Nr

        return $goalId;
    }


    public function getGoalByID($GoalID)
    {                     

        $query = "SELECT * FROM Goal 
        WHERE GoalID = ?";
   

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("d", $GoalID);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_array(MYSQLI_ASSOC);


        return $data;
    }

    
    public function getGoalsByAccountID($accountID)
    {                     
        
        $query = "SELECT * FROM Goal 
        WHERE F_accountID = ?";
   

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("d", $accountID);
        $stmt->execute();
        $result = $stmt->get_result();
        $rows = [];

        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }

        return $rows;

    }



}