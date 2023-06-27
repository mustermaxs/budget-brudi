-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 27. Jun 2023 um 20:18
-- Server-Version: 10.4.30-MariaDB
-- PHP-Version: 8.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `budgetbuddy`
--

DELIMITER $$
--
-- Prozeduren
--
CREATE DEFINER=`admin_budgetbuddy`@`%` PROCEDURE `getShares` (IN `accountID` INT)   BEGIN
    SET @a = (	SELECT nbrOfIncludedGoals
    FROM SavingsSettings
    WHERE F_accountID = accountID);

PREPARE STMT FROM 'SELECT * FROM Goal WHERE DATE >= CURDATE() AND F_accountID = ? AND savedAmount < Amount AND share > 0 ORDER BY Date LIMIT ?';
EXECUTE STMT USING accountID, @a;
END$$

CREATE DEFINER=`admin_budgetbuddy`@`%` PROCEDURE `transactionInTimeSpan` (IN `accountID` INT, IN `dateStart` VARCHAR(11), IN `dateEnd` VARCHAR(11))   BEGIN
SELECT income, expense, Date, F_accountID FROM (

    SELECT
        COALESCE(expenseByMonth.Date, incomeByMonth.Date) AS Date,
        COALESCE(expenseByMonth.F_accountID, incomeByMonth.F_accountID) AS F_accountID,
        expenseByMonth.expenseAmount AS expense,
        incomeByMonth.incomeAmount AS income
    FROM
        expenseByMonth
    LEFT JOIN incomeByMonth ON expenseByMonth.Date = incomeByMonth.Date
        AND expenseByMonth.F_accountID = incomeByMonth.F_accountID
    WHERE
        expenseByMonth.F_accountID = accountID
    AND expenseByMonth.Date BETWEEN dateStart AND dateEnd
    UNION ALL
    
    SELECT
        incomeByMonth.Date,
        incomeByMonth.F_accountID,
        NULL AS expense,
        incomeByMonth.incomeAmount AS income
    FROM
        incomeByMonth
    LEFT JOIN expenseByMonth ON expenseByMonth.Date = incomeByMonth.Date
        AND expenseByMonth.F_accountID = incomeByMonth.F_accountID
    WHERE
        incomeByMonth.F_accountID = accountID
		AND  incomeByMonth.Date BETWEEN dateStart AND dateEnd
        AND expenseByMonth.Date IS NULL
    
) AS subquery ORDER BY Date ;



END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Account`
--

CREATE TABLE `Account` (
  `AccountId` int(11) NOT NULL,
  `Balance` decimal(15,2) NOT NULL,
  `F_userID` int(10) NOT NULL,
  `sumIncome` decimal(15,2) DEFAULT 0.00,
  `sumExpense` decimal(15,2) DEFAULT 0.00,
  `countIncome` int(11) DEFAULT 0,
  `countExpense` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Daten für Tabelle `Account`
--

INSERT INTO `Account` (`AccountId`, `Balance`, `F_userID`, `sumIncome`, `sumExpense`, `countIncome`, `countExpense`) VALUES
(1, 5070.11, 1, 5731.62, -11.50, 19, 2),
(2, -36443.60, 2, 16330.00, 0.00, 46, 17),
(3, -4600.00, 12, 0.00, 0.00, 0, 0),
(4, -5172.78, 13, 0.00, 0.00, 0, 4),
(6, -4690.10, 15, 0.00, 0.00, 0, 0),
(7, -32085.00, 16, 0.00, -25635.00, 0, 34),
(10, 3810.00, 21, 16550.00, 640.00, 15, 6);

--
-- Trigger `Account`
--
DELIMITER $$
CREATE TRIGGER `CREATE_SETTINGS` AFTER INSERT ON `Account` FOR EACH ROW INSERT INTO `SavingsSettings`(`F_accountID`, `mode`, `incomePercentage`, `nbrOfIncludedGoals`) VALUES (NEW.AccountId, "equally", 0.00, 1)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Category`
--

