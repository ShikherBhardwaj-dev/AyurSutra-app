import React from "react";
import { Bell, Smartphone, Phone, Mail } from "lucide-react";

const NotificationPreferences = () => {
  const preferences = [
    {
      icon: Smartphone,
      title: "In-App Notifications",
      description: "Real-time alerts",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      checked: true,
    },
    {
      icon: Phone,
      title: "SMS Alerts",
      description: "Text messages",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      checked: true,
    },
    {
      icon: Mail,
      title: "Email Reminders",
      description: "Daily summaries",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      checked: false,
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Bell className="h-5 w-5 mr-2 text-orange-600" />
        Notification Preferences
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {preferences.map((pref, index) => {
          const IconComponent = pref.icon;
          return (
            <div
              key={index}
              className={`flex items-center space-x-3 p-3 ${pref.bgColor} rounded-lg`}
            >
              <IconComponent className={`h-6 w-6 ${pref.iconColor}`} />
              <div>
                <p className="font-medium">{pref.title}</p>
                <p className="text-sm text-gray-600">{pref.description}</p>
              </div>
              <input
                type="checkbox"
                className="ml-auto"
                defaultChecked={pref.checked}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationPreferences;
