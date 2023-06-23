import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ContentWrapper from "../components/widgets/ContentWrapper";
import BBInput from "../components/widgets/BBInput";
import { UserContext } from "../contexts/UserContext";
import BbBtn from "../components/widgets/BbBtn";
import useValue from "../hooks/useValue";
import SplashScreen from "./SplashScreen";
import { jwtToken } from "../contexts/UserContext";
import { useMsgModal } from "../contexts/ModalContext";


function Login() {
  const { msgModal } = useMsgModal();
  const [inputValue, handleChange] = useValue({
    username: null,
    password: null,
  });
  const { handleLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await handleLogin(inputValue);

      if (jwtToken.get() !== null) {
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      msgModal.set({
        type: "error",
        title: "Error",
        message: "Login failed"
      }).show();
    }

  };

  return (
    <ContentWrapper>
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
