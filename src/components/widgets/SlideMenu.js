import "./slideMenu.css";

function SlideMenu(props) {
  return (
    <>
      <div
        className={
          props.isOpen ? "slideMenuWrapper open" : "slideMenuWrapper close"
        }
      >
        <div id="linksArea">
          <ul className="slideMenuLinks">{props.children}</ul>
        </div>
        <div id="closeOnClickArea" onClick={props.onToggle}></div>
      </div>
    </>
  );
}

export default SlideMenu;
