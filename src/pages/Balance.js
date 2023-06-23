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
import { loadingAnim } from "../components/widgets/Spinner";

function Analysis(props) {
  const { user } = useContext(UserContext);
  const [overview, setOverview] = useState({
    balance: "?",
    expenses: "?",
    income: "?",
  });
  const [balances, setBalances] = useState([0, 0, 0, 0]);
  const [forecastData, setForecastData] = useState([]);
  const [goals, setGoals] = useState({ data: [], total: 0.0 });
  const renderChart = useRef(true);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentMonthIndex = () => {
    const date = new Date();
    return date.getMonth();
  };

  Array.prototype.insert = function (index, ...items) {
    this.splice(index, 0, ...items);
  };

  // gets dates from start of year until current month
  // returns them in array
  const getMonthLabels = () => {
    let dates = months.slice(0, currentMonthIndex() + 1);
    console.log(dates);
  };

  const calculateForecast = (balances) => {

    if (balances.length < 3) {
      return [];
    }

    let totalChanges = 0;

    // Convert the net balance strings to numbers
    let netBalances = balances.map(balance => parseFloat(balance.net));

    // Calculate the total changes between last 3 consecutive balances
    for (let i = netBalances.length - 1; i > netBalances.length - 4; i--) {
      totalChanges += (netBalances[i] - netBalances[i - 1]);
    }

    // Calculate the average change per balance
    let avgChange = totalChanges / 2;

    let forecast = [];

    // Generate a forecast for the next 3 balances
    for (let i = 1; i <= 3; i++) {

      // Calculate the next balance based on the average change and previous balance
      forecast.push(netBalances[netBalances.length - 1] + avgChange * i);
    }

    return forecast;
  }


  function calculateGoalSums(goals) {
    const goalSums = Array(12).fill(0);

    goals.forEach((goal) => {
      const now = new Date();
      const thisYear = now.getFullYear();

      const date = new Date(goal.Date);
      const year = date.getFullYear();
      const month = date.getMonth();

      if (year === thisYear) {
        goalSums[month] += Number(goal.Amount);
      }
    });

    return goalSums;
  }

  // GET GOALS
  useEffect(() => {
    loadingAnim.show();
    fetch("http://localhost/budget-brudi/api/goals?limit=5&filter=upcomin", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken.get()}`,
      },
    })
      .then((res) => res.json())
      .then((goalsRes) => {
        let sumOfGoals = goalsRes.data.reduce(
          (acc, current) => acc + parseFloat(current.Amount),
          0
        );
        setGoals({ data: calculateGoalSums(goalsRes.data), total: sumOfGoals });
        console.log("goals: ", goals);
        loadingAnim.hide();
      });
  }, []);

  useEffect(() => {
    // fetcht balance, expenses, income
    loadingAnim.show();

    fetch(`http://localhost/budget-brudi/api/accounts/${user.userId}`, {
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
      .then((overview) => {
        // Transform strings to numbers and round to two decimal places
        const transformedOverview = Object.entries(overview.data).reduce(
          (acc, [key, value]) => ({ ...acc, [key]: Number(value).toFixed(2) }),
          {}
        );
        setOverview(transformedOverview);
        console.log("overview", overview);
        loadingAnim.hide();
      }, []);

    // TODO fetcht transactions in gewissem Zeitraum
    var balancesByDate = [];

    const balancesPromise = new Promise((resolve, reject) => {
      if (!renderChart.current) reject();
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      const yearStart = currentYear - 1;
      const monthToString = (month) => month < 10 && "0" + month;

      fetch(
        `http://localhost/budget-brudi/api/transactions/summary/timespan?start=${currentYear}-01&end=${currentYear}-${monthToString(currentMonth)}`,
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
        .then((res) => {
          let transactions = res.data;
          console.log("unedited: ", transactions);

          var monthIndex = 0;
          var transactionIndex = 0;

          do {
            monthIndex = monthIndex % 12;

            let currentTransMonth = new Date(transactions[monthIndex].Date).getMonth() + 1;

            if (currentTransMonth !== monthIndex + 1) {
              let date = `${currentYear}-${monthToString(monthIndex + 1)}`
              transactions.insert(monthIndex, { income: 0.00, expense: 0.00, Date: date });
            }

            let income = transactions[monthIndex].income ?? 0.00;
            let expense = transactions[monthIndex].expense ?? 0.00;
            transactions[monthIndex].income = income;
            transactions[monthIndex].expense = expense;
            transactions[monthIndex].net = (parseFloat(income) + parseFloat(expense)).toFixed(2);

            monthIndex++;
          } while (monthIndex !== currentMonth);
          console.log("tran:", transactions);


          resolve(transactions);
        });
    }).then((balanceData) => {
      if (!renderChart.current) return;
      setBalances(balanceData);

      setForecastData([...Array(currentMonthIndex()).fill(null), 0, ...calculateForecast(balanceData)]);

      renderChart.current = false;
      console.log("balances: ", balanceData);
    });
  }, []);

  const style = {
    marginTop: "2rem",
  };

  // graph mock data
  const labels = months.slice(0, currentMonthIndex() + 1);

  // Add next three months to labels
  const labelsWithForecast = [
    ...labels,
    ...months.slice(currentMonthIndex() + 1, currentMonthIndex() + 4),
  ];

  console.log("labelsWithForecast", labelsWithForecast)


  console.log("forecastData", forecastData)
  const monthlyTransactions = () => {
    return (
      balances.map((transaction) => (
        <>
          <tr>
            <td><span style={{ textDecoration: "underline" }}>{transaction.Date}</span></td>
            <td></td>
          </tr>
          <tr>
            <td>Income</td>
            <td className="money income">{transaction.income}</td>
          </tr>
          <tr>
            <td>Expense</td>
            <td className="money expense">{transaction.expense}</td>
          </tr>

        </>)
      )
    )
  }

  return (
    <>
      <ContentWrapper>
        {/* <div style={tempStyle}>Graph</div> */}
        {/* <h2 style={{ margin: "auto" }}>Balance</h2> */}
        {!renderChart.current && (
          <BalanceChart
            style={style}
            labels={labelsWithForecast}
            balances={balances}
            forecast={forecastData}
            goalData={goals.data}
          />
        )}
        <InputCollection label="Summary">
          <table className="bb-table">
            <tbody>

              <tr>
                <td>Balance:</td>
                <td className="money income">{overview.Balance}</td>
              </tr>

              <tr>
                <td>Expenses:</td>
                <td className="money expense">{overview.sumExpense}</td>
              </tr>
              <tr>
                <td>Income:</td>
                <td className="money income">{overview.sumIncome}</td>
              </tr>
            </tbody>
          </table>
          <hr />
          <table className="bb-table">
            <tbody>
              {balances && monthlyTransactions()}
            </tbody>
          </table>
        </InputCollection>
      </ContentWrapper>
    </>
  );
}

export default Analysis;
