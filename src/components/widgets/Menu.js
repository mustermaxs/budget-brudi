import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import SlideMenu from "./SlideMenu";
import { UserContext } from "../../contexts/UserContext";

function Menu(props) {
  const { user, handleLogout } = useContext(UserContext);
  const [isOpen, setState] = useState(false);

  const menuLinksNotLoggedIn = [
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
  ];

  const menuLinksIsLoggedIn = [
    {
      href: "/profile",
      title: "Profile",
    },
    {
      href: "/overview",
      title: "Overview",
    },
    {
      href: "/transactions",
      title: "Transactions",
    },
  ];

  const linksConfig = user.isLoggedIn
    ? menuLinksIsLoggedIn
    : menuLinksNotLoggedIn;

  const getPageTitleByHref = (href, linkConfig) => {
    var menuLinkObj = linkConfig.find((el) => el.href === href);
    return menuLinkObj.title;
  };

  const links = (linksConfig) => {
    return linksConfig.map((link) => (
      <li data-isactivelink={link.href === props.currentPath} key={link.href}>
        <Link onClick={() => setState(false)} to={link.href}>
          {link.title}
        </Link>
      </li>
    ));
  };

  return (
    <>
      <TopBar
        menuIsOpen={isOpen}
        onToggle={() => setState(!isOpen)}
        pageTitle={getPageTitleByHref(props.currentPath, linksConfig)}
      />
      <SlideMenu onToggle={() => setState(!isOpen)} isOpen={isOpen}>
        {links(linksConfig)}
        {user.isLoggedIn ? (
          <li
            style={{ marginTop: "2rem", cursor: "pointer" }}
            onClick={handleLogout}
          >
            Logout
          </li>
        ) : (
          ""
        )}
      </SlideMenu>
    </>
  );
}

export default Menu;
