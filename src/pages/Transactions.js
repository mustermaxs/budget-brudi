import { React, useEffect, useState } from "react";
import ContentWrapper from "../components/widgets/ContentWrapper";
import Card from "../components/widgets/Card";
import Filter from "../components/widgets/Filter";

function Transactions() {
  const [cards, setCards] = useState([]);

  const categories = ["work", "transportation", "health"];

  const mockData = [
    {
      category: "work",
      title: "Work Expense",
      date: "04.03.2023",
      tags: ["#Groceries", "#Birthday"],
      price: 24.9,
    },
    {
      category: "transportation",
      title: "Tesla Abo",
      date: "04.03.2023",
      tags: ["#Work", "#Birthday"],
      price: -24.9,
    },
    {
      category: "health",
      title: "Apotheke",
      date: "04.03.2023",
      tags: ["#Groceries"],
      price: 24.9,
    },
  ];

  const [category, setCategory] = useState();

  return (
    <>
      <ContentWrapper>
        <Filter category={category} categories={categories} />

        {mockData.map(({ category, title, date, tags, price }) => {
          return (
            <Card
              type="category"
              icon={category}
              title={title}
              date={date}
              tags={tags}
              price={price}
              key={title}
            />
          );
        })}
      </ContentWrapper>
    </>
  );
}

export default Transactions;
