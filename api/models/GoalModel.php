<?php

require_once getcwd() . "/api/BaseModel.php";

class GoalModel extends BaseModel
{
    public function createNewGoal($goaltitle, $amount, $date, $color) // should it be really $goalTitle? and not the ID?
    {

        $query = "INSERT INTO Goal (title, Amount, Date, color)
        VALUES (?, ?, ?, ?)";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("sdsd", $goaltitle, $amount, $date, $color);
        $stmt->execute();
        $goalId = $stmt->insert_id;//returns the autoincrement ID Nr

        return $goalId;
    }


    public function getGoalByID($GoalID)
    {                     

        $query = "SELECT * FROM Goal 
        WHERE GaolID = ?";
   

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("d", $GoalID);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_array(MYSQLI_ASSOC);


        return $data;
    }

    
    public function getGoalsByUserID($userId)
    {                     

        $query = "SELECT * FROM Goal 
        WHERE userId = ?";
   

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("d", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_array(MYSQLI_ASSOC);


        return $data;
    }



}