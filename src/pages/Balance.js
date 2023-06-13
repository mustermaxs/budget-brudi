import ContentWrapper from "../components/widgets/ContentWrapper";
import DrawerContainer from "../components/widgets/DrawerContainer";
import InputCollection from "../components/widgets/InputCollection";
import InputCurrency from "../components/widgets/InputCurrency";
import BBInput from "../components/widgets/BBInput";
import Input from "../components/widgets/Input";
import BbBtn from "../components/widgets/BbBtn";
import "../components/widgets/bbTable.css";
import BalanceChart from "../components/BalanceChart";
import { UserContext, jwtToken } from "../contexts/UserContext";
import { useContext, useEffect, useRef, useState } from "react";


function Analysis(props) {
  const { user } = useContext(UserContext);
  const [overview, setOverview] = useState({ balance: "?", expenses: "?", income: "?" });
  const [balances, setBalances] = useState([0, 0, 0, 0]);
  const [forecastData, setForecastData] = useState([]);
  const [goals, setGoals] = useState({ data: [], total: 0.00 });
  const renderChart = useRef(true);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

  const currentMonthIndex = () => {
    const date = new Date();
    return date.getMonth();
  }

  // gets dates from start of year until current month
  // returns them in array
  const getMonthLabels = () => {
    let dates = months.slice(0, currentMonthIndex() + 1);
    console.log(dates);
  }

  // GET GOALS
  useEffect(() => {
    fetch('http://localhost/budget-brudi/api/goals', {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken.get()}`,
      }
    }).then(res => res.json())
      .then(goalsRes => {
        let sumOfGoals = goalsRes.data.reduce((acc, current) =>
          acc + parseFloat(current.Amount), 0);
        setGoals({ data: goalsRes.data, total: sumOfGoals });
        console.log("goals: ", goals);
      });
  }, []);

  useEffect(() => {
    // fetcht balance, expenses, income
    fetch(`http://localhost/budget-brudi/api/accounts/${user.userId}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken.get()}`,
      }
    }).then(res => { return res.json() })
      .then(overview => {
        // Transform strings to numbers and round to two decimal places
        const transformedOverview = Object.entries(overview.data).reduce(
          (acc, [key, value]) => ({ ...acc, [key]: Number(value).toFixed(2) }),
          {}
        );
        setOverview(transformedOverview);
      }, []);

    // TODO fetcht balance in gewissen Zeitraum
    var balancesByDate = [];

    const balancesPromise = new Promise((resolve, reject) => {
      if (!renderChart.current)
        reject();
      const year = new Date().getFullYear();

      for (let month = 0; month <= currentMonthIndex(); month++) {
        fetch(`http://localhost/budget-brudi/api/accounts/${user.userId}/date?month=${month}&year=${year}`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwtToken.get()}`,
          }
        }).then(res => { return res.json() })
          .then(res => {
            balancesByDate[month] = res.data.balance ?? 0.00;

            if (month === currentMonthIndex())
              resolve(balancesByDate);
          })
      }
    }).then(balanceData => {
      if (!renderChart.current)
        return;
      setBalances(balanceData);

      // dummy forecast data
      const forecastOne = parseInt(balanceData[balanceData.length - 1]) + balanceData[balanceData.length - 1] / 2;
      const forecastTwo = forecastOne + forecastOne / 2;
      const forecastThree = forecastTwo + forecastTwo / 3;

      setForecastData([...Array(currentMonthIndex()).fill(null), balanceData[balanceData.length - 1], forecastOne, forecastTwo, forecastThree])

      renderChart.current = false;
      console.log("balances: ", balanceData);
    })
  }, []);


  useEffect(() => {
    console.log("forecastData:", forecastData)
  }, [forecastData])

  const style = {
    marginTop: "2rem",
  }


  // graph mock data
  const labels = months.slice(0, currentMonthIndex() + 1);
  // TODO goal data v. server einfügen mit korrektem Zeitraum
  const goalData = [1200, 1000, 1000, 1300, 1700, 1200];


  // Add next three months to labels
  const labelsWithForecast = [...labels, ...months.slice(currentMonthIndex() + 1, currentMonthIndex() + 4)];

  return (
    <>
      <ContentWrapper>
        {/* <div style={tempStyle}>Graph</div> */}
        {/* <h2 style={{ margin: "auto" }}>Balance</h2> */}
        {!renderChart.current && <BalanceChart style={style} labels={labelsWithForecast} balances={balances} forecast={forecastData} goalData={goalData} />}
        <InputCollection label="Summary">
          <table className="bb-table">
            <tbody>
              <tr>
                <td>Amount left to goal:</td>
                <td className="money expense">{overview.balance - goals.total}</td>
              </tr>
              <tr>
                <td>Balance:</td>
                <td className="money income">{overview.balance}</td>
              </tr>
            </tbody>
          </table>
          <hr />
          <table className="bb-table">
            <tbody>
              <tr>
                <td>Expenses:</td>
                <td className="money expense">{overview.expenses}</td>
              </tr>
              <tr>
                <td>Income:</td>
                <td className="money income">{overview.income}</td>
              </tr>
            </tbody>
          </table>
        </InputCollection>
      </ContentWrapper>
    </>
  );
}

export default Analysis;
