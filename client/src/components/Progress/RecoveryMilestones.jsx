import React from "react";

const RecoveryMilestones = () => {
  const milestones = [
    {
      title: "Initial Assessment",
      subtitle: "Completed on Sep 1, 2025",
      status: "completed",
      color: "bg-green-500",
    },
    {
      title: "Detoxification Phase",
      subtitle: "Completed on Sep 5, 2025",
      status: "completed",
      color: "bg-green-500",
    },
    {
      title: "Mid-therapy Assessment",
      subtitle: "In progress",
      status: "current",
      color: "bg-blue-500 animate-pulse",
    },
    {
      title: "Rejuvenation Phase",
      subtitle: "Upcoming",
      status: "upcoming",
      color: "bg-gray-300",
    },
    {
      title: "Final Assessment",
      subtitle: "Scheduled for Sep 20, 2025",
      status: "upcoming",
      color: "bg-gray-300",
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Recovery Milestones</h3>
      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`w-4 h-4 ${milestone.color} rounded-full`}></div>
            <div>
              <p
                className={`font-medium ${
                  milestone.status === "upcoming" ? "text-gray-500" : ""
                }`}
              >
                {milestone.title}
              </p>
              <p
                className={`text-sm ${
                  milestone.status === "upcoming"
                    ? "text-gray-400"
                    : "text-gray-600"
                }`}
              >
                {milestone.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecoveryMilestones;
