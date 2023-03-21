import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import Overview from "./pages/Overview";
import Transactions from "./pages/Transactions";
import Goals from "./pages/Goals";

const routes = [
  {
    title: "Home",
    path: "",
    component: Login,
    privateRoute: false,
    permissions: ["guest"],
  },
  {
    title: "Login",
    path: "login",
    component: Login,
    privateRoute: false,
    permissions: ["guest"],
  },
  {
    title: "Registration",
    path: "registration",
    component: Registration,
    privateRoute: false,
    permissions: ["guest"],
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
  },
  {
    title: "Transactions",
    path: "transactions",
    component: Transactions,
    privateRoute: true,
    permissions: ["user", "admin"],
  },
  {
    title: "Goals",
    path: "goals",
    component: Goals,
    privateRoute: true,
    permissions: ["user", "admin"],
  },
];

export default routes;