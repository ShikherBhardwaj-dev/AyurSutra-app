import React from "react";
import { Plus, Calendar, Bell, Activity } from "lucide-react";

const FloatingActionButton = ({
  showQuickMenu,
  setShowQuickMenu,
  isMenuSticky,
  setIsMenuSticky,
}) => {
  const quickActions = [
    {
      icon: Calendar,
      label: "Schedule Session",
      onClick: () => setIsMenuSticky(false),
    },
    {
      icon: Bell,
      label: "Add Reminder",
      onClick: () => setIsMenuSticky(false),
    },
    {
      icon: Activity,
      label: "Log Feedback",
      onClick: () => setIsMenuSticky(false),
    },
  ];

  return (
    <div className="fixed bottom-6 right-6">
      <div
        className="relative"
        onMouseEnter={() => !isMenuSticky && setShowQuickMenu(true)}
        onMouseLeave={() => !isMenuSticky && setShowQuickMenu(false)}
      >
        {/* Floating Action Button */}
        <button
          onClick={() => {
            if (isMenuSticky) {
              setIsMenuSticky(false);
              setShowQuickMenu(false);
            } else {
              setIsMenuSticky(true);
              setShowQuickMenu(true);
            }
          }}
          className={`bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition-transform duration-200 ${
            showQuickMenu ? "rotate-45" : ""
          }`}
        >
          <Plus className="h-6 w-6" />
        </button>

        {/* Quick Action Menu */}
        {showQuickMenu && (
          <div className="absolute bottom-16 right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 w-48">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.onClick}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center"
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {action.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingActionButton;
