import React, { useEffect, useState } from "react";
import ContentWrapper from "../components/widgets/ContentWrapper";
import Card from "../components/widgets/Card";
import Filter from "../components/widgets/Filter";
import BbBtn from "../components/widgets/BbBtn";
import AddTransactionModal from "../components/widgets/AddTransactionModal";
import { jwtToken } from "../contexts/UserContext";
import getRandomInt from "../utils/Random";
import BbBtnRound from "../components/widgets/BbBtnRound";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [cards, setCards] = useState([]);
  const [category, setCategory] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      setLoading(false);
      setTransactions(transactions.data);
    });
  }, []);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addTransaction = (transaction) => {
    setCards((prevCards) => [...prevCards, transaction]);
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

    {loading &&         <div className="loader-container">
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
