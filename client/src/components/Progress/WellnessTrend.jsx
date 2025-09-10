import React from "react";

const WellnessTrend = ({ feedbackData }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Wellness Metrics Over Time</h3>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Overall Wellness Trend
            </span>
            <span className="text-sm text-green-600">↗ Improving</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {feedbackData.map((data, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-500 mb-1">{data.session}</div>
                <div className="space-y-1">
                  <div className="h-16 bg-gray-200 rounded relative">
                    <div
                      className="absolute bottom-0 w-full bg-blue-500 rounded"
                      style={{ height: `${data.wellness * 10}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600">
                    {data.wellness}/10
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessTrend;
