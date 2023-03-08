import { useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import SlideMenu from "./SlideMenu";

function Menu(props) {
  const [isOpen, setState] = useState(false);

  const linksConfig = [
    {
      href: "/login",
      title: "Login",
    },
    {
      href: "/registration",
      title: "Registration",
    },
  ];

  const links = linksConfig.map((link) => (
    <li data-isactivelink={link.href == props.currentPath} key={link.href}>
      <Link onClick={() => setState(false)} to={link.href}>
        {link.title}
      </Link>
    </li>
  ));

  return (
    <>
      <TopBar
        onToggle={() => setState(!isOpen)}
        config={{ ...props, isOpen }}
      />
      <SlideMenu isOpen={isOpen}>{links}</SlideMenu>
    </>
  );
}

export default Menu;
