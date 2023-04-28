<?php
require_once getcwd() . "/api/BaseModel.php";

/*##### EXPENSE FUNCTIONS #####*/
class TransactionsModel extends BaseModel
{
    // brauchen Namen der Kategorien
    public function getExpenseByUserID($userId)
    {
        $query = "SELECT * FROM Expense
        WHERE F_accountID = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("d", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        $rows = [];

        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }

        return $rows;
    }

    public function getExpenseByExpenseId($expenseId)
    {
        // brauchen Namen der Kategorien

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
        // brauchen Namen der Kategorien

        $query = "SELECT * FROM Income WHERE F_accountID = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("d", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        $rows = [];

        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }

        return $rows;
    }

    public function getIncomeByIncomeID($incomeId)
    {
        // brauchen Namen der Kategorien

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
