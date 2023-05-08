import ContentWrapper from "../components/widgets/ContentWrapper";
import BbBtnRound from "../components/widgets/BbBtnRound";
import Card from "../components/widgets/Card";
import "../components/widgets/bbTable.css";
import { jwtToken } from "../contexts/UserContext";
import "../components/widgets/link.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { loadingAnim } from "../components/widgets/Spinner";
import GoalsChart from "../components/GoalsChart";
import "./Goals.css"


function Goals() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartDataColor, setChartDataColor] = useState([]);


  useEffect(() => {
    loadingAnim.show();
    fetch("http://localhost/budget-brudi/api/goals", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken.get()}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((goals) => {

        setChartLabels(goals.data.map(goal => goal.Title));
        setChartData(goals.data.map(goal => parseFloat(goal.Amount)));
        setChartDataColor(goals.data.map(goal => goal.Color));


        console.log(goals)

        console.log(goals.data);
        setCards(goals.data);
        loadingAnim.hide();
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
