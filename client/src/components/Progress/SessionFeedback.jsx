import React from "react";

const SessionFeedback = ({ feedbackData }) => {
  const recentSessions = feedbackData.slice(-3);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Session Feedback Summary</h3>
      <div className="space-y-4">
        {recentSessions.map((session, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{session.session}</span>
              <span className="text-sm text-gray-500">Latest</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Wellness</span>
                <div className="font-medium text-blue-600">
                  {session.wellness}/10
                </div>
              </div>
              <div>
                <span className="text-gray-600">Energy</span>
                <div className="font-medium text-green-600">
                  {session.energy}/10
                </div>
              </div>
              <div>
                <span className="text-gray-600">Sleep</span>
                <div className="font-medium text-purple-600">
                  {session.sleep}/10
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionFeedback;
