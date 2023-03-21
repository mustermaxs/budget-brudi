import { useContext } from "react";
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

function EditGoals(props) {
  const [inputValue, handleChange] = useValue({
    goaltitle: "",
    budgetgoal: "",
    date: "",
    color: "",
  });

  return (
    <>
      <ContentWrapper>
        <InputCollection>
          <BBInput
            type="text"
            label="Goal Title"
            name="goaltitle"
            placeholder="eg. Waikiki vacation"
            onChange={(value) => handleChange("goaltitle", value)}
          />
          <Spacer />
          <BBInput
            label="Budget Goal"
            type="currency"
            name="budgetgoal"
            currency="€"
            placeholder="3000.00"
            size="small"
            onChange={(value) => handleChange("budgetgoal", value)}
          />
          <BBInput
            size="small"
            name="date"
            type="date"
            label="Reach goal by"
            onChange={(value) => handleChange("date", value)}
          />
          <Spacer />
          <label className="bb-input-label">Choose a color</label>
          <div className="color-label-wrapper">
            <div className="color-label-row">
              {colors.map((color) => (
                <div
                  className="color-label"
                  name="color"
                  key={color}
                  style={{ backgroundColor: color }}
                  // TODO set color state
                  onClick={() => {}}
                ></div>
              ))}
            </div>
          </div>
        </InputCollection>
      </ContentWrapper>
    </>
  );
}

export default EditGoals;
