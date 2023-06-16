import ContentWrapper from "../components/widgets/ContentWrapper";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import InputCollection from "../components/widgets/InputCollection";
// import "./CustomSliderStyle.css";
import { ThemeProvider } from "@emotion/react";
import { theme, BBSwitch } from "./CustomSliderStyle";
import BBInput from "../components/widgets/BBInput";
import "../components/Text.css";
import { Switch } from "@mui/material";
import { useState, useEffect, useRef, useContext } from "react";
import Card from "../components/widgets/Card";
import { UserContext, jwtToken } from "../contexts/UserContext";
import PercentageBubble from "../components/PercentageBubble";
import { useNavigate } from "react-router-dom";
import BbBtn from "../components/widgets/BbBtn";
import MsgModal from "../components/widgets/MsgModal";
import { useMsgModal } from "../contexts/ModalContext";

function SavingsSettings(props) {
  const { msgModal } = useMsgModal();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const maxNbrOfGoals = 5;
  const minNbrOfGoals = 1;
  const [input, setInput] = useState({
    percentage: null,
    nbrOfGoals: null,
    mode: null,
    balance: null,
  });
  const [cards, setCards] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [percentages, setPercentages] = useState([]);
  const [settings, setSettings] = useState({
    percentage: null,
    mode: null,
    nbrOfGoals: null,
    shares: [],
  }); /* shares => [{goalID, percentage}] */
  // will be updated to number of available goals (max. 5)
  // so that no more than the number of available goals can be considered
  // for calculations
  const nbrOfGoalsFetched = useRef(1);

  useEffect(() => {
    fetch(`http://localhost/budget-brudi/api/accounts/${user.userId}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken.get()}`,
        loadingAnim: "true",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setInput({ ...input, balance: res.data.balance });
      });

    // TODO setSettings here
  }, []);

  useEffect(() => {
    fetch("http://localhost/budget-brudi/api/settings", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken.get()}`,
        loadingAnim: "true",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("settings:", res.data);
        setInput((prevInput) => ({
          ...prevInput,
          percentage: res.data.percentage,
          nbrOfGoals: res.data.nbrOfGoals,
          mode: res.data.mode,
        }));
        // setSettings({
        //   ...input,
        //   percentage: res.data.percentage,
        //   nbrOfGoals: res.data.nbrOfGoals,
        //   mode: res.data.mode,
        // });
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost/budget-brudi/api/goals?limit=5", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken.get()}`,
        loadingAnim: "true",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(res);
      })
      .then((goals) => {
        console.log(goals);
        console.log(goals.data);

        nbrOfGoalsFetched.current = goals.data.length;
        setCards(goals.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const createShareObj = () => {
    return selectedGoals.map(({ GoalID }, index) => {
      return { GoalID: GoalID, share: percentages[index] };
    });
  };

  // handles percentage bubbles and renders select number of goals
  useEffect(() => {
    let nbrSelectedGoals = nbrOfGoalsFetched.current;

    if (input.nbrOfGoals <= nbrOfGoalsFetched.current)
      nbrSelectedGoals = input.nbrOfGoals;

    if (input.mode === "equally")
      setPercentages(getEqualPercentages(nbrSelectedGoals));
    else setPercentages(getIncrPercentageValues(nbrSelectedGoals));

    setSelectedGoals(cards.slice(0, nbrSelectedGoals));
    // setSettings({
    //   ...settings,
    //   ...input,
    //   shares: createShareObj(),
    //   mode: input.mode,
    // });
    let updatedShares = createShareObj();

    setSettings((prevSettings) => ({
      ...prevSettings,
      percentage: input.percentage,
      nbrOfGoals: input.nbrOfGoals,
      shares: updatedShares,
      mode: input.mode,
    }));
    console.log("shareobj:", settings.shares);
    console.log("settings obj:", settings);
    console.log("input obj:", input);

  }, [input.nbrOfGoals, input.mode, input.percentage]);

  /* for number of goals to include range slider */
  const marks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    },
  ];

  /* used for "Saving Proportions" range slider */
  const marksPercentage = [
    {
      value: 0,
      label: "0%",
    },
    {
      value: 100,
      label: "100%",
    },
  ];

  /* get shares/percentages for incremental saving mode */
  function getIncrPercentageValues(nbrOfGoals) {
    let percentageBubbleValues = {
      5: [50, 25, 12.5, 6.25, 6.25],
      4: [50, 35, 12.5, 12.5],
      3: [60, 20, 10],
      2: [50, 50],
      1: [100],
    };
    let setIndex =
      nbrOfGoals <= nbrOfGoalsFetched.current
        ? nbrOfGoals
        : nbrOfGoalsFetched.current;
    return percentageBubbleValues[setIndex];
  }

  /* get shares/percentages for equal saving mode */
  function getEqualPercentages(nbrSelectedGoals) {
    let percentage = (100 / nbrSelectedGoals).toFixed(2);

    return Array(nbrSelectedGoals).fill(percentage);
  }

  /* redirect to editgoal page when clicked on goal card */
  const redirectToGoal = (id) => {
    navigate(`/editgoal?id=${id}`);
  };

  /* too lazy to look into what this was supposed to do. completely forgot by now. it works, that's all */
  const handleChange = (eventTarget) => {
    //
    let name = eventTarget.name;
    var value = null;

    if (name === "mode")
      value = eventTarget.checked ? "incremental" : "equally";
    else value = eventTarget.value;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(input);
  };

  const handleSubmit = () => {
    fetch(`http://localhost/budget-brudi/api/settings/`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken.get()}`,
      },
      body: JSON.stringify(settings),
    }).then((res) => {
      if (!res.ok) console.error("updating settings failed");
      else {
        console.info("updated settings");
        msgModal
          .set({
            type: "normal",
            title: "Super",
            message: "Updated settings",
          })
          .show();
      }
    });
  };

  return (
    <>
      <ContentWrapper>
        <InputCollection label="Savings Proportions">
          <p className="italicHelper">
            Set the percentage you want to save on every ingoing transaction
          </p>
          <ThemeProvider theme={theme}>
            <Box sx={{ width: 260, margin: "0 auto" }}>
              <Slider
                aria-label="Percentage of income dedicated for saving"
                value={input.percentage}
                step={1}
                min={0}
                max={100}
                name="percentage"
                valueLabelDisplay="auto"
                onChange={(ev) => handleChange(ev.target)}
                marks={marksPercentage}
              />
            </Box>
          </ThemeProvider>
          <p>
            <div style={{ textAlign: "center" }}>
              <span>&#8709; income / month: {input.balance ?? ""} €</span>
            </div>
            <div style={{ textAlign: "center" }}>
              <span>
                &#8709; amount saved / month:{" "}
                {input.percentage > 0
                  ? (input.balance * (input.percentage / 100)).toFixed(2)
                  : 0}{" "}
                €
              </span>
            </div>
          </p>
        </InputCollection>
        <InputCollection label="Goals">
          <p className="italicHelper">
            Set the number of goals you want to save money for (maximum 5).
            Define if you want to save equal amounts or prioritize them in
            chronological order.
          </p>

          <ThemeProvider theme={theme}>
            <Box sx={{ width: 260, margin: "0 auto" }}>
              <Slider
                aria-label="Number of goals"
                value={input.nbrOfGoals}
                step={1}
                min={minNbrOfGoals}
                max={maxNbrOfGoals}
                name="nbrOfGoals"
                onChange={(ev) => handleChange(ev.target)}
                valueLabelDisplay="auto"
                marks={marks}
              />
            </Box>
          </ThemeProvider>
          <div
            style={{
              width: "100%",
              display: "flex",
              marginTop: "2rem",
              justifyContent: "center",
            }}
          >
            <ThemeProvider theme={theme}>
              <Box>
                <span>Equally</span>
                <Switch
                  name="mode"
                  value={input.mode}
                  checked={input.mode === "incremental"}
                  onClick={(ev) => handleChange(ev.target)}
                />
                <span>Incremental</span>
              </Box>
            </ThemeProvider>
          </div>
        </InputCollection>
        <div style={{ minHeight: "20rem" }}>
          {selectedGoals.map(
            ({ Title, Date, Amount, GoalID, Color, share }, index) => {
              return (
                <>
                  <div className="percentageGoalRow">
                    <PercentageBubble value={percentages[index]} key={index} />

                    <Card
                      size="small"
                      type="goals"
                      title={Title}
                      date={Date}
                      price={Amount}
                      color={Color}
                      key={GoalID}
                      id={GoalID}
                      onClick={redirectToGoal}
                    />
                  </div>
                </>
              );
            }
          )}
        </div>
        <BbBtn type="button" onClick={handleSubmit} content="Save" />
      </ContentWrapper>
    </>
  );
}

export default SavingsSettings;
