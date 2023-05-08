<?php
require_once getcwd() . "/api/BaseModel.php";

/*##### EXPENSE FUNCTIONS #####*/
class TransactionsModel extends BaseModel
{
    // brauchen Namen der Kategorien
    public function getExpenseByAccountId($accountId, $limit = 10)
    {
        try {
            $limit = $limit ?? 10;

            $query = "SELECT * FROM Expense exp
        JOIN Category cat ON cat.categoryID=exp.F_categoryID
        WHERE F_accountID = ?
        LIMIT ?;";


            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("dd", $accountId, $limit);
            $stmt->execute();
            $result = $stmt->get_result();
            $rows = [];

            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }

            return ServiceResponse::send($rows);
        } catch (mysqli_sql_exception $e) {
            return ServiceResponse::send($e);
        }
    }

    public function getAllTransactionsByAccountId($accountId, $limit = 10)
    {
        try {
            $limit = $limit ?? 10;

            $incomes = $this->getIncomeByAccountId($accountId, $limit);
            $expenses = $this->getExpenseByAccountId($accountId, $limit);

            $transactions = array_merge($incomes->data, $expenses->data);

            return ServiceResponse::send($transactions);
        } catch (mysqli_sql_exception $e) {
            return null;
        }
    }

    public function getExpenseByExpenseId($expenseId, $limit = 10)
    {
        // brauchen Namen der Kategorien
        try {
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


            return ServiceResponse::send($data);
        } catch (mysqli_sql_exception $e) {
            return ServiceResponse::send($e);
        }
    }

    public function createNewExpense($accountId, $categoryId, $title, $expenseDate, $expenseAmount)
    {

        try {
            $query = "INSERT INTO Expense (F_accountID, F_categoryID, Title, date, Amount)
        VALUES (?, ?, ?, ?, ?)";

            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("ddssd", $accountId, $categoryId, $title, $expenseDate, $expenseAmount);
            $stmt->execute();
            $expenseId = $stmt->insert_id;


            return ServiceResponse::send(array("id" => $expenseId));
        } catch (mysqli_sql_exception $e) {
            return ServiceResponse::send($e);
        }
    }


    /*##### INCOME FUNCTIONS #####*/

    public function getIncomeByAccountId($accountId, $limit = 10)
    {
        // brauchen Namen der Kategorien
        $limit = $limit ?? 10;

        $query = "SELECT * FROM Income inc
        JOIN Category cat ON cat.categoryID=inc.F_categoryID
         WHERE F_accountID = ? LIMIT ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("dd", $accountId, $limit);
        $stmt->execute();
        $result = $stmt->get_result();
        $rows = [];

        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }

        return ServiceResponse::send($rows);
    }

    public function getIncomeByIncomeID($incomeId, $limit = 10)
    {
        try {        // brauchen Namen der Kategorien
            $limit = $limit ?? 10;

            $query = "SELECT * FROM Income inc
        JOIN Category cat ON cat.categoryID=inc.F_categoryID
        WHERE IncomeID = ? LIMIT ?";

            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("dd", $incomeId, $limit);
            $stmt->execute();
            $result = $stmt->get_result();
            $data = $result->fetch_array(MYSQLI_ASSOC);


            return ServiceResponse::send($data);
        } catch (Exception $e) {
            return ServiceResponse::send($e);
        }
    }

    public function createIncome($accountId, $categoryId, $title, $incomeDate, $incomeAmount)
    {
        $query = "INSERT INTO Expense (F_accountID, F_categoryID, Title, date, Amount)
        VALUES (?, ?, ?, ?, ?)";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ddssd", $accountId, $categoryId, $title, $incomeDate, $incomeAmount);
        $stmt->execute();
        $incomeId = $stmt->insert_id;

        return $incomeId;
    }
}
