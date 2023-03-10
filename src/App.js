import {
  BrowserRouter,
  Routes,
  Route,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import Overview from "./pages/Overview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="overview" element={<Overview />} />
          <Route path="*" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
