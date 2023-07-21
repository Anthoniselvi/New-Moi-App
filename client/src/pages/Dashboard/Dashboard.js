import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import "./Dashboard.css";
import DashboardRows from "./DashboardRows";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("profile");
  return (
    <div className="home">
      <Sidebar profileId={profileId} />
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