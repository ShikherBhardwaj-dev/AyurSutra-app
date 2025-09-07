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
import AuthContainer from "./components/auth/AuthContainer";
import LandingPage from "./components/LandingPage";
import { useAppData } from "./hooks/useAppData";

const App = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [isMenuSticky, setIsMenuSticky] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showLanding, setShowLanding] = useState(true); // New state for landing page

  const {
    notifications,
    setNotifications,
    therapySessions,
    patientProgress,
    feedbackData,
  } = useAppData();

  // Handle successful authentication
  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowLanding(false); // Hide landing page after auth
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setActiveTab("dashboard");
    setShowLanding(true); // Show landing page again
  };

  // Handle "Get Started" button from landing page
  const handleGetStarted = () => {
    setShowLanding(false);
    // This will show the auth container since isAuthenticated is false
  };

  // Get user role from user data
  const getUserRole = () => {
    return user?.userType || "patient";
  };

  const renderActiveTab = () => {
    const userRole = getUserRole();

    switch (activeTab) {
      case "dashboard":
        return (
          <Dashboard
            userRole={userRole}
            patientProgress={patientProgress}
            notifications={notifications}
            user={user}
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
            user={user}
          />
        );
    }
  };

  // Show landing page first
  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // If not authenticated, show auth pages
  if (!isAuthenticated) {
    return (
      <AuthContainer
        onAuthSuccess={handleAuthSuccess}
        onBackToLanding={() => setShowLanding(true)}
      />
    );
  }

  // Main application (authenticated user)
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        userRole={getUserRole()}
        notifications={notifications}
        user={user}
        onLogout={handleLogout}
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
