import ReactDOM from "react-dom/client";
import { useState } from "react";
import BbBtn from "../components/widgets/BbBtn";
import ContentWrapper from "../components/widgets/ContentWrapper";
import InputText from "../components/widgets/InputText";
import { Link } from "react-router-dom";

function Login() {
  const [inputValues, setValue] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = () => {
    // TODO
    console.log(inputValues);
  };

  const handleChange = (name, newValue) => {
    setValue((prevValue) => ({
      ...prevValue,
      [name]: newValue,
    }));
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
