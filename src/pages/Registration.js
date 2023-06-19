import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import ContentWrapper from "../components/widgets/ContentWrapper";
import BBInput from "../components/widgets/BBInput";
import InputCollection from "../components/widgets/InputCollection";
import BbBtn from "../components/widgets/BbBtn";
import useValue from "../hooks/useValue";

function Registration() {
  const [inputValues, handleChange] = useValue({
    firstname: "FIRSTNAME",
    lastname: "",
    username: "",
    password: "",
    passwordrepeat: "",
  });
  const { handleRegister } = useContext(UserContext);
  const navigate = useNavigate();


  const handleRegisterFormSubmit = async (event) => {
    event.preventDefault();

    try {

      if (handleRegister(inputValues)) {
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }

  };
  return (
    <>
      <ContentWrapper>
        <BBInput
          id="firstname"
          name="firstname"
          label="Personal Info"
          placeholder="First Name"
          onChange={(value) => handleChange("firstname", value)}
        />
        <BBInput
          id="lastname"
          name="lastname"
          placeholder="Lastname"
          value={inputValues.lastname || ""}
          onChange={(value) => handleChange("lastname", value)}
        />
        <BBInput
          id="username"
          name="username"
          placeholder="Username"
          onChange={(value) => handleChange("username", value)}
        />
        <InputCollection>
          <BBInput
            id="password"
            name="password"
            placeholder="Password"
            label="Password"
            type="password"
            onChange={(value) => handleChange("password", value)}
          />{" "}
          <BBInput
            id="passwordrepeat"
            name="passwordrepeat"
            placeholder="Repeat Password"
            type="password"
            onChange={(value) => handleChange("passwordrepeat", value)}
          />
        </InputCollection>
      </ContentWrapper>
      <BbBtn content="Submit" type="button" onClick={handleRegisterFormSubmit} />
      <Link className="bb-link-small" to="/login">
        Already have an account? <br></br> Login
      </Link>
    </>
  );
}

export default Registration;
