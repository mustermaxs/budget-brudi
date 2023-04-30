import { createContext, useEffect, useState } from "react";
import decode from "jwt-decode";

const jwtToken = {
  get: () => {return localStorage.getItem("token")},
  set: (value) => localStorage.setItem("token", value),
  remove: () => localStorage.removeItem("token")
};

const defaultUser = { isLoggedIn: false, role: "guest" };

const UserContext = createContext(defaultUser);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);

  useEffect(() => {
    const token = jwtToken.get();

    if (token) {
      const { username, firstname, lastname, role } = decode(token);

      setUser({
        isLoggedIn: true,
        username,
        firstname,
        lastname,
        role,
      });
    }
  }, []);

  const handleLogin = async (loginData) => {
    const response = await fetch('http://localhost/budget-brudi/api/login/', {
      method: 'POST',
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data)

      const { token } = data.data;

      if (token) {
        const { username, firstname, lastname, role } = decode(token);

        setUser({
          isLoggedIn: true,
          username,
          firstname,
          lastname,
          role,
        });
        jwtToken.set(token);
        return true;
      } else {
        console.error('Invalid token received');
      }
    }

  };

  const handleRegister = async (registerData) => {
    const response = await fetch('http://localhost/budget-brudi/api/register/', {
      method: 'POST',
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      // Log in the user automatically after successful registration
      await handleLogin({ username: registerData.username, password: registerData.password });

      return true;
    } else {
      console.error('Registration failed');
      return false;
    }
  };

  const handleLogout = () => {
    setUser(defaultUser);
    jwtToken.remove();
    // window.location.href = "/login"; // Redirect to login page after logout
  };

  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout, handleRegister }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext, jwtToken };
