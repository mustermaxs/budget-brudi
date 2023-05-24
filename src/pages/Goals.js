import ContentWrapper from "../components/widgets/ContentWrapper";
import BbBtnRound from "../components/widgets/BbBtnRound";
import Card from "../components/widgets/Card";
import "../components/widgets/bbTable.css";
import { jwtToken } from "../contexts/UserContext";
import "../components/widgets/link.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import GoalsChart from "../components/GoalsChart";
import "./Goals.css"
import { useMsgModal } from "../contexts/ModalContext";

function Goals() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartDataColor, setChartDataColor] = useState([]);
  const {msgModal} = useMsgModal();

  

  const mockData = [
    {
      "Title": "Buy new car",
      "GoalID": 2,
      "F_accountID": 2,
      "Date": "2024-01-01",
      "Color": "#345995",
      "Amount": "25000.00"
    },
    {
      "Title": "Pay off credit card debt",
      "GoalID": 4,
      "F_accountID": 2,
      "Date": "2023-06-30",
      "Color": "#FB4D3D",
      "Amount": "5000.00"
    },
    {
      "Title": "Invest in stocks",
      "GoalID": 6,
      "F_accountID": 2,
      "Date": "2023-09-01",
      "Color": "#535353",
      "Amount": "10000.00"
    },
    {
      "Title": "Save for child education",
      "GoalID": 8,
      "F_accountID": 2,
      "Date": "2025-01-01",
      "Color": "#07a0c3",
      "Amount": "50000.00"
    }
  ]

  useEffect(() => {
    fetch("http://localhost/budget-brudi/api/goals", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken.get()}`,
      },
    })
      .then((res) => {
        if (res.ok)
          return res.json();
        return Promise.reject(res);
      })
      .then((goals) => {
        setChartLabels(goals.data.map(goal => goal.Title));
        setChartData(goals.data.map(goal => parseFloat(goal.Amount)));
        setChartDataColor(goals.data.map(goal => goal.Color));

        console.log(goals)
        console.log(goals.data);
        
        setCards(goals.data);

      }).catch((error) => {
        console.error(error);
      });
  }, []);


  const redirectToGoal = (id) => {
    navigate(`/editgoal?id=${id}`);
  };

  return (
    <>
      <ContentWrapper>
        <div className="chartDiv">
          <GoalsChart title="income" labels={chartLabels} data={chartData} colors={chartDataColor} />

        </div>
        {cards.map(({ Title, Date, Amount, GoalID, Color }) => {
          return (
            <Card
              type="goals"
              title={Title}
              date={Date}
              price={Amount}
              color={Color}
              key={GoalID}
              id={GoalID}
              onClick={redirectToGoal}
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
