import ContentWrapper from "../components/widgets/ContentWrapper";
import DrawerContainer from "../components/widgets/DrawerContainer";
import InputCollection from "../components/widgets/InputCollection";
import InputCurrency from "../components/widgets/InputCurrency";
import BBInput from "../components/widgets/BBInput";
import Input from "../components/widgets/Input";
import BbBtn from "../components/widgets/BbBtn";
import Card from "../components/widgets/Card";
import "../components/widgets/bbTable.css";
import { React, useEffect, useState } from "react";

function Goals(props) {
  const [cards, setCards] = useState([]);

  const categories = ["work", "transportation", "health"];

  const mockData = [
    {
      category: "work",
      title: "Hawaii vacation",
      date: "04.03.2023",
      tags: ["#Groceries", "#Birthday"],
      price: 24.9,
    },
    {
      title: "Tesla",
      date: "04.03.2023",
      tags: ["#Work", "#Birthday"],
      price: -24.9,
    },
    {
      category: "health",
      title: "New bicycle",
      date: "04.03.2023",
      tags: ["#Groceries"],
      price: 24.9,
    },
  ];

  const [category, setCategory] = useState();
  return (
    <>
      <ContentWrapper>
        {mockData.map(({ category, title, date, tags, price }) => {
          return (
            <Card
              type="goals"
              title={title}
              date={date}
              price={price}
              key={title}
              //   TODO redirect to "edit goal" page
              onClick={() => {}}
            />
          );
        })}
      </ContentWrapper>
    </>
  );
}

export default Goals;