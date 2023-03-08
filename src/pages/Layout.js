import ReactDOM from "react-dom/client";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Menu from "../components/widgets/Menu";
import TopBar from "../components/widgets/TopBar";

const PAGE_TITLES = {
  "/": "Home",
  "/login": "Login",
  "/registration": "Registration",
};

function Layout(props) {
  const location = useLocation();

  return (
    <>
      <Menu pageTitle={PAGE_TITLES[location.pathname]} />
      <Outlet />
    </>
  );
}

export default Layout;
