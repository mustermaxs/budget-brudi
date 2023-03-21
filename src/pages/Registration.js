import ReactDOM from "react-dom/client";
import Menu from "../components/widgets/Menu";
import ContentWrapper from "../components/widgets/ContentWrapper";
import BBInput from "../components/widgets/BBInput";
import InputCollection from "../components/widgets/InputCollection";
import BbBtn from "../components/widgets/BbBtn";
import { useState } from "react";
import { Link } from "react-router-dom";
import useValue from "../hooks/useValue";

function Registration() {
  const [inputValues, handleChange] = useValue({
    firstname: "FIRSTNAME",
    surname: "",
    email: "",
    password: "",
    passwordrepeat: "",
  });

  const handleClick = () => {
    // TODO
    console.log(inputValues);
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
          id="surname"
          name="surname"
          placeholder="Surname"
          value={inputValues.surname || ""}
          onChange={(value) => handleChange("surname", value)}
        />
        <BBInput
          id="email"
          name="email"
          placeholder="Email"
          onChange={(value) => handleChange("email", value)}
        />
        <InputCollection>
          <BBInput
            id="password"
            name="password"
            placeholder="Password"
            label="Password"
            onChange={(value) => handleChange("password", value)}
          />{" "}
          <BBInput
            id="passwordrepeat"
            name="passwordrepeat"
            placeholder="Repeat Password"
            onChange={(value) => handleChange("passwordrepeat", value)}
          />
        </InputCollection>
      </ContentWrapper>
      <BbBtn content="Submit" type="button" onClick={handleClick} />
      <Link className="bb-link-small" to="/login">
        Already have an account? <br></br> Login
      </Link>
    </>
  );
}

export default Registration;
