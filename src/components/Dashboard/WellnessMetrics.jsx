import React from "react";
import { Heart } from "lucide-react";

const WellnessMetrics = () => {
  const metrics = [
    { label: "Sleep Quality", value: 90, score: "9/10", color: "bg-green-500" },
    { label: "Energy Level", value: 80, score: "8/10", color: "bg-blue-500" },
    {
      label: "Overall Wellness",
      value: 85,
      score: "8.5/10",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Heart className="h-5 w-5 mr-2 text-red-500" />
        Recent Wellness Metrics
      </h3>
      <div className="space-y-3">
        {metrics.map((metric, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{metric.label}</span>
            <div className="flex items-center">
              <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                <div
                  className={`${metric.color} h-2 rounded-full`}
                  style={{ width: `${metric.value}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{metric.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WellnessMetrics;
