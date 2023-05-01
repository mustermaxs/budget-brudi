<?php

require_once getcwd() . "/api/BaseModel.php";

class CategoriesModel extends BaseModel
{
    public function getCategoryByCategoryId($categoryId)
    {
        $query = 
            "SELECT Category FROM Category
            WHERE categoryID = ?";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("d", $categoryId);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_array(MYSQLI_ASSOC);

        return array("category" => $data["Category"]);
    }
    
    public function getAllCategories()
    {
        $query =
            "SELECT * FROM Category";
            
        $result = $this->conn->query($query);
        
        $data = array();
        if ($result->num_rows > 0)
        {
            while ($row = $result->fetch_assoc())
            {
                array_push($data, $row);
            }
        }

        return $data;
    }

    public function getCategoryIdByExpenseId($expenseId)
    {
        $query =
            "SELECT F_categoryID FROM Expanse
            WHERE ExpenseID = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("d", $expenseId);
        $stmt->execute();
        $result = $stmt->get_result();
        $categoryId = $result;

        return $categoryId;
    }

    public function getCategoryIdByIncomeId($incomeId)
    {
        $query =
            "SELECT F_categoryID FROM Income
            WHERE IncomeID = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("d", $incomeId);
        $stmt->execute();
        $result = $stmt->get_result();
        $categoryId = $result;

        return $categoryId;
    }

    // public function getCategoryIdByGoalId($goalId)
    // {
    //     $query =
    //         "SELECT F_categoryID FROM Goal
    //         WHERE GoalID = ?";

    //     $stmt = $this->conn->prepare($query);
    //     $stmt->bind_param("d", $goalId);
    //     $stmt->execute();
    //     $result = $stmt->get_result();
    //     $categoryId = $result;

    //     return $categoryId;
    // }
}