<?php

// Define the database connection parameters
$host = 'localhost';
$user = 'username';
$password = 'password';
$database = 'database_name';

// Connect to the MySQL server
$conn = new mysqli($host, $user, $password, $database);

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Define the expense categories and specific amounts
$categories = array('Bills', 'Groceries', 'Food', 'Health', 'Household', 'Media & Electronics', 'Mortgage', 'Restaurants', 'Sport', 'Savings', 'Subscriptions', 'Transportation', 'Work');
$categoryAmounts = array('Mortgage' => 1230, 'Savings' => 50, 'Bills' => 575, 'Subscriptions' => 45); // reaccuring amounts

// Generate 1000 expense data points with dates from the last 30 days
$expenses = array();
for ($i = 0; $i < 1000; $i++) {
    $category = $categories[rand(0, count($categories) - 1)];
    $amount = isset($categoryAmounts[$category]) ? $categoryAmounts[$category] : number_format(mt_rand(10, 2000) / 100, 2);
    $date = date('Y-m-d', strtotime('-' . rand(1, 30) . ' days'));
    $expenses[] = array('category' => $category, 'amount' => $amount, 'date' => $date, 'title' => $title);
}

// Prepare the SQL statement for inserting the expense data
$stmt = $conn->prepare('INSERT INTO expenses (category, amount, date, title) VALUES (?, ?, ?, ?)');

// Bind the parameters to the statement
$stmt->bind_param('sdss', $category, $amount, $date, $title);

// Insert the expense data into the MySQL database
foreach ($expenses as $expense) {
    $category = $expense['category'];
    $amount = $expense['amount'];
    $date = $expense['date'];
    $title = $expense['title']; // TODO - need title randomizer( sothat title make sense with category)
    $stmt->execute();
}

// Print the number of rows inserted
echo $stmt->affected_rows . " rows inserted\n";

// Close the database connection
$stmt->close();
$conn->close();

/*
// Define the expense categories and specific amounts
$categories = array('Bills', 'Groceries', 'Food', 'Health', 'Household', 'Media & Electronics', 'Mortgage', 'Restaurants', 'Sport', 'Savings', 'Subscriptions', 'Transportation', 'Work');
$categoryAmounts = array('Mortgage' => 1230, 'Savings' => 50, 'Bills' => 575, 'Subscriptions' => 45); // recurring amounts

// Create a MySQL connection
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "database_name";
$conn = new mysqli($servername, $username, $password, $dbname);

// Generate 1000 expense data points with dates from the last 30 days
$expenses = array();
for ($i = 0; $i < 1000; $i++) {
  $category = $categories[rand(0, count($categories) - 1)];
  $amount = isset($categoryAmounts[$category]) ? $categoryAmounts[$category] : number_format(rand(10, 2000), 2);
  $date = date('Y-m-d', strtotime('-'.rand(0, 30).' days'));
  $expenses[] = array('category' => $category, 'amount' => $amount, 'date' => $date);
}

// Insert the expense data into the MySQL database
$values = array();
foreach ($expenses as $expense) {
  $values[] = "('".$conn->real_escape_string($expense['category'])."', '".$conn->real_escape_string($expense['amount'])."', '".$conn->real_escape_string($expense['date'])."')";
}
$insertQuery = 'INSERT INTO expenses (category, amount, date) VALUES '.implode(',', $values);
if ($conn->query($insertQuery) === TRUE) {
  echo count($expenses).' rows inserted';
} else {
  echo 'Error: '.$conn->error;
}
$conn->close();
?>
*/