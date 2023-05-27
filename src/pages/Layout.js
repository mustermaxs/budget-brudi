import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Menu from "../components/widgets/Menu";
import { MsgModalContextProvider } from "../contexts/ModalContext";
import FetchInterceptor from "../utils/FetchInterceptor";


function Layout(props) {
  const location = useLocation();

  return (
    <>
    <MsgModalContextProvider>
      <FetchInterceptor />
      <Menu currentPath={location.pathname} />
      <Outlet />
      </MsgModalContextProvider>
    </>
  );
}

export default Layout;
