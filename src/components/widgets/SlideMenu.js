import "./slideMenu.css";
import { useRef } from "react";

function SlideMenu({ isOpen, children, onToggle }) {
  const initialPageLoad = useRef(true);

  const unsetInitialPageLoad = () => {
    initialPageLoad.current = false;
  };

  const wrapperClassName = initialPageLoad.current
    ? "slideMenuWrapper"
    : `slideMenuWrapper ${isOpen ? "open" : "close"}`;

  if (initialPageLoad.current) {
    unsetInitialPageLoad();
  }

  return (
    <>
      <div className={wrapperClassName}>
        <div id="linksArea">
          <ul className="slideMenuLinks">{children}</ul>
        </div>
        <div id="closeOnClickArea" onClick={onToggle}></div>
      </div>
    </>
  );
}

export default SlideMenu;
