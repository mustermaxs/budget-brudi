import { React, useContext, useState } from "react";
import ContentWrapper from "../components/widgets/ContentWrapper";
import BBInput from "../components/widgets/BBInput";
import InputCollection from "../components/widgets/InputCollection";
import BbBtn from "../components/widgets/BbBtn";
import InputCurrency from "../components/widgets/InputCurrency";
import DrawerContainer from "../components/widgets/DrawerContainer";
import { jwtToken } from "../contexts/UserContext";
import useValue from "../hooks/useValue";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loadingAnim } from "../components/widgets/Spinner";

function Profile(props) {
  // const { handleLogin } = useContext(UserContext);
  // const navigate = useNavigate();
  // TODO fetch personal data

  const [inputValue, handleChange, setValue] = useValue({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordrepeat: "",
  });

  useEffect(() => {
    loadingAnim.show();
    fetch('http://localhost/budget-brudi/api/users', {
      method: 'GET',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken.get()}`
      }
    }).then((res) => {
      return res.json();
    }).then(fetchedUser => {
      loadingAnim.hide();
      console.log(fetchedUser);
      // setUser(fetchedUser.data);
      setValue({ ...fetchedUser.data });

    });
  }, [])


  const handleSubmit = (ev) => {
    fetch('http://localhost/budget-brudi/api/users', {
      method: 'PUT',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken.get()}`
      },
      body: JSON.stringify(inputValue),
    }).then((res) => {
      return res.json();
    }).then(res => {
      console.log(res);
    });
  };

  return (
    <>
      <ContentWrapper>
        <BBInput
          id="firstname"
          name="firstname"
          label="Personal Info"
          placeholder="First Name"
          value={inputValue.firstname || ""}
          onChange={(value) => handleChange("firstname", value)}
        />
        <BBInput
          id="lastname"
          name="lastname"
          placeholder="Lastname"
          value={inputValue.lastname || ""}
          onChange={(value) => handleChange("lastname", value)}
        />
        <BBInput
          id="email"
          name="email"
          placeholder="Email"
          value={inputValue.email || ""}
          onChange={(value) => handleChange("email", value)}
        />
        {/* <InputCollection>
          <BBInput
            id="password"
            name="password"
            placeholder="Password"
            label="Change Password"
            value={inputValue.password}
            onChange={(value) => handleChange("password", value)}
          />{" "}
          <BBInput
            id="passwordrepeat"
            name="passwordrepeat"
            placeholder="Repeat Password"
            value={inputValue.password2}
            onChange={(value) => handleChange("passwordrepeat", value)}
          />
        </InputCollection>{" "} */}
        <BbBtn content="Update" type="button" onClick={handleSubmit} />
      </ContentWrapper>
    </>
  );
}

export default Profile;
