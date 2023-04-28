import { createContext, useEffect, useState } from "react";
import decode from "jwt-decode";

const defaultUser = { isLoggedIn: false, role: "guest" };

const UserContext = createContext(defaultUser);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);

  useEffect(() => {
    const token = localStorage.getItem("token");

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

  const handleLogin = async (loginData) => {
    const response = await fetch('https://b209-2a02-8388-1ac3-900-dee9-7301-16db-8eac.ngrok-free.app/budget-brudi/api/login/', {
      method: 'POST',
      mode: "cors",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data)

      const { token } = data.data;
    
      if (token) {
        const { username, firstname, surname, role } = decode(token);
    
        setUser({
          isLoggedIn: true,
          username,
          firstname,
          surname,
          role,
        });
        localStorage.setItem("token", token);
      } else {
        console.error('Invalid token received');
      }
    }
    
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
