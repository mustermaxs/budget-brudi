import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import ContentWrapper from "../components/widgets/ContentWrapper";
import InputText from "../components/widgets/InputText";
import { UserContext } from "../contexts/UserContext";
import jwtDecode from "jwt-decode";
import BbBtn from "../components/widgets/BbBtn";
import useValue from "../components/hooks/useValue";

function Login() {
  const [inputValue, handleChange] = useValue({
    username: "",
    password: "",
  });
  const { handleLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // const response = await axios.post("/api/login", { username, password });
      //* MOCK TOKEN RESPONSE

      let response = {
        token: "NULL",
      };

      switch (inputValue.username) {
        case "markus":
          response["token"] =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hcmt1cyIsImZpcnN0bmFtZSI6Ik1hcmt1cyIsInN1cm5hbWUiOiJSw7ZzbmVyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjE5MjE3NDY4LCJleHAiOjE2MTkyMjEwNjh9.RyjygfLJD-zoiiGH4KmOO4puaTAB2sXiZ2rqen-EvKw";
          break;

        case "max":
          response["token"] =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1heCIsImZpcnN0bmFtZSI6Ik1heCIsInN1cm5hbWUiOiJTaW5ubCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYxOTIxNzQ2OCwiZXhwIjoxNjE5MjIxMDY4fQ.Gfoj10_zqujNvzen6C_k0qaSIMLsVg8sAIcsqlNngis";
          break;

        case "mike":
          response["token"] =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2UiLCJmaXJzdG5hbWUiOiJNaWtlIiwic3VybmFtZSI6IkFzdW5jaW9uIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2MTkyMTc0NjgsImV4cCI6MTYxOTIyMTA2OH0.DRYMj6PGmP08fU83e1HTvEYyUKmV7mHC5_3elfwhQwQ";
          break;

        default:
          response = "NULL";
          break;
      }

      handleLogin(response.token);
      navigate("/profile");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <ContentWrapper>
      <form>
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
          type="password"
          onChange={(value) => handleChange("password", value)}
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
