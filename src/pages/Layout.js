import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Menu from "../components/widgets/Menu";
import { MsgModalContextProvider } from "../contexts/ModalContext";
// import MsgModal from "../components/widgets/MsgModal";

function Layout(props) {
  const location = useLocation();

  return (
    <>
    <MsgModalContextProvider>
      <Menu currentPath={location.pathname} />
      <Outlet />
      </MsgModalContextProvider>
    </>
  );
}

export default Layout;
