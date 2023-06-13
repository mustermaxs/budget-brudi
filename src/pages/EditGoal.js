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
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jwtToken } from "../contexts/UserContext";
import { loadingAnim } from "../components/widgets/Spinner";

function EditGoal(props) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [goal, setGoal] = useState({
    Title: "",
    Date: "",
    Color: "",
    Amount: "",
    share: "",
  }); // TODO percentage
  const [inputValue, handleChange, setValue] = useValue({ ...goal });
  const requestedGoalId = useRef(searchParams.get("id"));

  //TODO refactoren
  useEffect(() => {
    loadingAnim.show();

    if (
      requestedGoalId.current === undefined ||
      requestedGoalId.current == null
    ) {
      navigate("/goals");
      return;
    }

    fetch(
      `http://localhost/budget-brudi/api/goals/${requestedGoalId.current}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken.get()}`,
        },
      }
    )
      .then((res) => res.json())
      .then((fetchedGoal) => {
        loadingAnim.hide();
        console.log(fetchedGoal.data);
        setValue({ ...fetchedGoal.data });
      })
      .catch((error) => {
        console.error("Error fetching goal:", error);
        // TODO error modal, error handling
        //! was wenn id invalid ist?
      });
  }, []);

  const handleSubmit = (ev) => {
    if (
      requestedGoalId.current === undefined ||
      requestedGoalId.current == null
    ) {
      navigate("/goals");
      return;
    }
    fetch(
      `http://localhost/budget-brudi/api/goals/${requestedGoalId.current}`,
      {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(inputValue),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken.get()}`,
        },
      }
    )
      .then((res) => res.json())
      .then((postRes) => {
        console.log(postRes);
      });
    // TODO error modal & error handling
  };

  const handleDelete = () => {
    fetch(
      `http://localhost/budget-brudi/api/goals/${requestedGoalId.current}`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken.get()}`,
        },
      }
    )
      .then((res) => res.json())
      .then((postRes) => {
        console.log(postRes);
        navigate("/goals");
      });
  };

  return (
    <>
      <ContentWrapper>
        <InputCollection>
          <BBInput
            type="text"
            label="Goal Title"
            value={inputValue.Title}
            name="Title"
            placeholder="eg. Waikiki vacation"
            onChange={(value) => handleChange("Title", value)}
          />
          <Spacer />
          <BBInput
            label="Budget Goal"
            type="currency"
            name="Amount"
            value={inputValue.Amount}
            currency="€"
            placeholder="3000.00"
            size="small"
            onChange={(value) => handleChange("Amount", value)}
          />
          <BBInput
            size="small"
            name="Date"
            type="date"
            value={inputValue.Date}
            label="Reach goal by"
            onChange={(value) => handleChange("Date", value)}
          />
          <Spacer />
          <label className="bb-input-label">Choose a color</label>
          <div className="color-label-wrapper">
            <div className="color-label-row">
              {colors.map((color) => (
                <div
                  className={
                    inputValue.Color === color
                      ? "color-label active"
                      : "color-label"
                  }
                  name="Color"
                  key={color}
                  value={color}
                  data-value={color}
                  style={{ backgroundColor: color }}
                  onClick={(event) => {
                    handleChange("Color", event);
                  }}
                ></div>
              ))}
            </div>
          </div>
        </InputCollection>
        <Spacer />
        {/* TODO percentage */}
        {inputValue.share > 0 ? (
          <div>
            You're saving <span style={{color: "green"}}>{inputValue.share}%</span> of your income for this goal.
            {/* <span>Dedicated percentage</span> */}
            {/* <div className="badge">{inputValue.Percentage}%</div> */}
          </div>
        ) : 
        <div>
          You're currently not saving up for this goal.
          </div>}
        <Spacer />
        <BbBtn content="Update" type="submit" onClick={handleSubmit} />
        <BbBtn content="delete" type="button" onClick={handleDelete} />
      </ContentWrapper>
    </>
  );
}

export default EditGoal;
