import React from "react";

const Calendar = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const sessionDates = [6, 8, 10, 12];
  const today = 6;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">September 2025</h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm">
            Month
          </button>
          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
            Week
          </button>
          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
            List
          </button>
        </div>
      </div>

      {/* Mini Calendar */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {days.map((day) => (
          <div key={day} className="p-2 font-medium text-gray-500">
            {day}
          </div>
        ))}
        {Array.from({ length: 35 }, (_, i) => {
          const date = i - 5; // Start from 26th of previous month
          const isCurrentMonth = date > 0 && date <= 30;
          const hasSession = sessionDates.includes(date);
          const isToday = date === today;

          return (
            <div
              key={i}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                isCurrentMonth ? "text-gray-900" : "text-gray-300"
              } ${hasSession ? "bg-blue-100 rounded" : ""} ${
                isToday ? "bg-blue-600 text-white rounded" : ""
              }`}
            >
              {date > 0 ? date : 30 + date}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
