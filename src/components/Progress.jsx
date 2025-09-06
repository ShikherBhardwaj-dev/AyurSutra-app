import React from "react";
import ProgressOverviewCards from "./progress/ProgressOverviewCards";
import WellnessTrend from "./progress/WellnessTrend";
import SessionFeedback from "./progress/SessionFeedback";
import RecoveryMilestones from "./progress/RecoveryMilestones";

const Progress = ({ patientProgress, feedbackData }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Progress Tracking & Analytics
      </h2>

      <ProgressOverviewCards patientProgress={patientProgress} />
      <WellnessTrend feedbackData={feedbackData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SessionFeedback feedbackData={feedbackData} />
        <RecoveryMilestones />
      </div>
    </div>
  );
};

export default Progress;
