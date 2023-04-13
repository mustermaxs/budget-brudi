import ContentWrapper from "../components/widgets/ContentWrapper";
import DrawerContainer from "../components/widgets/DrawerContainer";
import InputCollection from "../components/widgets/InputCollection";
import InputCurrency from "../components/widgets/InputCurrency";
import BBInput from "../components/widgets/BBInput";
import Input from "../components/widgets/Input";
import BbBtnRound from "../components/widgets/BbBtnRound";
import Card from "../components/widgets/Card";
import "../components/widgets/bbTable.css";
import { Link } from "react-router-dom";
import "../components/widgets/link.css";
import { useNavigate } from "react-router-dom";
import { React, useEffect, useState } from "react";

function Goals(props) {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);

  const categories = ["work", "transportation", "health"];

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

  const [category, setCategory] = useState();
  return (
    <>
      <ContentWrapper>
        {mockData.map(({ category, title, date, tags, price, id }) => {
          return (
            <Card
              type="goals"
              title={title}
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
