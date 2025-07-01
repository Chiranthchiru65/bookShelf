import * as React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Outlet } from "react-router-dom";
import "./Dashboard.scss";
interface DashboardProps {}

const Dashboard: React.FunctionComponent<DashboardProps> = () => {
  return (
    <div className="dashboard">
      {/* navbar */}
      <NavBar />
      {/* main */}
      <main className="dashboard__content">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
