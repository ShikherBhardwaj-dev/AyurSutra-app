import React from "react";
import { Leaf, Loader } from "lucide-react";

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <Leaf className="h-12 w-12 text-green-600 animate-pulse" />
            </div>
            {/* Rotating ring */}
            <div className="absolute inset-0 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          AyurSutra
        </h1>

        {/* Loading Message */}
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <Loader className="h-4 w-4 animate-spin" />
          <span className="text-sm">{message}</span>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
