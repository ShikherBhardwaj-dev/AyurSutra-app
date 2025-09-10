import React from "react";
import { Activity } from "lucide-react";

const ProgressOverview = ({ patientProgress }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Activity className="h-5 w-5 mr-2 text-blue-600" />
        Therapy Progress
      </h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Overall Progress</span>
            <span className="text-sm font-medium">
              {patientProgress.overallProgress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
              style={{ width: `${patientProgress.overallProgress}%` }}
            ></div>
          </div>
        </div>
        <div className="pt-2">
          <p className="text-sm text-gray-600">Next Milestone</p>
          <p className="font-medium text-gray-800">
            {patientProgress.nextMilestone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;
