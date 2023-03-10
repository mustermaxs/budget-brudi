import { useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import SlideMenu from "./SlideMenu";

function Menu(props) {
  const [isOpen, setState] = useState(false);
  const menuLinks = [
    {
      href: "/",
      title: "Home",
    },
    {
      href: "/login",
      title: "Login",
    },
    {
      href: "/registration",
      title: "Registration",
    },
    {
      href: "/profile",
      title: "Profile",
    },
    {
      href: "/overview",
      title: "Overview",
    },
  ];

  const getPageTitelByHref = (href) => {
    var menuLinkObj = menuLinks.find((el) => el.href === href);
    return menuLinkObj.title;
  };

  console.log("page title: ", getPageTitelByHref(props.currentPath));

  const links = menuLinks.map((link) => (
    <li data-isactivelink={link.href === props.currentPath} key={link.href}>
      <Link onClick={() => setState(false)} to={link.href}>
        {link.title}
      </Link>
    </li>
  ));

  return (
    <>
      <TopBar
        menuIsOpen={isOpen}
        onToggle={() => setState(!isOpen)}
        pageTitle={getPageTitelByHref(props.currentPath)}
      />
      <SlideMenu onToggle={() => setState(!isOpen)} isOpen={isOpen}>
        {links}
      </SlideMenu>
    </>
  );
}

export default Menu;
