import React from "react";
import {
  Calendar,
  Bell,
  CheckCircle,
  TrendingUp,
  Activity,
  Heart,
} from "lucide-react";
import QuickStats from "./dashboard/QuickStats";
import ProgressOverview from "./dashboard/ProgressOverview";
import WellnessMetrics from "./dashboard/WellnessMetrics";

const Dashboard = ({ userRole, patientProgress, notifications, user }) => {
  // Function to get appropriate greeting message
  const getGreetingMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Function to get role-specific message
  const getRoleMessage = () => {
    if (userRole === "patient") {
      return "Your wellness journey continues. Next session in 2 days.";
    } else {
      return "You have 5 patients scheduled today.";
    }
  };

  // Function to get user's display name
  const getUserDisplayName = () => {
    if (!user) return "User";

    // If user has a fullName, use it
    if (user.fullName) {
      return user.fullName;
    }

    // Otherwise, use email prefix as fallback
    if (user.email) {
      return user.email.split("@")[0];
    }

    return "User";
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {getGreetingMessage()}, {getUserDisplayName()}!
            </h2>
            <p className="text-gray-600">{getRoleMessage()}</p>
            {user && (
              <div className="mt-2 text-sm text-gray-500">
                Account Type:{" "}
                {userRole === "patient" ? "Patient" : "Practitioner"}
                {user.email && (
                  <span className="ml-4">Email: {user.email}</span>
                )}
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">
              {patientProgress.overallProgress}%
            </div>
            <div className="text-sm text-gray-500">Overall Progress</div>
          </div>
        </div>
      </div>

      <QuickStats
        patientProgress={patientProgress}
        notifications={notifications}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressOverview patientProgress={patientProgress} />
        <WellnessMetrics user={user} />
      </div>
    </div>
  );
};

export default Dashboard;
