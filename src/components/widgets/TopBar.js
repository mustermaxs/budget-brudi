import { useContext } from "react";
import { Link } from "react-router-dom";
import HamburgerIcon from "./Hamburger";
import "./topBar.css";
import { UserContext } from "../../contexts/UserContext"


function TopBar(props) {

  const { user, handleLogout } = useContext(UserContext);


  return (
    <>
      <div className="topBar">
        <div>
          <Link to="/" className="topBarTitle">{`${props.pageTitle}`}</Link>
        </div>
        {`${user && user.role}`}

        {user.isLoggedIn &&
          <div className="topBarLogout">
            <button onClick={handleLogout}>Logout</button>
          </div>}

        <div
          onClick={() => {
            props.onToggle();
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
