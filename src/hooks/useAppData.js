import { useState } from "react";

export const useAppData = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "pre",
      title: "Abhyanga Session Tomorrow",
      message:
        "Please fast for 2 hours before your session. Wear comfortable clothing.",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "post",
      title: "Post-Therapy Care",
      message: "Avoid cold foods and drinks for the next 24 hours. Rest well.",
      time: "1 day ago",
    },
  ]);

  const [therapySessions] = useState([
    {
      id: 1,
      name: "Abhyanga",
      date: "2025-09-08",
      time: "10:00 AM",
      status: "scheduled",
      progress: 60,
    },
    {
      id: 2,
      name: "Shirodhara",
      date: "2025-09-10",
      time: "2:00 PM",
      status: "scheduled",
      progress: 40,
    },
    {
      id: 3,
      name: "Panchakarma Detox",
      date: "2025-09-06",
      time: "11:00 AM",
      status: "completed",
      progress: 100,
    },
    {
      id: 4,
      name: "Nasya",
      date: "2025-09-12",
      time: "9:00 AM",
      status: "scheduled",
      progress: 20,
    },
  ]);

  const [patientProgress] = useState({
    overallProgress: 65,
    completedSessions: 8,
    totalSessions: 12,
    nextMilestone: "Mid-therapy Assessment",
  });

  const [feedbackData] = useState([
    { session: "Session 1", wellness: 7, energy: 6, sleep: 8 },
    { session: "Session 2", wellness: 8, energy: 7, sleep: 8 },
    { session: "Session 3", wellness: 8, energy: 8, sleep: 9 },
    { session: "Session 4", wellness: 9, energy: 8, sleep: 9 },
  ]);

  return {
    notifications,
    setNotifications,
    therapySessions,
    patientProgress,
    feedbackData,
  };
};
