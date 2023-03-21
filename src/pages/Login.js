import ReactDOM from "react-dom/client";
import { useState } from "react";
import BbBtn from "../components/widgets/BbBtn";
import ContentWrapper from "../components/widgets/ContentWrapper";
import InputText from "../components/widgets/InputText";
import { Link } from "react-router-dom";
import useValue from "../components/hooks/useValue";

function Login() {
  const [inputValue, handleChange] = useValue({
    username: "",
    password: "",
  });

  const handleSubmit = () => {
    // TODO
    console.log(inputValue);
  };

  return (
    <>
      <ContentWrapper>
        <InputText
          id="username"
          name="username"
          label="Username"
          placeholder="Username"
          onChange={(value) => handleChange("username", value)}
        />

        <InputText
          id="password"
          name="password"
          label="Password"
          placeholder="Password"
          onChange={(value) => handleChange("password", value)}
        />
      </ContentWrapper>
      <BbBtn content="Login" type="button" onClick={handleSubmit} />
      <Link className="bb-link-small" to="/registration">
        Don't have an account yet? <br></br> Register here
      </Link>
    </>
  );
}

export default Login;
