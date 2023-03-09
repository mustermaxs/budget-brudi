import ReactDOM from "react-dom/client";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Menu from "../components/widgets/Menu";
import TopBar from "../components/widgets/TopBar";

const routesConfig = {
  "/": "Home",
  "/login": "Login",
  "/registration": "Registration",
  "/profile": "Profile",
};

function Layout(props) {
  const location = useLocation();

  return (
    <>
      <Menu currentPath={location.pathname} />
      <Outlet />
    </>
  );
}

export default Layout;
