import ContentWrapper from "../components/widgets/ContentWrapper";
import DrawerContainer from "../components/widgets/DrawerContainer";
import InputCollection from "../components/widgets/InputCollection";
import InputCurrency from "../components/widgets/InputCurrency";
import BBInput from "../components/widgets/BBInput";
import Input from "../components/widgets/Input";
import BbBtn from "../components/widgets/BbBtn";
import "../components/widgets/bbTable.css";
import BalanceChart from "../components/BalanceChart";

function Analysis(props) {

  const style = {
    marginTop: "2rem",
  }

  const handleSubmit = () => { };

  //graph mock data
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const data = [1000, 1200, 900, 1500, 1800, 1300];

  return (
    <>
      <ContentWrapper>
        {/* <div style={tempStyle}>Graph</div> */}
        {/* <h2 style={{ margin: "auto" }}>Balance</h2> */}
        <BalanceChart style={style} labels={labels} data={data} />
        <InputCollection label="Summary">
          <table className="bb-table">
            <tbody>
              <tr>
                <td>Amount left to goal:</td>
                <td className="money expense">234.90</td>
              </tr>
              <tr>
                <td>Balance:</td>
                <td className="money income">10765.69</td>
              </tr>
            </tbody>
          </table>
          <hr />
          <table className="bb-table">
            <tbody>
              <tr>
                <td>Expenses:</td>
                <td className="money expense">234.69</td>
              </tr>
              <tr>
                <td>Income:</td>
                <td className="money income">3467.90</td>
              </tr>
            </tbody>
          </table>
        </InputCollection>
        <form onSubmit={handleSubmit}>
          <DrawerContainer label="Budget goal">
            <InputCollection>
              <BBInput
                type="currency"
                label="Budget goal"
                size="small"
                name="budgetgoal"
                currency="€"
              />
              <Input size="small" type="date" label="Reach goal by" />
            </InputCollection>
            <BbBtn content="Save" />
          </DrawerContainer>
        </form>
      </ContentWrapper>
    </>
  );
}

export default Analysis;
