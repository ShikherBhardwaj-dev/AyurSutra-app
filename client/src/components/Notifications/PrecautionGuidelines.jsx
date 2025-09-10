import React from "react";
import { Leaf } from "lucide-react";

const PrecautionGuidelines = () => {
  const preTherapyGuidelines = [
    "Fast 2-3 hours before therapy",
    "Wear comfortable, loose clothing",
    "Avoid heavy meals on therapy days",
    "Stay hydrated with warm water",
    "Get adequate sleep the night before",
  ];

  const postTherapyGuidelines = [
    "Rest for at least 30 minutes after therapy",
    "Avoid cold foods and beverages",
    "Take warm showers only",
    "Follow prescribed dietary restrictions",
    "Avoid strenuous activities",
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Leaf className="h-5 w-5 mr-2 text-green-600" />
        General Panchakarma Guidelines
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-green-700 mb-2">Pre-Therapy Care</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {preTherapyGuidelines.map((guideline, index) => (
              <li key={index}>• {guideline}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-blue-700 mb-2">Post-Therapy Care</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {postTherapyGuidelines.map((guideline, index) => (
              <li key={index}>• {guideline}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrecautionGuidelines;
