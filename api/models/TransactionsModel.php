<?php
require_once getcwd() . "/api/BaseModel.php";

/*##### EXPENSE FUNCTIONS #####*/
class TransactionsModel extends BaseModel
{
    // brauchen Namen der Kategorien
    public function getExpenseByUserID($userId, $limit=10)
    {
        $limit = $limit ?? 10;

        $query = "SELECT * FROM Expense exp
        JOIN Category cat ON cat.categoryID=exp.F_categoryID
        WHERE F_accountID = ?
        LIMIT ?;";


        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("dd", $userId, $limit);
        $stmt->execute();
        $result = $stmt->get_result();
        $rows = [];

        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }

        return $rows;
    }

    public function getAllTransactionsByUserId($userId, $limit = 10)
    {
        $limit = $limit ?? 10;

        $incomes = $this->getIncomeByUserId($userId, $limit);
        $expenses = $this->getExpenseByUserID($userId, $limit);

        $transactions = array_merge($incomes, $expenses);

        return $transactions;
    }

    public function getExpenseByExpenseId($expenseId, $limit = 10)
    {
        // brauchen Namen der Kategorien
        $limit = $limit ?? 10;

        $query = "SELECT * FROM Expense exp
        JOIN Category cat ON cat.categoryID=exp.F_categoryID
        WHERE ExpenseID = ?
        LIMIT ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("dd", $expenseId, $limit);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_array(MYSQLI_ASSOC);


        return $data;
    }

    public function createNewExpense($userId, $categoryId, $title, $expenseDate, $expenseAmount)
    {

        $query = "INSERT INTO Expense (F_accountID, F_category_ID, Title, date, ExpenseAmount)
        VALUES (?, ?, ?, ?, ?)";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ddssd", $userId, $categoryId, $title, $expenseDate, $expenseAmount);
        $stmt->execute();
        $expenseId = $stmt->insert_id;


        return $expenseId;
    }


    /*##### INCOME FUNCTIONS #####*/

    public function getIncomeByUserId($userId, $limit = 10)
    {
        // brauchen Namen der Kategorien
        $limit = $limit ?? 10;

        $query = "SELECT * FROM Income inc
        JOIN Category cat ON cat.categoryID=inc.F_categoryID
         WHERE F_accountID = ? LIMIT ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("dd", $userId, $limit);
        $stmt->execute();
        $result = $stmt->get_result();
        $rows = [];

        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }

        return $rows;
    }

    public function getIncomeByIncomeID($incomeId, $limit = 10)
    {
        // brauchen Namen der Kategorien
        $limit = $limit ?? 10;

        $query = "SELECT * FROM Income inc
        JOIN Category cat ON cat.categoryID=inc.F_categoryID
        WHERE IncomeID = ? LIMIT ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("dd", $incomeId, $limit);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_array(MYSQLI_ASSOC);


        return $data;
    }

    public function createIncome($userId, $categoryId, $title, $incomeDate, $incomeAmount)
    {
        $query = "INSERT INTO Expense (F_accountID, F_category_ID, Title, date, IncomeAmount)
        VALUES (?, ?, ?, ?, ?)";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ddssd", $userId, $categoryId, $title, $incomeDate, $incomeAmount);
        $stmt->execute();
        $incomeId = $stmt->insert_id;

        return $incomeId;
    }
}
