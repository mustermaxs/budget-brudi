import React, { useEffect, useState } from "react";
import ContentWrapper from "../components/widgets/ContentWrapper";
import Card from "../components/widgets/Card";
import Filter from "../components/widgets/Filter";
import BbBtn from "../components/widgets/BbBtn";
import { useNavigate } from "react-router-dom";
import { jwtToken } from "../contexts/UserContext";
import getRandomInt from "../utils/Random";
import BbBtnRound from "../components/widgets/BbBtnRound";
import { loadingAnim } from "../components/widgets/Spinner";
import TransactionsCategoriesChart from "../components/TransactionsCategoriesChart";
import moment from 'moment';
import "./Transactions.css"



function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [displayMode, setDisplayMode] = useState("income");
  const navigate = useNavigate();


  const aggregateCategoryData = (transactions, displayMode) => {
    const filteredTransactions = transactions.filter((transaction) => {
      const amount = parseFloat(transaction.Amount);
      if (displayMode === "income") {
        return amount > 0;
      } else if (displayMode === "expense") {
        return amount < 0;
      }
    });

    const categorySums = filteredTransactions.reduce((acc, transaction) => {
      const category = transaction.Category;
      const amount = parseFloat(transaction.Amount);
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    }, {});

    const chartLabels = Object.keys(categorySums);
    const chartData = Object.values(categorySums);
    return { chartLabels, chartData };
  };


  const mockData = [
    {
      "IncomeID": 15,
      "F_accountID": 2,
      "F_categoryID": 1,
      "Title": "Monthly Savings",
      "date": moment().format("YYYY-MM-DD"),
      "Amount": "300.00",
      "categoryID": 1,
      "Category": "Savings"
    },
    {
      "IncomeID": 16,
      "F_accountID": 2,
      "F_categoryID": 2,
      "Title": "Internet Bill",
      "date": moment().format("YYYY-MM-DD"),
      "Amount": "60.00",
      "categoryID": 2,
      "Category": "Bills"
    },
    {
      "IncomeID": 17,
      "F_accountID": 2,
      "F_categoryID": 3,
      "Title": "Grocery Shopping",
      "date": moment().format("YYYY-MM-DD"),
      "Amount": "120.00",
      "categoryID": 3,
      "Category": "Groceries"
    },
    {
      "IncomeID": 18,
      "F_accountID": 2,
      "F_categoryID": 4,
      "Title": "Lunch",
      "date": moment().format("YYYY-MM-DD"),
      "Amount": "10.00",
      "categoryID": 4,
      "Category": "Food"
    }
  ];

  useEffect(() => {
    loadingAnim.show();
    fetch('http://localhost/budget-brudi/api/transactions?limit=100', {
      method: 'GET',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken.get()}`
      }
    }).then((res) => {
      return res.json();
    }).then(transactions => {
      console.log(transactions.data)
      loadingAnim.hide();
      setLoading(false);
      if (transactions.data.length === 0) {
        setTransactions(mockData);
      } else {

        setTransactions(transactions.data);
      }
    });

  }, []);

  useEffect(() => {
    const { chartLabels, chartData } = aggregateCategoryData(transactions, displayMode);
    setChartLabels(chartLabels);
    setChartData(chartData);
  }, [transactions, displayMode]);


  const handleFilterChange = (event) => {
    setCategory(event.target.value);
  };

  const categories = Array.from(new Set([...transactions.map((i) => i.Category)]));

  const filteredData = category ? transactions.filter((item) => item.Category === category).sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()) : transactions.sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf());


  const handleDisplayModeChange = (mode) => {
    setDisplayMode(mode);
    const { chartLabels, chartData } = aggregateCategoryData(transactions, mode);
    setChartLabels(chartLabels);
    setChartData(chartData);
  };

  return (
    <>
      <ContentWrapper>
        <div className="chartDiv">
          <div className="tabs">
            <button className={displayMode === "income" ? "active-tab" : ""} onClick={() => handleDisplayModeChange("income")}>
              Income
            </button>
            <button className={displayMode === "expense" ? "active-tab" : ""} onClick={() => handleDisplayModeChange("expense")}>
              Expense
            </button>
          </div>

          <TransactionsCategoriesChart title={displayMode} labels={chartLabels} data={chartData} />
        </div>
        <Filter category={category} categories={categories} onChange={handleFilterChange} />
        {filteredData.map(({ Category, Title, date, Amount, IncomeID, ExpenseID }) => {
          return (
            <Card
              type="category"
              icon={Category}
              title={Title}
              date={date}
              price={Amount}
              key={getRandomInt(0, 10000)}
              onClick={() => { navigate(`/transaction?type=${(IncomeID && "income") || (ExpenseID && "expense")}&id=${IncomeID || ExpenseID}`) }}
              datatype={(IncomeID && "income") || (ExpenseID && "expense")}
              id={ExpenseID}
            />
          );
        })}

        {loading && <div className="loader-container">
          <div className="spinner"></div>
        </div>}

        <BbBtnRound position="bottom" type="button" content="+" onClick={() => {
          navigate("/addtransaction");
        }} />

      </ContentWrapper>

    </>
  );
}

export default Transactions;
