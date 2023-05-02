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
      console.log(goals.data);
      setCards(goals.data);
    });
  }, [])

              //   TODO redirect to "edit goal" page
              // temporär deaktiviert
              // unklar ob wir es implementieren wollen
              // onClick={handleClick}
  // const handleClick = (title) => {
  //   console.log("clicked on goal:", title);
  //   navigate("/editgoal?id=1");
  // };

  const [category, setCategory] = useState();
  return (
    <>
      <ContentWrapper>
        {cards.map(({ Title, Date, Amount, GoalID, Color }) => {
          return (
            <Card
              type="goals"
              title={Title}
              date={Date}
              price={Amount}
              color={Color}
              key={GoalID}
              //   TODO redirect to "edit goal" page
              // temporär deaktiviert
              // unklar ob wir es implementieren wollen
              // onClick={handleClick}
              onClick={() => {}}
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
