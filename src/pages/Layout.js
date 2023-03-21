import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Menu from "../components/widgets/Menu";

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
