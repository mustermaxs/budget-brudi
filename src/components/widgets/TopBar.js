import { useState } from "react";
import { Link } from "react-router-dom";
import HamburgerIcon from "./Hamburger";
import "./topBar.css";

function TopBar(props) {
  const toggleMenu = () => {
    props.onToggle();
  };

  return (
    <>
      <div className="topBar">
        <div>
          <span className="topBarTitle">{props.config.pageTitle}</span>
        </div>
        <div
          onClick={() => {
            props.onToggle();
            toggleMenu();
          }}
          className={props.config.isOpen ? "closed" : ""}
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
