import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import SlideMenu from "./SlideMenu";
import { UserContext } from "../../contexts/UserContext";
import routes from "../../routes";

function Menu(props) {
  const { user, handleLogout } = useContext(UserContext);

  const path = props.currentPath.slice(1);
  const [isOpen, setIsOpen] = useState(false);

  const getPageTitleByHref = (href) => {
    const route = routes.find((route) => route.path === href);
    return route ? route.title : "";
  };

  const links = routes
    .filter((route) => !route.hideInMenu)
    .map((link) => {
      return (
        link.permissions.includes(user.role) && (
          <li data-isactivelink={link.path === path} key={link.path}>
            <Link onClick={() => setIsOpen(false)} to={`/${link.path}`}>
              {link.title}
            </Link>
          </li>
        )
      );
    });

  const handleLogoutAndCloseMenu = () => {
    handleLogout();
    setIsOpen(false);
  };

  return (
    <>
      <TopBar
        menuIsOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        pageTitle={getPageTitleByHref(path)}
      />
      <SlideMenu onToggle={() => setIsOpen(!isOpen)} isOpen={isOpen}>
        {links}
        {user.isLoggedIn && (
          <li data-isactivelink={false} key={"logout"}>
            <Link onClick={handleLogoutAndCloseMenu} to="/">
              Logout
            </Link>
          </li>
        )}
      </SlideMenu>
    </>
  );
}

export default Menu;
