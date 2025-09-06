import React, { useState } from "react";
import { Bell, User, Leaf } from "lucide-react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import TherapyScheduling from "./components/TherapyScheduling";
import Notifications from "./components/Notifications";
import Progress from "./components/Progress";
import FloatingActionButton from "./components/FloatingActionButton";
import Footer from "./components/Footer";
import { useAppData } from "./hooks/useAppData";

const App = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userRole, setUserRole] = useState("patient"); // 'patient' or 'practitioner'
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [isMenuSticky, setIsMenuSticky] = useState(false);

  const {
    notifications,
    setNotifications,
    therapySessions,
    patientProgress,
    feedbackData,
  } = useAppData();

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <Dashboard
            userRole={userRole}
            patientProgress={patientProgress}
            notifications={notifications}
          />
        );
      case "scheduling":
        return (
          <TherapyScheduling
            userRole={userRole}
            therapySessions={therapySessions}
          />
        );
      case "notifications":
        return (
          <Notifications
            notifications={notifications}
            setNotifications={setNotifications}
          />
        );
      case "progress":
        return (
          <Progress
            patientProgress={patientProgress}
            feedbackData={feedbackData}
          />
        );
      default:
        return (
          <Dashboard
            userRole={userRole}
            patientProgress={patientProgress}
            notifications={notifications}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        userRole={userRole}
        setUserRole={setUserRole}
        notifications={notifications}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <main>{renderActiveTab()}</main>
      </div>

      <FloatingActionButton
        showQuickMenu={showQuickMenu}
        setShowQuickMenu={setShowQuickMenu}
        isMenuSticky={isMenuSticky}
        setIsMenuSticky={setIsMenuSticky}
      />

      <Footer />
    </div>
  );
};

export default App;
