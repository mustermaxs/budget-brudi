import React, { useEffect, useState } from "react";
import ContentWrapper from "../components/widgets/ContentWrapper";
import Card from "../components/widgets/Card";
import Filter from "../components/widgets/Filter";
import BbBtn from "../components/widgets/BbBtn";
import AddTransactionModal from "../components/widgets/AddTransactionModal";
import { jwtToken } from "../contexts/UserContext";
import getRandomInt from "../utils/Random";
import BbBtnRound from "../components/widgets/BbBtnRound";
import { loadingAnim } from "../components/widgets/Spinner";
import TransactionsCategoriesChart from "../components/TransactionsCategoriesChart";
import "./Transactions.css"



function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [category, setCategory] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [displayMode, setDisplayMode] = useState("income");


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



  useEffect(() => {
    loadingAnim.show();
    fetch('http://localhost/budget-brudi/api/transactions?limit=20', {
      method: 'GET',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken.get()}`
      }
    }).then((res) => {
      return res.json();
    }).then(transactions => {
      loadingAnim.hide();
      setLoading(false);
      setTransactions(transactions.data);
    });

  }, []);

  useEffect(() => {
    const { chartLabels, chartData } = aggregateCategoryData(transactions, displayMode);
    setChartLabels(chartLabels);
    setChartData(chartData);
  }, [transactions, displayMode]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const postNewTransaction = async (newTransaction) => {
    // TODO validate input
    loadingAnim.show();
    fetch("http://localhost/budget-brudi/api/transactions", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        type: newTransaction.type, amount: newTransaction.Amount, date: newTransaction.date, title: newTransaction.Title, categoryID: newTransaction.categoryID
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken.get()}`
      }
    }).then(res => res.json()).then(response => {
      loadingAnim.hide();
    });
  }

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
    postNewTransaction(transaction);
    setIsModalOpen(false);
  };

  const handleFilterChange = (event) => {
    setCategory(event.target.value);
  };

  const categories = Array.from(new Set([...transactions.map((i) => i.Category)]));

  const filteredData = category ? transactions.filter((item) => item.Category === category) : transactions;


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
        {filteredData.map(({ Category, Title, date, Amount }) => {
          return (
            <Card
              type="category"
              icon={Category}
              title={Title}
              date={date}
              price={Amount}
              key={getRandomInt(0, 10000)}
              onClick={() => { }}
            />
          );
        })}

        {loading && <div className="loader-container">
          <div className="spinner"></div>
        </div>}

        <BbBtnRound position="bottom" type="button" content="+" onClick={openModal} />

      </ContentWrapper>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={addTransaction}
      />
    </>
  );
}

export default Transactions;
