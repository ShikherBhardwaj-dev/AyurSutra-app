import React from "react";
import { Bell, User, Leaf } from "lucide-react";

const Header = ({ userRole, setUserRole, notifications }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900 ml-2">
                AyurSutra
              </span>
            </div>
            <span className="text-sm text-gray-500 px-3 py-1 bg-green-100 rounded-full">
              Panchakarma Management
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="text-sm border border-gray-300 rounded px-3 py-1"
            >
              <option value="patient">Patient View</option>
              <option value="practitioner">Practitioner View</option>
            </select>

            <div className="relative">
              <Bell className="h-6 w-6 text-gray-600" />
              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <User className="h-8 w-8 text-gray-600 bg-gray-200 rounded-full p-1" />
              <span className="text-sm font-medium">
                {userRole === "patient" ? "Priya S." : "Dr. Rajesh K."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
