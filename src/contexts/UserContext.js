import { createContext, useEffect, useState } from "react";
import decode from 'jwt-decode';

const defaultUser = { isLoggedIn: false, role: "guest" };

const UserContext = createContext(defaultUser);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decode(token);
      const { username, firstname, surname, role } = decodedToken;
      setUser({
        isLoggedIn: true,
        username,
        firstname,
        surname,
        role
      });
    }
  }, []);

  const handleLogin = (token) => {

    const decodedToken = decode(token);
    const { username, firstname, surname, role } = decodedToken;
    setUser({
      isLoggedIn: true,
      username,
      firstname,
      surname,
      role
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