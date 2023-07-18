import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import "./Dashboard.css";
import DashboardRows from "./DashboardRows";

const Dashboard = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Topbar />
        <div className="widgets">
          <DashboardRows />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
