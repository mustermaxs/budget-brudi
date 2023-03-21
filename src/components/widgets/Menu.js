import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import SlideMenu from "./SlideMenu";
import { UserContext } from "../../contexts/UserContext";
import routes from "../../routes"

function Menu(props) {

  const { user, handleLogout } = useContext(UserContext);

  const path = props.currentPath.slice(1,);
  const [isOpen, setState] = useState(false);


  const getPageTitleByHref = (href) => {
    const route = routes.find((route) => route.path === href);
    return route ? route.title : "NULL";
  };

  const links = routes.map((route) => {

    return (
      route.permissions.includes(user.role) &&
      <li data-isactivelink={route.path === path} key={route.path}>
        <Link onClick={() => setState(false)} to={`/${route.path}`}>
          {route.title}
        </Link>
      </li>
    );
  });


  const handleLogoutAndCloseMenu = () => {
    handleLogout();
    setState(false);
  };

  return (
    <>
      <TopBar
        menuIsOpen={isOpen}
        onToggle={() => setState(!isOpen)}
        pageTitle={getPageTitleByHref(path)}

      />
      <SlideMenu onToggle={() => setState(!isOpen)} isOpen={isOpen}>
        {links}
        {user.isLoggedIn &&
          <li data-isactivelink={false} key={"logout"}>
            <Link onClick={handleLogoutAndCloseMenu} to="/">
              Logout
            </Link>
          </li>
        }

      </SlideMenu>
    </>
  );
}

export default Menu;
