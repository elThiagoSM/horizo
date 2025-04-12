import { useState } from "react";
import Sidebar from "../../components/Dashboard/SliderbarDashboard";
import Header from "../../components/Dashboard/HeaderDashboard";

import HomeDashboard from "../../components/Dashboard/HomeDashboard/HomeDashboard";
import BusinessPageBuilder from "../../components/Dashboard/BusinessPageBuilder/BusinessPageBuilder";
import ScheduleSettings from "../../components/Dashboard/ScheduleSettings/ScheduleSettings";
import ReservationPanel from "../../components/Dashboard/ReservationPanel/ReservationPanel";
import ServiceManager from "../../components/Dashboard/ServiceManager/ServiceManager";
import Settings from "../../components/Dashboard/Settings/Settings";

import BusinessSettingsPanel from "../../components/Dashboard/BusinessSettingsPanel/BusinessSettingsPanel";

function Dashboard() {
  const [activeView, setActiveView] = useState("home");

  const renderView = () => {
    switch (activeView) {
      case "home":
        return <HomeDashboard />;
      case "page":
        return <BusinessSettingsPanel />;
      case "schedule":
        return <ScheduleSettings />;
      case "reservations":
        return <ReservationPanel />;
      case "services":
        return <ServiceManager />;
      case "settings":
        return <Settings />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar onNavigate={setActiveView} activeView={activeView} />
      <div className="flex flex-col flex-1 ml-64 p-6">
        <Header activeView={activeView} />
        <main className="flex-1 mt-12 ">{renderView()}</main>
      </div>
    </div>
  );
}

export default Dashboard;
