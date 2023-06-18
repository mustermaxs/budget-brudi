import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { React, useEffect, useState } from "react";
import ContentWrapper from "../components/widgets/ContentWrapper";
import InputCollection from "../components/widgets/InputCollection";
import BBInput from "../components/widgets/BBInput";
import Spacer from "../components/widgets/Spacer";
import { jwtToken } from "../contexts/UserContext";
import "../components/widgets/colorlabelpicker.css";
import colors from "../assets/colors_mock";
import useValue from "../hooks/useValue";
import { useNavigate } from "react-router-dom";
import BbBtn from "../components/widgets/BbBtn";
import { useMsgModal } from "../contexts/ModalContext";


function AddGoal(props) {
  const {msgModal} = useMsgModal();
  const navigate = useNavigate();
  const [inputValue, handleChange] = useValue({
    title: "",
    budgetgoal: "",
    date: "",
    color: "",
  });

  const handleSubmit = (ev) => {
    ev.preventDefault();

    fetch('http://localhost/budget-brudi/api/goals', {
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken.get()}`
      },
      body: JSON.stringify(inputValue),
    }).then((res) => {
      if (res.ok)
      {
        msgModal.set({
          type: "normal",
          title: "Super",
          message: "Added new budget goal"
        }).show();
        
        navigate("/savings");

        return res.json();
      }

      else {
        msgModal.set({
          type: "error",
          title: "Overachiever",
          message: "You reached the limit of 5 goals"
        }).show();

        navigate("/goals");
      }
    })
  };

  return (
    <>
      <ContentWrapper>
        <InputCollection>
          <BBInput
            type="text"
            label="Goal Title"
            value={inputValue.title}
            name="goaltitle"
            placeholder="eg. Waikiki vacation"
            onChange={(value) => handleChange("title", value)}
          />
          <Spacer />
          <BBInput
            label="Budget Goal"
            type="currency"
            name="budgetgoal"
            value={inputValue.amount}
            currency="€"
            placeholder="3000.00"
            size="small"
            onChange={(value) => handleChange("amount", value)}
          />
          <BBInput
            size="small"
            name="date"
            type="date"
            // placeholder={inputValue.date}
            value={inputValue.date}
            label="Reach goal by"
            onChange={(value) => handleChange("date", value)}
          />
          <Spacer />
          <label className="bb-input-label">Choose a color</label>
          <div className="color-label-wrapper">
            <div className="color-label-row">
              {colors.map((color) => (
                <div
                  className={
                    inputValue.color === color
                      ? "color-label active"
                      : "color-label"
                  }
                  name="color"
                  key={color}
                  value={color}
                  data-value={color}
                  style={{ backgroundColor: color }}
                  onClick={(event) => {
                    handleChange("color", event);
                  }}
                ></div>
              ))}
            </div>
          </div>
        </InputCollection>
        <BbBtn content="Add Goal" type="submit" onClick={handleSubmit} />
      </ContentWrapper>
    </>
  );
}

export default AddGoal;
