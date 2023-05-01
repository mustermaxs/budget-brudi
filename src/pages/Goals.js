import ContentWrapper from "../components/widgets/ContentWrapper";
import DrawerContainer from "../components/widgets/DrawerContainer";
import InputCollection from "../components/widgets/InputCollection";
import InputCurrency from "../components/widgets/InputCurrency";
import BBInput from "../components/widgets/BBInput";
import Input from "../components/widgets/Input";
import BbBtnRound from "../components/widgets/BbBtnRound";
import Card from "../components/widgets/Card";
import "../components/widgets/bbTable.css";
import { jwtToken } from "../contexts/UserContext";
import "../components/widgets/link.css";
import { useNavigate } from "react-router-dom";
import { React, useEffect, useState } from "react";

function Goals(props) {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);


  const mockData = [
    {
      id: 1,
      category: "work",
      title: "Hawaii vacation",
      date: "04.03.2023",
      tags: ["#Groceries", "#Birthday"],
      price: 24.9,
    },
    {
      id: 2,
      title: "Tesla",
      date: "04.03.2023",
      tags: ["#Work", "#Birthday"],
      price: -24.9,
    },
    {
      id: 3,
      category: "health",
      title: "New bicycle",
      date: "04.03.2023",
      tags: ["#Groceries"],
      price: 24.9,
    },
  ];

  const handleClick = (title) => {
    console.log("clicked on goal:", title);
    navigate("/editgoal?id=1");
  };

  useEffect(() => {
    fetch('http://localhost/budget-brudi/api/goals', {
      method: 'GET',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken.get()}`
      }
    }).then((res) => {
      return res.json();
    }).then(goals => {
      console.log(goals.data)
      setGoals(goals.data)
    });
  }, []);
  const [goals, setGoals] = useState(mockData);
  const [category, setCategory] = useState();
  return (
    <>
      <ContentWrapper>
        {goals.map(({ Title: title, date, tags, Amount: price, id, Color: color }) => {
          return (
            <Card
              type="goals"
              title={title}
              color={color}
              date={date}
              price={price}
              key={id}
              //   TODO redirect to "edit goal" page
              onClick={handleClick}
            />
          );
        })}
      </ContentWrapper>
      <BbBtnRound
        onClick={() => {
          navigate("/addgoal");
        }}
        position="bottom"
        content="+"
      />
    </>
  );
}

export default Goals;
