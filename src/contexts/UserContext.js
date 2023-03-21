import { createContext, useEffect, useState } from "react";
import decode from 'jwt-decode';

const defaultUser = { isLoggedIn: false, role: "guest" };

const UserContext = createContext(defaultUser);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // TODO check token valid

    if (token) {
      const { username, firstname, surname, role } = decode(token);

      setUser({
        isLoggedIn: true,
        username,
        firstname,
        surname,
        role,
      });
    }
  }, []);

  const handleLogin = (token) => {

    const { username, firstname, surname, role } = decode(token);

    setUser({
      isLoggedIn: true,
      username,
      firstname,
      surname,
      role,
    });
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setUser(defaultUser);
    localStorage.removeItem("token");
    // window.location.href = "/login"; // Redirect to login page after logout
  };

  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };