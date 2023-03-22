import { React, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { UserProvider } from "./contexts/UserContext";
import routes from "./routes"

const App = () => {

  const [loading, setLoading] = useState(true);


  //simulate loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (

        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />} >
                <Route index element={<Login />} />
                {routes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      // render private routes
                      route.privateRoute ?
                        <PrivateRoute
                          component={route.component}
                          permissions={route.permissions}
                        /> :
                        // render public routes
                        <route.component />
                    }
                  />
                ))}
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </UserProvider >
      )}
    </>
  );
}

export default App;