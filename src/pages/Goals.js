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

function Goals() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [chartLabels, setChartLabels] = useState([]); // Add state for chart labels
  const [chartData, setChartData] = useState([]); // Add state for chart data

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
        loadingAnim.hide();
        console.log(goals.data);
        setCards(goals.data);

        const chartLabels = goals.data.map((goal) => goal.Title);
        const chartData = goals.data.map((goal) => parseFloat(goal.Amount));
        setChartLabels(chartLabels);
        setChartData(chartData);
      });
  }, []);


  const redirectToGoal = (id) => {
    navigate(`/editgoal?id=${id}`);
  };

  return (
    <>
      <ContentWrapper>
        <GoalsChart labels={chartLabels} data={chartData} />
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
