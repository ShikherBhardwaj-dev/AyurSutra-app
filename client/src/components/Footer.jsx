import React from "react";
import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Leaf className="h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-600">
              AyurSutra - Authentic Panchakarma Management
            </span>
          </div>
          <div className="text-sm text-gray-500">
            © 2025 AyurSutra. Integrating traditional wisdom with modern
            technology.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
