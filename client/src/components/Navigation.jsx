import React from "react";

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "scheduling", label: "Therapy Scheduling" },
    { id: "notifications", label: "Notifications & Care" },
    { id: "progress", label: "Progress Tracking" },
  ];

  return (
    <nav className="flex space-x-8 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`pb-2 px-1 border-b-2 font-medium text-sm ${
            activeTab === tab.id
              ? "border-green-500 text-green-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
