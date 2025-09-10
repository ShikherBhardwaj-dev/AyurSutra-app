import React from "react";
import { Clock, Edit3, Droplets } from "lucide-react";

const UpcomingSessions = ({ therapySessions }) => {
  const upcomingSessions = therapySessions.filter(
    (session) => session.status !== "completed"
  );

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Clock className="h-5 w-5 mr-2 text-blue-600" />
        Upcoming Sessions
      </h3>
      <div className="space-y-4">
        {upcomingSessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Droplets className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{session.name}</h4>
                <p className="text-sm text-gray-600">
                  {session.date} at {session.time}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm text-gray-500">Progress</p>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-blue-500 h-1 rounded-full"
                      style={{ width: `${session.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">
                    {session.progress}%
                  </span>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Edit3 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingSessions;
