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


function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [cards, setCards] = useState([]);
  const [category, setCategory] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
      console.log(transactions.data);
      // TODO render transactions. vlt über state?
      loadingAnim.hide();
      setLoading(false);
      setTransactions(transactions.data);
    });

    // fetch('http://localhost/budget-brudi/api/categories', {
    //   method: 'GET',
    //   mode: "cors",
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${jwtToken.get()}`
    //   }
    // }).then((res) => {
    //   return res.json();
    // }).then(categories => {
    //   console.log(categories.data);
    //   setLoading(false);
    //   setTransactions(categories.data);
    // });
  }, []);


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
    console.log("test")
  };

  const handleFilterChange = (event) => {
    setCategory(event.target.value);
  };

  const categories = Array.from(new Set([...transactions.map((i) => i.Category)]));

  const filteredData = category ? transactions.filter((item) => item.Category === category) : transactions;

  return (
    <>
      <ContentWrapper>
        <Filter category={category}  categories={categories} onChange={handleFilterChange} />
        {filteredData.map(({ Category, Title, date, Amount }) => {
      return (
        <Card
          type="category"
          icon={Category}
          title={Title}
          date={date}
          price={Amount}
          key={getRandomInt(0,10000)}
          onClick={() => {}}
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
