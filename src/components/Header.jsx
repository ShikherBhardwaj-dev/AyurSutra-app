import React, { useState } from "react";
import { Bell, User, Leaf, LogOut, Settings } from "lucide-react";

const Header = ({ userRole, notifications, user, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getUserDisplayName = () => {
    if (user?.fullName) {
      const names = user.fullName.split(" ");
      return names.length > 1 ? `${names[0]} ${names[1][0]}.` : names[0];
    }
    return userRole === "patient" ? "Priya S." : "Dr. Rajesh K.";
  };

  const getUserRole = () => {
    return user?.userType || userRole;
  };

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
            {/* User Role Badge (Read-only) */}
            <span className="text-sm text-gray-600 px-3 py-1 bg-blue-100 rounded-full capitalize">
              {getUserRole()}
            </span>

            {/* Notifications */}
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-800" />
              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <div
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <User className="h-8 w-8 text-gray-600 bg-gray-200 rounded-full p-1" />
                <span className="text-sm font-medium">
                  {getUserDisplayName()}
                </span>
              </div>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 text-sm text-gray-900 border-b border-gray-100">
                    <div className="font-medium">{getUserDisplayName()}</div>
                    <div className="text-gray-500">
                      {user?.email || "user@example.com"}
                    </div>
                    <div className="text-xs text-blue-600 capitalize mt-1">
                      {getUserRole()}
                    </div>
                  </div>

                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setShowUserMenu(false);
                      // Add settings functionality here
                    }}
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </button>

                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={() => {
                      setShowUserMenu(false);
                      onLogout();
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;
