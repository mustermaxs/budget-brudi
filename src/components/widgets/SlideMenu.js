import "./slideMenu.css";

function SlideMenu({ isOpen, children, onToggle }) {
  return (
    <>
      <div
        className={`slideMenuWrapper ${isOpen ? " open" : " close"}`}
      >
        <div id="linksArea">
          <ul className="slideMenuLinks">{children}</ul>
        </div>
        <div id="closeOnClickArea" onClick={onToggle}></div>
      </div>
    </>
  );
}

export default SlideMenu;
