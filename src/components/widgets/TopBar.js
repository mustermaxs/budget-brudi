import { useContext } from "react";
import { Link } from "react-router-dom";
import HamburgerIcon from "./Hamburger";
import "./topBar.css";
import { UserContext } from "../../contexts/UserContext";
import BudgetbuddyLogo from "../../assets/icons/icons_raw/BudgetbuddyLogo.png";
import { useNavigate } from "react-router-dom";

function TopBar(props) {
  const navigate = useNavigate();
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
{        !props.menuIsOpen && <div class="bb-logo-wrapper" onClick={() => navigate("/home")}>
          <img src={BudgetbuddyLogo} alt="Logo" />
        </div>}
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
