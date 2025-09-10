import React from "react";
import { Plus, Clock, Edit3, Droplets } from "lucide-react";
import Calendar from "./scheduling/Calendar";
import UpcomingSessions from "./scheduling/UpcomingSessions";

const TherapyScheduling = ({ userRole, therapySessions }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Therapy Sessions</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          {userRole === "patient" ? "Request Session" : "Schedule Session"}
        </button>
      </div>

      <Calendar />
      <UpcomingSessions therapySessions={therapySessions} />
    </div>
  );
};

export default TherapyScheduling;
