import { useState } from "react";
import { Header } from "./dashboard/Header";
import { Sidebar } from "./dashboard/Sidebar";
import { MainContent } from "./dashboard/MainContent";

export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex">
        <Sidebar
          open={sidebarOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <MainContent
          activeSection={activeSection}
          sidebarOpen={sidebarOpen}
        />
      </div>
    </div>
  );
};