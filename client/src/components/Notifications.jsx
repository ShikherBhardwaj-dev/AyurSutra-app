import React from "react";
import NotificationPreferences from "./notifications/NotificationPreferences";
import NotificationsList from "./notifications/NotificationsList";
import PrecautionGuidelines from "./notifications/PrecautionGuidelines";

const Notifications = ({ notifications, setNotifications }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Notifications & Precautions
        </h2>
        <div className="flex space-x-2">
          <button className="px-3 py-2 bg-blue-100 text-blue-700 rounded text-sm">
            All
          </button>
          <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm">
            Pre-Care
          </button>
          <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm">
            Post-Care
          </button>
        </div>
      </div>

      <NotificationPreferences />
      <NotificationsList
        notifications={notifications}
        setNotifications={setNotifications}
      />
      <PrecautionGuidelines />
    </div>
  );
};

export default Notifications;
