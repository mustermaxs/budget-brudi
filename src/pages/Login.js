import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import ContentWrapper from "../components/widgets/ContentWrapper";
import BBInput from "../components/widgets/BBInput";
import { UserContext } from "../contexts/UserContext";
import jwtDecode from "jwt-decode";
import BbBtn from "../components/widgets/BbBtn";
import useValue from "../hooks/useValue";
import SplashScreen from "./SplashScreen";

function Login() {
  const [inputValue, handleChange] = useValue({
    username: "mustermax",
    password: 123,
  });
  const { handleLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    try {


      handleLogin(inputValue);
      // navigate("/profile");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }

  };

  return (
    <ContentWrapper>
      <SplashScreen showFor="0" />

      <form>
        <BBInput
          id="username"
          name="username"
          label="Username"
          placeholder="Username"
          onChange={(event) => handleChange("username", event)}
        />
        <BBInput
          id="password"
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
          onChange={(event) => handleChange("password", event)}
        />
        <BbBtn content="Login" type="submit" onClick={handleLoginFormSubmit}>
          Login
        </BbBtn>
      </form>
      <Link className="bb-link-small" to="/registration">
        Don't have an account yet? <br></br> Register here
      </Link>
    </ContentWrapper>
  );
}

export default Login;
