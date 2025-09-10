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

const Dashboard = ({ userRole, patientProgress, notifications }) => {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome back,{" "}
              {userRole === "patient" ? "Priya Sharma" : "Dr. Rajesh Kumar"}
            </h2>
            <p className="text-gray-600">
              {userRole === "patient"
                ? "Your wellness journey continues. Next session in 2 days."
                : "You have 5 patients scheduled today."}
            </p>
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
        <WellnessMetrics />
      </div>
    </div>
  );
};

export default Dashboard;
