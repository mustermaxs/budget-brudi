import "./Hamburger.css";
import { useState } from "react";

function HamburgerIcon(props) {
  // const [status, setStatus] = useState(0);
  const closingAnim = () => {
    // menuIsOpen = false;
    // hamburger.classList.remove("closed");
    // menu.classList.add("closed");
  };

  return (
    <div
      className={props.isOpen ? "" : "closed"}
      id="hamburger"
      title="Menü öffnen/schließen"
    >
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
    </div>
  );
}

export default HamburgerIcon;
