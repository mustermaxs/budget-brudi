import "./slideMenu.css";

function SlideMenu(props) {
  console.log("slidemenu: ", props.isOpen);
  return (
    <>
      <div
        className={
          props.isOpen ? "slideMenuWrapper open" : "slideMenuWrapper close"
        }
      >
        <ul className="slideMenuLinks">{props.children}</ul>
      </div>
    </>
  );
}

export default SlideMenu;
