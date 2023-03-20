import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import Overview from "./pages/Overview";

const routes = [

    {
        title: "Login",
        path: "login",
        component: Login,
        privateRoute: false,
        permissions: ["guest", "user", "admin"],
    },
    {
        title: "Registration",
        path: "registration",
        component: Registration,
        privateRoute: false,
        permissions: ["guest", "user", "admin"],
    },
    {
        title: "Profile",
        path: "profile",
        component: Profile,
        privateRoute: true,
        permissions: ["user", "admin"],
    },
    {
        title: "Overview",
        path: "overview",
        component: Overview,
        privateRoute: true,
        permissions: ["admin"],
    }
];

export default routes;