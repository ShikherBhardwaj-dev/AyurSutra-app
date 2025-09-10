import React from "react";
import { AlertCircle, CheckCircle, Eye } from "lucide-react";

const NotificationsList = ({ notifications, setNotifications }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Recent Notifications</h3>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border-l-4 ${
              notification.type === "pre"
                ? "border-orange-500 bg-orange-50"
                : "border-green-500 bg-green-50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {notification.type === "pre" ? (
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-1" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                )}
                <div>
                  <h4 className="font-medium text-gray-900">
                    {notification.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {notification.time}
                  </p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsList;
