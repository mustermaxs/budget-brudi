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

function EditGoals(props) {
  return (
    <>
      <ContentWrapper>
        <InputCollection>
          <BBInput
            type="text"
            label="Goal Title"
            name="budgettitle"
            placeholder="eg. Waikiki vacation"
          />
          <Spacer />
          <BBInput
            label="Budget Goal"
            type="currency"
            name="budgetgoal"
            currency="€"
            placeholder="3000.00"
            size="small"
          />
          <Input size="small" type="date" label="Reach goal by" />
          <Spacer />
          <label className="bb-input-label">Choose a color</label>
          <div className="colorpicker-wrapper">
            <div className="row">
              {colors.concat(colors).map((color) => (
                <div className="color-label-container" key={color}>
                  <div
                    className="color-label"
                    style={{ backgroundColor: color }}
                  ></div>
                </div>
              ))}
            </div>
            {/* <div className="row">
              <div className="color-label"></div>
              <div className="color-label"></div>
              <div className="color-label"></div>
            </div> */}
          </div>
        </InputCollection>
      </ContentWrapper>
    </>
  );
}

export default EditGoals;
