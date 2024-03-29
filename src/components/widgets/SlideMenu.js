import "./slideMenu.css";
import BudgetbuddyLogo from "../../assets/icons/icons_raw/BudgetbuddyLogo.png";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function SlideMenu({ isOpen, children, onToggle, closeMenu }) {
  const navigate = useNavigate();
  const initialPageLoad = useRef(true);

  const unsetInitialPageLoad = () => {
    initialPageLoad.current = false;
  };

  const wrapperClassName = initialPageLoad.current
    ? "slideMenuWrapper"
    : `slideMenuWrapper ${isOpen ? "open" : "close"}`;

  setTimeout(() => {
    if (initialPageLoad.current) {
      unsetInitialPageLoad();
    }
  }, 200);

  return (
    <>
      <div className={wrapperClassName}>

        <div id="linksArea">
        <div className="bb-logo-wrapper-slidemenu" onClick={() => {navigate("/home"); closeMenu()}}>
          <img src={BudgetbuddyLogo} alt="Logo" />
        </div>
          <ul className="slideMenuLinks">{children}</ul>
        </div>
        <div id="closeOnClickArea" onClick={closeMenu}></div>
      </div>
    </>
  );
}

export default SlideMenu;
