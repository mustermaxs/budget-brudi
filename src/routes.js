import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import Balance from "./pages/Balance";
import Transactions from "./pages/Transactions";
import Goals from "./pages/Goals";
import AddGoal from "./pages/AddGoal";
import EditGoal from "./pages/EditGoal";

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
    title: "Balance",
    path: "balance",
    component: Balance,
    privateRoute: true,
    permissions: ["user", "admin"],
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
  {
    title: "Add Goal",
    path: "addgoal",
    component: AddGoal,
    privateRoute: true,
    permissions: ["user", "admin"],
    hideInMenu: true,
  },
  {
    title: "Edit Goal",
    path: "editgoal",
    component: EditGoal,
    privateRoute: true,
    permissions: ["user", "admin"],
    hideInMenu: true,
  },
];

export default routes;
