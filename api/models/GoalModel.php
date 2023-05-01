<?php

require_once getcwd() . "/api/BaseModel.php";

class GoalModel extends BaseModel
{
    public function createNewGoal($userId, $goaltitle, $budgetgoal, $date, $color) // should it be really $goalTitle? and not the ID?
    {

        $query = "INSERT INTO Goal (Goal, GoalsAmount, Date, F_categoryID)
        VALUES (?, ?, ?, ?)";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("sdsd", $goaltitle, $budgetgoal, $date, $color);
        $stmt->execute();
        $goalId = $stmt->insert_id;//insert_id????


        return $goalId;
    }


    public function getGoalByID($GoalID)
    {                     

        $query = "SELECT * FROM Goal goal
        <?-- JOIN Category cat ON cat.categoryID = goal.F_categoryID -->
        WHERE GaolID = ?";
   

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("d", $GoalID);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_array(MYSQLI_ASSOC);


        return $data;
    }


}