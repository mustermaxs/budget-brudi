import { React, useContext } from "react";
import ContentWrapper from "../components/widgets/ContentWrapper";
import BBInput from "../components/widgets/BBInput";
import InputCollection from "../components/widgets/InputCollection";
import BbBtn from "../components/widgets/BbBtn";
import InputCurrency from "../components/widgets/InputCurrency";
import DrawerContainer from "../components/widgets/DrawerContainer";
import { useState } from "react";
import useValue from "../hooks/useValue";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function Profile(props) {
  // const { handleLogin } = useContext(UserContext);
  // const navigate = useNavigate();
  const [inputValues, handleChange] = useValue({
    firstname: "FIRSTNAME",
    surname: "",
    email: "",
    password: "",
    passwordrepeat: "",
  });

  const handleSubmit = (ev) => {
    // TODO
    // console.log(inputValues);
  };

  return (
    <>
      <ContentWrapper>
        <BBInput
          id="firstname"
          name="firstname"
          label="Personal Info"
          placeholder="First Name"
          value={inputValues.name}
          onChange={(value) => handleChange("firstname", value)}
        />
        <BBInput
          id="surname"
          name="surname"
          placeholder="Surname"
          value={inputValues.name}
          onChange={(value) => handleChange("surname", value)}
        />
        <BBInput
          id="email"
          name="email"
          placeholder="Email"
          value={inputValues.name}
          onChange={(value) => handleChange("email", value)}
        />
        <InputCollection>
          <BBInput
            id="password"
            name="password"
            placeholder="Password"
            label="Password"
            value={inputValues.name}
            onChange={(value) => handleChange("password", value)}
          />{" "}
          <BBInput
            id="passwordrepeat"
            name="passwordrepeat"
            placeholder="Repeat Password"
            value={inputValues.name}
            onChange={(value) => handleChange("passwordrepeat", value)}
          />
        </InputCollection>{" "}
      </ContentWrapper>
      <BbBtn content="Submit" type="button" onClick={handleSubmit} />
    </>
  );
}

export default Profile;
