import { useContext } from "react";
import { Link } from "react-router-dom";
import HamburgerIcon from "./Hamburger";
import "./topBar.css";
import { UserContext } from "../../contexts/UserContext"

function TopBar(props) {

  const { user, handleLogout } = useContext(UserContext);

  const toggleMenu = () => {
    props.onToggle();
  };

  return (
    <>
      <div className="topBar">
        <div>
          <span className="topBarTitle">{props.pageTitle}</span>
        </div>
        {/* {`${user && user.role}`} */}

        <div
          onClick={() => {
            props.onToggle();
            // toggleMenu();
          }}
          className={props.menuIsOpen ? "closed" : ""}
          id="hamburger"
          title="Menü öffnen/schließen"
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
      </div>
    </>
  );
}

export default TopBar;
