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

$categoriesData = array(
  'Groceries'     => array('Billa', 'Billa Plus', 'Hofer', 'Penny', 'Spar', 'Lidl', 'Metro'),
  'Food'          => array('Pizza', 'Burger', 'Tacos', 'Sushi', 'Pasta', 'Sandwich', 'Salad'),
  'Health'        => array('Gym Membership', 'Doctor Visit', 'Vitamins', 'Massage', 'Apothecary', 'Dental Care', 'Acupuncture'),
  'Household'     => array('Cleaning Supplies', 'Furniture', 'Home Repair', 'Appliances', 'Bedding', 'Garden Tools', 'Pet Food'),
  'Media & Electronics' => array('Headphones', 'Smartphone', 'Laptop', 'TV', 'Camera', 'Video Games', 'Speakers'),
  'Restaurants'   => array('Fast Food', 'Italian', 'Chinese', 'Mexican', 'Thai', 'Seafood', 'Steakhouse'),
  'Sport'         => array('Sport Eybl', 'Basketball', 'Soccer', 'Swimming', 'SportXXL', 'FitInn', 'Boulder Bar'),
  'Subscriptions' => array('Netflix', 'Spotify', 'Magazines', 'Gym', 'Online Courses', 'Meal Kit', 'Amazon Prime'),
  'Transportation'=> array('Lime', 'Parking', 'Uber', 'Car Rental', 'Public Transportation', 'Bike Share', 'Toll'),
);
// Generate 1000 expense data points with dates from the last 30 days
$expenses = array();
for ($i = 0; $i < 1000; $i++) {
    $category = $categories[rand(0, count($categories) - 1)];
    $amount = isset($categoryAmounts[$category]) ? $categoryAmounts[$category] : number_format(mt_rand(10, 2000) / 100, 2);
    $date = date('Y-m-d', strtotime('-' . rand(1, 30) . ' days'));

// randomly choose the Title from one of the category's array attributes. 
    if (array_key_exists($category, $categoriesData)) 
    {
      $items = $categoriesData[$category];
      $title = $items[rand(0, count($items) - 1)];
    }
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
    $title = $expense['title']; 
    $stmt->execute();
}

// Print the number of rows inserted
echo $stmt->affected_rows . " rows inserted\n";

// Close the database connection
$stmt->close();
$conn->close();

?>
*/