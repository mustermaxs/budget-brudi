import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { React, useEffect, useState } from "react";
import ContentWrapper from "../components/widgets/ContentWrapper";
import InputCollection from "../components/widgets/InputCollection";
import BBInput from "../components/widgets/BBInput";
import Spacer from "../components/widgets/Spacer";
import Input from "../components/widgets/Input";
import "../components/widgets/colorlabelpicker.css";
import colors from "../assets/colors_mock";
import useValue from "../hooks/useValue";
import BbBtn from "../components/widgets/BbBtn";

function EditGoal(props) {
  // TODO fetch goal from server,
  //give object "useValue" function
  // MOCK
  const [inputValue, handleChange] = useValue({
    goaltitle: "Vacation in Waikiki",
    budgetgoal: 3700,
    date: "2024-08-10",
    color: "#535353",
  });

  const handleSubmit = (ev) => {
    ev.preventDefault();
    // TODO
  };

  return (
    <>
      <ContentWrapper>
        <InputCollection>
          <BBInput
            type="text"
            label="Goal Title"
            value={inputValue.goaltitle}
            name="goaltitle"
            placeholder="eg. Waikiki vacation"
            onChange={(value) => handleChange("goaltitle", value)}
          />
          <Spacer />
          <BBInput
            label="Budget Goal"
            type="currency"
            name="budgetgoal"
            value={inputValue.budgetgoal}
            currency="€"
            placeholder="3000.00"
            size="small"
            onChange={(value) => handleChange("budgetgoal", value)}
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
        <BbBtn content="Update" type="submit" onClick={handleSubmit} />
      </ContentWrapper>
    </>
  );
}

export default EditGoal;
