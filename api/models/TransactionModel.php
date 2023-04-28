<?php
require_once getcwd() . "/api/BaseModel.php";

/*##### EXPENSE FUNCTIONS #####*/
class TransactionModel extends BaseModel
{
    public function getExpenseByUserID($userId)
    {
        $query = "SELECT * FROM Expense
        WHERE F_accountID = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("d", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_array(MYSQLI_ASSOC);


        return $data;
    }

    public function getExpenseByExpenseId($expenseId)
    {
        $query = "SELECT * FROM Expense
        WHERE ExpenseID = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("d", $expenseId);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_array(MYSQLI_ASSOC);


        return $data;

    }

    public function createNewExpense($userId, $categoryId, $title, $expenseDate, $expenseAmount)
    {

        $query = "INSERT INTO Expense (F_accountID, F_category_ID, Title, Date_Expense, ExpenseAmount)
        VALUES (?, ?, ?, ?, ?)";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ddssd", $userId, $categoryId, $title, $expenseDate, $expenseAmount);
        $stmt->execute();
        $expenseId = $stmt->insert_id;


        return $expenseId;
    }


    /*##### INCOME FUNCTIONS #####*/

    public function getIncomeByUserId($userId)
    {

        $query = "SELECT * FROM Income WHERE F_accountID = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("d", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_array(MYSQLI_ASSOC);


        return $data;
    }

    public function getIncomeByIncomeID($incomeId)
    {
        $query = "SELECT * FROM Income WHERE IncomeID = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("d", $incomeId);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_array(MYSQLI_ASSOC);


        return $data;
    }

    public function createIncome($userID, $categoryId, $title, $incomeDate, $incomeAmount)
    {
        $query = "INSERT INTO Expense (F_accountID, F_category_ID, Title, Date_Income, IncomeAmount)
        VALUES (?, ?, ?, ?, ?)";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ddssd", $userId, $categoryId, $title, $incomeDate, $incomeAmount);
        $stmt->execute();
        $incomeId = $stmt->insert_id;

        return $incomeId;
    }
}