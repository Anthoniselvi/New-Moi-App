import "./Sidebar.css";
import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [currentLink, setCurrentLink] = useState(1);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Moi App</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li className={currentLink === 1 ? "active" : "none"}>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li className={currentLink === 2 ? "active" : "none"}>
              <PersonOutlineIcon className="icon" />
              <span>Events</span>
            </li>
          </Link>

          <p className="title">USER</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li className={currentLink === 3 ? "active" : "none"}>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li className={currentLink === 4 ? "active" : "none"}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
