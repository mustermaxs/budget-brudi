import { useState } from "react";
import "./drawerContainer.css";

function DrawerContainer(props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <details
        className="bb-drawerContainer"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <summary>
          {props.label} <i className={isOpen ? "arrow down" : "arrow up"}></i>{" "}
        </summary>
        {props.children}
      </details>
    </>
  );
}

export default DrawerContainer;
