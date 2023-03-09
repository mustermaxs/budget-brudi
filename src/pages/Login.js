import ReactDOM from "react-dom/client";
import BbBtn from "../components/widgets/BbBtn";
import ContentWrapper from "../components/widgets/ContentWrapper";
import InputText from "../components/widgets/InputText";

function Login() {
  return (
    <>
      <ContentWrapper>
        <InputText
          id="username"
          name="username"
          label="Username"
          placeholder="Username"
        />

        <InputText
          id="password"
          name="password"
          label="Password"
          placeholder="Password"
        />
      </ContentWrapper>
      <BbBtn content="Next" />
    </>
  );
}

export default Login;