CREATE TABLE `Category` (
  `categoryID` int(11) NOT NULL,
  `Category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Daten für Tabelle `Category`
--

INSERT INTO `Category` (`categoryID`, `Category`) VALUES
(2, 'Bills'),
(4, 'Food'),
(3, 'Groceries'),
(5, 'Health'),
(6, 'Household'),
(7, 'Media Electronics'),
(8, 'Rent'),
(9, 'Restaurant'),
(15, 'Salary'),
(1, 'Savings'),
(10, 'Sport'),
(12, 'Subscriptions'),
(13, 'Transportation'),
(14, 'Work');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Expense`
--

CREATE TABLE `Expense` (
  `ExpenseID` int(11) NOT NULL,
  `F_accountID` int(11) NOT NULL,
  `F_categoryID` int(11) NOT NULL,
  `Title` text NOT NULL,
  `date` date NOT NULL,
  `Amount` decimal(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Daten für Tabelle `Expense`
--

INSERT INTO `Expense` (`ExpenseID`, `F_accountID`, `F_categoryID`, `Title`, `date`, `Amount`) VALUES
(28, 2, 3, 'Grocery Shopping', '2023-04-01', -120.00),
(29, 2, 4, 'Lunch', '2023-04-02', -8.50),
(30, 2, 5, 'Medicine', '2023-04-03', -15.00),
(31, 2, 6, 'Cleaning Supplies', '2023-04-04', -20.00),
(32, 2, 7, 'TV', '2023-04-05', -800.00),
(33, 2, 8, 'Rent Payment', '2023-04-06', -1500.00),
(34, 2, 9, 'Dinner with Friends', '2023-04-07', -85.00),
(35, 2, 10, 'Gym Membership', '2023-04-08', -40.00),
(37, 2, 12, 'Magazine Subscription', '2023-04-10', -5.00),
(38, 2, 13, 'Gasoline Refill', '2023-04-11', -50.00),
(39, 2, 14, 'Work Expenses', '2023-04-12', -45.00),
(40, 2, 1, 'Savings', '2023-04-13', -200.00),
(48, 4, 1, 'test 123r', '2023-04-01', -123.17),
(49, 4, 1, '1234567', '2023-04-01', -123.17),
(50, 4, 1, '1234567', '2023-04-01', -123.17),
(51, 4, 1, '1234567', '2023-04-01', -123.17),
(64, 1, 12, 'Netflix', '2023-05-25', -9.90),
(65, 2, 4, 'test1', '2023-05-27', -123.00),
(66, 2, 4, 'test1', '2023-05-27', -123.00),
(67, 2, 4, 'Test2', '2023-05-27', -42069.00),
(68, 2, 15, 'Gehalt', '2023-05-27', -250.00),
(69, 2, 6, 'Diamond Ring', '2023-05-29', -2550.00),
(70, 7, 6, 'cleaning supplies', '2023-06-03', -55.00),
(71, 7, 4, 'pizza', '2023-06-06', -32.00),
(72, 7, 9, 'date with susi', '2023-06-05', -43.00),
(73, 7, 8, 'Rent', '2023-05-01', -780.00),
(74, 7, 8, 'Rent', '2023-04-03', -780.00),
(75, 7, 8, 'Rent', '2023-03-06', -780.00),
(76, 7, 8, 'Rent', '2023-02-06', -780.00),
(77, 7, 3, 'Groceries', '2023-02-13', -45.00),
(78, 7, 3, 'Groceries', '2023-03-13', -45.00),
(79, 7, 3, 'Groceries', '2023-04-10', -45.00),
(80, 7, 3, 'Groceries', '2023-05-08', -45.00),
(81, 7, 3, 'Groceries', '2023-06-05', -45.00),
(82, 7, 5, 'Eye Laser Therapy', '2023-04-22', -5600.00),
(83, 7, 10, 'McFit', '2022-12-30', -20.00),
(84, 7, 10, 'McFit', '2023-01-27', -20.00),
(85, 7, 10, 'McFit', '2023-02-24', -20.00),
(86, 7, 10, 'McFit', '2023-03-31', -20.00),
(87, 7, 10, 'McFit', '2023-04-28', -20.00),
(88, 7, 10, 'McFit', '2023-05-26', -20.00),
(89, 7, 2, 'Magenta', '2022-12-31', -40.00),
(90, 7, 2, 'Magenta', '2023-01-30', -40.00),
(91, 7, 2, 'Magenta', '2023-02-28', -40.00),
(92, 7, 2, 'Magenta', '2023-03-31', -40.00),
(93, 7, 2, 'Magenta', '2023-04-30', -40.00),
(94, 7, 2, 'Magenta', '2023-05-31', -40.00),
(95, 7, 15, 'A1', '2022-12-01', -1800.00),
(96, 7, 15, 'A1', '2023-01-01', -1800.00),
(97, 7, 15, 'A1', '2023-02-01', -1800.00),
(98, 7, 15, 'A1', '2023-03-01', -1800.00),
(99, 7, 15, 'A1', '2023-04-01', -1800.00),
(100, 7, 15, 'A1', '0023-05-01', -1800.00),
(101, 7, 15, 'A1', '2023-06-01', -1800.00),
(102, 7, 15, 'A1', '2023-01-01', -1800.00),
(103, 7, 15, 'A1', '2023-06-01', -1800.00),
(104, 1, 4, 'RÃ¶merquelle extra prickelnd', '2023-06-07', -1.60),
(105, 7, 15, 'A1', '2023-05-01', -1850.00),
(107, 10, 4, 'Pizza essen', '2023-06-23', -25.00),
(108, 10, 4, 'Smart TV', '2023-06-23', -1000.00),
(109, 10, 7, 'Beamer', '2023-03-01', -500.00),
(110, 10, 7, 'Fernseher', '2023-01-03', -650.00),
(111, 10, 9, 'Essen', '2023-06-22', -500.00),
(112, 10, 4, 'Pizza', '2023-06-23', -15.00);

--
-- Trigger `Expense`
--
DELIMITER $$
CREATE TRIGGER `AFTER_DELETE_EXPENSE_UPDATE_ACCOUNT` AFTER DELETE ON `Expense` FOR EACH ROW BEGIN  
   UPDATE Account SET Balance = Balance - old.Amount;  
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `EXPENSE_AMOUNT_NEGATIVE` BEFORE INSERT ON `Expense` FOR EACH ROW BEGIN
    IF NEW.Amount > 0 THEN
        SET NEW.Amount = -NEW.Amount;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `UPDATE_ACCOUNT_BALANCE_EXPENSE` AFTER INSERT ON `Expense` FOR EACH ROW UPDATE Account SET Balance = Balance + NEW.Amount WHERE AccountId = NEW.F_AccountID
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `UPDATE_ACCOUNT_SUMEXPENSE` AFTER INSERT ON `Expense` FOR EACH ROW UPDATE Account SET sumExpense = -(sumExpense + NEW.Amount), countExpense = countExpense + 1 WHERE AccountId = NEW.F_AccountID
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `expenseByMonth`
-- (Siehe unten für die tatsächliche Ansicht)
--
CREATE TABLE `expenseByMonth` (
`expenseAmount` decimal(37,2)
,`Date` varchar(7)
,`F_accountID` int(11)
);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Goal`
--

CREATE TABLE `Goal` (
  `Title` varchar(52) NOT NULL,
  `GoalID` int(6) NOT NULL,
  `F_accountID` int(32) NOT NULL,
  `Date` date NOT NULL,
  `Color` varchar(12) NOT NULL,
  `Amount` decimal(15,2) DEFAULT NULL,
  `savedAmount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `share` decimal(6,3) NOT NULL DEFAULT 0.000
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Daten für Tabelle `Goal`
--

INSERT INTO `Goal` (`Title`, `GoalID`, `F_accountID`, `Date`, `Color`, `Amount`, `savedAmount`, `share`) VALUES
('Buy new car', 2, 2, '2023-09-03', '#345995', 25000.00, 16.67, 0.000),
('Pay off credit card debt', 4, 2, '2023-06-29', '#FB4D3D', 3000.00, 3177.50, 50.000),
('Invest in stocks', 6, 2, '2023-07-01', '#535353', 10000.00, 2275.00, 50.000),
('Buy new laptop', 7, 1, '2023-08-15', '#DD5E98', 2000.00, 2000.00, 0.000),
('Save for child education', 8, 2, '2023-09-01', '#07a0c3', 5000.00, 25.00, 0.000),
('Car repair', 48, 7, '2023-07-14', ' #9999FF', 2500.00, 0.00, 0.000),
('MacBook Pro', 49, 7, '2023-09-11', ' #99FFFF', 2100.00, 0.00, 0.000),
('Downpayment new Appartment', 50, 7, '2023-10-11', ' #99FF99', 6000.00, 0.00, 0.000),
('Party', 53, 7, '2023-07-05', ' #FF99FF', 1235.00, 0.00, 0.000),
('test the limit', 55, 7, '2023-07-08', '#FF9999', 2975.00, 0.00, 0.000),
('Random goal', 58, 1, '2023-06-01', ' #CC99FF', 1000.00, 0.00, 0.000),
('Another goal', 60, 1, '2026-01-01', ' #9999FF', 100.00, 0.00, 100.000),
('asd', 61, 1, '2023-06-24', ' #FFC266', 123.00, 827.50, 0.000),
('test', 63, 1, '2023-06-14', ' #9999FF', 123.00, 0.00, 0.000),
('5', 66, 1, '2023-06-23', ' #99FFFF', 5.00, 5.00, 0.000),
('6th goal', 67, 1, '2023-06-10', '#FF9999', 123.00, 0.00, 0.000),
('6', 68, 1, '2023-06-18', ' #FFFF99', 6.00, 3.50, 0.000),
('Fancy Urlaub', 71, 10, '2023-08-01', ' #FFFF99', 1500.00, 1962.50, 0.000),
('Renovierung', 72, 10, '2023-09-01', ' #99FF99', 1500.00, 1962.50, 0.000),
('Semester Closing', 73, 10, '2023-08-10', ' #99FFFF', 500.00, 437.00, 12.500),
('Vacation to Hawaii', 74, 10, '2023-08-24', ' #FF99FF', 2500.00, 374.20, 12.500),
('Tesla', 75, 10, '2023-07-20', ' #99FF99', 7500.00, 1500.80, 35.000),
('Test goal', 76, 10, '2023-06-28', '#FF9999', 100.00, 70.00, 50.000);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Income`
--

CREATE TABLE `Income` (
  `IncomeID` int(11) NOT NULL,
  `F_accountID` int(11) NOT NULL,
  `F_categoryID` int(11) NOT NULL,
  `Title` text NOT NULL,
  `date` date NOT NULL,
  `Amount` decimal(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Daten für Tabelle `Income`
--

INSERT INTO `Income` (`IncomeID`, `F_accountID`, `F_categoryID`, `Title`, `date`, `Amount`) VALUES
(1, 1, 1, 'Monthly Savings', '2023-04-01', 500.00),
(2, 1, 2, 'Electricity Bill', '2023-04-02', 75.00),
(3, 1, 3, 'Grocery Shopping', '2023-04-03', 150.00),
(4, 1, 4, 'Lunch with the boys', '2023-04-04', 60.00),
(6, 1, 6, 'Cleaning Supplies', '2023-04-06', 25.00),
(7, 1, 7, 'Smartphone', '2023-04-07', 400.00),
(8, 1, 8, 'Rent Payment', '2023-04-08', 1000.00),
(9, 1, 9, 'Dinner with Friends', '2023-04-09', 75.00),
(10, 1, 10, 'Running Shoes', '2023-04-10', 120.00),
(11, 1, 1, 'Monthly Savings', '2023-04-11', 500.00),
(12, 1, 12, 'Netflix Subscription', '2023-04-12', 15.00),
(13, 1, 13, 'Gasoline Refill', '2023-04-13', 60.00),
(14, 1, 15, 'Bonus for being the greatest', '2023-04-14', 200.02),
(15, 2, 1, 'Monthly Savings', '2023-04-01', 600.00),
(16, 2, 2, 'Internet Bill', '2023-04-02', 60.00),
(17, 2, 3, 'Grocery Shopping', '2023-04-03', 120.00),
(18, 2, 4, 'Lunch', '2023-04-04', 10.00),
(19, 2, 5, 'Gym Membership', '2023-04-05', 50.00),
(20, 2, 6, 'Cleaning Supplies', '2023-04-06', 30.00),
(21, 2, 7, 'Headphones', '2023-04-07', 150.00),
(22, 2, 8, 'Rent Payment', '2023-04-08', 900.00),
(23, 2, 9, 'Dinner with Friends', '2023-04-09', 100.00),
(24, 2, 10, 'Running Shoes', '2023-04-10', 120.00),
(25, 2, 1, 'Monthly Savings', '2023-04-11', 600.00),
(26, 2, 10, 'titel?', '2024-01-01', 100.00),
(27, 2, 13, 'Gasoline Refill', '2023-04-13', 30.00),
(28, 2, 15, 'Bonus', '2023-04-14', 100.00),
(29, 1, 1, 'TEST', '2023-04-05', 2.11),
(30, 1, 1, 'Test 14 ...', '2023-06-11', 4000.01),
(31, 1, 2, 'Insurance', '2023-06-11', 100.00),
(53, 1, 8, 'test 15', '2023-06-18', 1000.00),
(54, 1, 2, 'test savings', '2023-06-18', 5.00),
(55, 1, 2, '6', '2023-06-18', 7.00),
(56, 2, 15, 'gehalt', '2023-06-18', 150.00),
(57, 2, 2, 'onetime payment - payoff debt', '2023-06-18', 1000.00),
(58, 2, 15, 'gehalt', '2023-06-18', 1000.00),
(59, 2, 2, 'teest', '2023-06-18', 10.00),
(60, 1, 15, 'Gehalt', '2023-05-02', 1500.00),
(61, 10, 15, 'Gehalt', '2023-06-23', 50.00),
(62, 10, 15, 'Gehalt', '2023-05-05', 1000.00),
(63, 10, 15, 'Gehalt', '2023-06-02', 1000.00),
(64, 10, 15, 'Gehalt', '2023-04-05', 800.00),
(65, 10, 1, 'Gehalt', '2023-02-01', 500.00),
(66, 10, 15, 'Gehalt', '2023-03-01', 900.00),
(67, 10, 2, 'Gehalt', '2023-06-23', 900.00),
(70, 10, 15, 'Gehalt', '2023-01-01', 1000.00),
(71, 2, 2, 'Test', '2023-06-22', 100.00),
(72, 2, 15, 'Cloud', '2023-01-31', 1500.00),
(73, 2, 15, 'Cloud', '2023-02-28', 1500.00),
(74, 2, 15, 'Cloud', '2023-03-31', 1500.00),
(75, 2, 15, '1 Quartal Bonus', '2023-04-30', 1500.00),
(76, 2, 15, 'Cloud', '2023-04-30', 1500.00),
(77, 2, 15, 'Cloud', '2023-05-31', 1500.00),
(78, 10, 1, 'A2', '2023-06-22', 100.00),
(79, 10, 14, 'Tesla', '2023-06-23', 1000.00),
(80, 10, 1, 'A2', '2023-06-22', 100.00),
(81, 10, 15, 'Gehalt + Bonus', '2023-06-23', 2000.00),
(82, 10, 2, 'test', '2023-06-27', 200.00);

--
-- Trigger `Income`
--
DELIMITER $$
CREATE TRIGGER `UPDATE_ACCOUNT_BALANCE_INCOME` AFTER INSERT ON `Income` FOR EACH ROW UPDATE Account SET Balance = Balance + NEW.Amount WHERE AccountId = NEW.F_AccountID
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `UPDATE_ACCOUNT_BALANCE_ON_INCOME_DELETE` AFTER DELETE ON `Income` FOR EACH ROW BEGIN  
   UPDATE Account SET Balance = Balance - old.Amount;  
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `UPDATE_ACCOUNT_SUMINCOME` AFTER INSERT ON `Income` FOR EACH ROW UPDATE Account SET sumIncome = sumIncome + NEW.Amount, countIncome = countIncome + 1 WHERE AccountId = NEW.F_AccountID
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `incomeByMonth`
-- (Siehe unten für die tatsächliche Ansicht)
--
CREATE TABLE `incomeByMonth` (
`incomeAmount` decimal(37,2)
,`Date` varchar(7)
,`F_accountID` int(11)
);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Role`
--

CREATE TABLE `Role` (
  `Role_ID` int(10) NOT NULL,
  `Role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Daten für Tabelle `Role`
--

INSERT INTO `Role` (`Role_ID`, `Role`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `SavingsSettings`
--

CREATE TABLE `SavingsSettings` (
  `F_accountID` int(11) NOT NULL,
  `mode` varchar(15) NOT NULL,
  `incomePercentage` int(15) NOT NULL,
  `nbrOfIncludedGoals` int(15) NOT NULL,
  `settingsID` int(11) NOT NULL
) ;

--
-- Daten für Tabelle `SavingsSettings`
--

INSERT INTO `SavingsSettings` (`F_accountID`, `mode`, `incomePercentage`, `nbrOfIncludedGoals`, `settingsID`) VALUES
(1, 'incremental', 41, 1, 1),
(2, 'equally', 50, 2, 2),
(10, 'incremental', 70, 4, 5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `User`
--

CREATE TABLE `User` (
  `userID` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(70) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `F_role_ID` int(10) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Daten für Tabelle `User`
--

INSERT INTO `User` (`userID`, `username`, `password`, `firstname`, `lastname`, `email`, `F_role_ID`) VALUES
(1, 'mustermax', '$2y$10$a5IYKl7/20hpkAP07oas8ufcqcMDWn7bGXUq58nZTtqIsMhoneF9i', 'Maximilian', 'Muster', 'mustermax@max.at', 1),
(2, 'Markus', '$2y$10$a5IYKl7/20hpkAP07oas8ufcqcMDWn7bGXUq58nZTtqIsMhoneF9i', 'Markus', 'RÃ¶si', 'markus@roesner.it', 1),
(4, 'MikeTest', '$2y$10$a5IYKl7/20hpkAP07oas8ufcqcMDWn7bGXUq58nZTtqIsMhoneF9i', 'Mike', 'Asumi', 'mike@web.com', 1),
(12, 'jdoe', '$2y$10$xo1Mt/.5DvIKEJwsfG.PBeUZW6JrPEJZv7okkg/nSs/TTHmXJ43S2', 'john', 'doe', NULL, 1),
(13, 'max', '$2y$10$dNjBHhzjeF0QoT5oGOD2k.qj3U/BivFypcypbSbICfY2hTG028E/y', 'Max', 'Sinnl', NULL, 1),
(15, 'guestt', '$2y$10$hGMQi4huBjMnYu5kOX1Z1uKjbL.twWtn4/U/3sGT4u1T9M39d2JXC', 'Guest', 'Nachname', NULL, 1),
(16, 'Jack', '$2y$10$opX3k4cCUMmbq6NnBTkCZe6GRMnBLwK8ZFifU.mQbtGkF0vGvCZ66', 'Jack', 'Reacher', 'j.reacher@gv.com', 1),
(21, 'mustermann', '$2y$10$w.kSWAsgtDFvBj5NfbJs7uPLV93PSKfSjGaw258JdCko7s6KYx8AW', 'Maximilian', 'Mustermann', 'mail@mustermax.at', 1);

--
-- Trigger `User`
--
DELIMITER $$
CREATE TRIGGER `CREATE_ACCOUNT` AFTER INSERT ON `User` FOR EACH ROW INSERT INTO Account (Balance, F_userID) VALUES(0.00, NEW.userID)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur des Views `expenseByMonth`
--
DROP TABLE IF EXISTS `expenseByMonth`;

CREATE ALGORITHM=UNDEFINED DEFINER=`admin_budgetbuddy`@`%` SQL SECURITY DEFINER VIEW `expenseByMonth`  AS   (select sum(`Expense`.`Amount`) AS `expenseAmount`,date_format(`Expense`.`date`,'%Y-%m') AS `Date`,`Expense`.`F_accountID` AS `F_accountID` from `Expense` group by year(`Expense`.`date`),month(`Expense`.`date`),`Expense`.`F_accountID` order by year(`Expense`.`date`),month(`Expense`.`date`))  ;

-- --------------------------------------------------------

--
-- Struktur des Views `incomeByMonth`
--
DROP TABLE IF EXISTS `incomeByMonth`;

CREATE ALGORITHM=UNDEFINED DEFINER=`admin_budgetbuddy`@`%` SQL SECURITY DEFINER VIEW `incomeByMonth`  AS   (select sum(`Income`.`Amount`) AS `incomeAmount`,date_format(`Income`.`date`,'%Y-%m') AS `Date`,`Income`.`F_accountID` AS `F_accountID` from `Income` group by year(`Income`.`date`),month(`Income`.`date`),`Income`.`F_accountID` order by year(`Income`.`date`),month(`Income`.`date`))  ;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `Account`
--
ALTER TABLE `Account`
  ADD PRIMARY KEY (`AccountId`),
  ADD KEY `FK_constraint_userID` (`F_userID`);

--
-- Indizes für die Tabelle `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`categoryID`),
  ADD UNIQUE KEY `Category` (`Category`);

--
-- Indizes für die Tabelle `Expense`
--
ALTER TABLE `Expense`
  ADD PRIMARY KEY (`ExpenseID`),
  ADD KEY `Expense_ibfk_1` (`F_categoryID`),
  ADD KEY `Expense_ibfk_2` (`F_accountID`);

--
-- Indizes für die Tabelle `Goal`
--
ALTER TABLE `Goal`
  ADD PRIMARY KEY (`GoalID`),
  ADD KEY `accountID_ibfk` (`F_accountID`);

--
-- Indizes für die Tabelle `Income`
--
ALTER TABLE `Income`
  ADD PRIMARY KEY (`IncomeID`),
  ADD KEY `Income_ibfk_1` (`F_categoryID`),
  ADD KEY `Income_ibfk_2` (`F_accountID`);

--
-- Indizes für die Tabelle `Role`
--
ALTER TABLE `Role`
  ADD PRIMARY KEY (`Role_ID`);

--
-- Indizes für die Tabelle `SavingsSettings`
--
ALTER TABLE `SavingsSettings`
  ADD PRIMARY KEY (`settingsID`),
  ADD KEY `fk_accountID_savingsSettings` (`F_accountID`);

--
-- Indizes für die Tabelle `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`userID`) USING BTREE,
  ADD KEY `roleID_ibfk` (`F_role_ID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `Account`
--
ALTER TABLE `Account`
  MODIFY `AccountId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT für Tabelle `Category`
--
ALTER TABLE `Category`
  MODIFY `categoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT für Tabelle `Expense`
--
ALTER TABLE `Expense`
  MODIFY `ExpenseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT für Tabelle `Goal`
--
ALTER TABLE `Goal`
  MODIFY `GoalID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT für Tabelle `Income`
--
ALTER TABLE `Income`
  MODIFY `IncomeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT für Tabelle `SavingsSettings`
--
ALTER TABLE `SavingsSettings`
  MODIFY `settingsID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `User`
--
ALTER TABLE `User`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `Account`
--
ALTER TABLE `Account`
  ADD CONSTRAINT `FK_constraint_userID` FOREIGN KEY (`F_userID`) REFERENCES `User` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `Expense`
--
ALTER TABLE `Expense`
  ADD CONSTRAINT `Expense_ibfk_1` FOREIGN KEY (`F_categoryID`) REFERENCES `Category` (`categoryID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Expense_ibfk_2` FOREIGN KEY (`F_accountID`) REFERENCES `Account` (`AccountId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `Goal`
--
ALTER TABLE `Goal`
  ADD CONSTRAINT `accountID_ibfk` FOREIGN KEY (`F_accountID`) REFERENCES `Account` (`AccountId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `Income`
--
ALTER TABLE `Income`
  ADD CONSTRAINT `Income_ibfk_1` FOREIGN KEY (`F_categoryID`) REFERENCES `Category` (`categoryID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Income_ibfk_2` FOREIGN KEY (`F_accountID`) REFERENCES `Account` (`AccountId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `SavingsSettings`
--
ALTER TABLE `SavingsSettings`
  ADD CONSTRAINT `fk_accountID` FOREIGN KEY (`F_accountID`) REFERENCES `Account` (`AccountId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `User`
--
ALTER TABLE `User`
  ADD CONSTRAINT `roleID_ibfk` FOREIGN KEY (`F_role_ID`) REFERENCES `Role` (`Role_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
