import React, { useState, useEffect } from "react";
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
import LoadingSpinner from "./components/shared/LoadingSpinner";
import { useAppData } from "./hooks/useAppData";
import authService from "./services/authService";

const App = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [isMenuSticky, setIsMenuSticky] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showLanding, setShowLanding] = useState(true);
  const [isInitializing, setIsInitializing] = useState(true);

  const {
    notifications,
    setNotifications,
    therapySessions,
    patientProgress,
    feedbackData,
  } = useAppData();

  // Initialize authentication state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsInitializing(true);

        // Check if user was previously authenticated
        const storedUser = authService.getStoredUser();
        const token = authService.getToken();

        if (storedUser && token && authService.isTokenValid()) {
          // Try to validate token with server and refresh user data
          const currentUser = await authService.getCurrentUser();

          if (currentUser) {
            setUser(currentUser);
            setIsAuthenticated(true);
            setShowLanding(false);
            console.log("User authenticated from stored session:", currentUser);
          }
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        // Clear invalid auth data
        authService.clearAuthData();
        setIsAuthenticated(false);
        setUser(null);
        setShowLanding(true);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, []);

  // Handle successful authentication
  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowLanding(false);
    console.log("User authenticated:", userData);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      setActiveTab("dashboard");
      setShowLanding(true);
    }
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

  // Show loading spinner while initializing
  if (isInitializing) {
    return <LoadingSpinner message="Initializing AyurSutra..." />;
  }

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
