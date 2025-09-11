import { useState, useEffect } from "react";
import authService from "../services/authService";

export const useAppData = () => {
  const [notifications, setNotifications] = useState([]);
  const [therapySessions, setTherapySessions] = useState([]);
  const [patientProgress, setPatientProgress] = useState({
    overallProgress: 0,
    completedSessions: 0,
    totalSessions: 21,
    nextMilestone: "Begin your wellness journey",
  });
  const [feedbackData, setFeedbackData] = useState([]);
  const [wellnessMetrics, setWellnessMetrics] = useState({
    sleepQuality: 0,
    energyLevel: 0,
    overallWellness: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all user data
  const fetchUserData = async () => {
    if (!authService.isAuthenticated()) {
      console.log("User not authenticated, skipping data fetch");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch dashboard data (includes progress, notifications, sessions, wellness)
      const dashboardData = await authService.getDashboardData();

      // Update state with fetched data
      if (dashboardData.progress) {
        setPatientProgress(dashboardData.progress);
      }

      if (dashboardData.notifications) {
        // Format notifications to match expected structure
        const formattedNotifications = dashboardData.notifications.map(
          (notification) => ({
            id: notification._id,
            title: notification.title,
            message: notification.message,
            time: formatNotificationTime(notification.createdAt),
            type: notification.type,
            read: notification.read,
          })
        );
        setNotifications(formattedNotifications);
      }

      if (dashboardData.upcomingSessions) {
        // Format sessions to match expected structure
        const formattedSessions = dashboardData.upcomingSessions.map(
          (session) => ({
            id: session._id,
            name: session.name,
            type: session.type,
            date: formatSessionDate(session.date),
            time: session.time,
            status: session.status,
            progress: session.progress || 0,
          })
        );
        setTherapySessions(formattedSessions);
      }

      if (dashboardData.wellnessMetrics) {
        setWellnessMetrics(dashboardData.wellnessMetrics);
      }

      // Fetch additional session data for progress tracking
      const allSessions = await authService.getSessions();
      const completedSessions = allSessions.filter(
        (session) => session.status === "completed"
      );

      // Extract feedback data from completed sessions
      const feedbackHistory = completedSessions
        .filter((session) => session.feedback)
        .map((session) => ({
          session: session.name,
          date: formatSessionDate(session.date),
          wellness: session.feedback.wellness || 0,
          energy: session.feedback.energy || 0,
          sleep: session.feedback.sleep || 0,
          comments: session.feedback.comments || "",
        }));

      setFeedbackData(feedbackHistory);

      // Update therapy sessions with all sessions
      const allFormattedSessions = allSessions.map((session) => ({
        id: session._id,
        name: session.name,
        type: session.type,
        date: formatSessionDate(session.date),
        time: session.time,
        status: session.status,
        progress: session.progress || 0,
      }));
      setTherapySessions(allFormattedSessions);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(err.message || "Failed to fetch user data");

      // Set default data if fetch fails
      setPatientProgress({
        overallProgress: 0,
        completedSessions: 0,
        totalSessions: 21,
        nextMilestone: "Begin your wellness journey",
      });
      setNotifications([]);
      setTherapySessions([]);
      setFeedbackData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch notifications separately
  const fetchNotifications = async () => {
    try {
      const notifications = await authService.getNotifications();
      const formattedNotifications = notifications.map((notification) => ({
        id: notification._id,
        title: notification.title,
        message: notification.message,
        time: formatNotificationTime(notification.createdAt),
        type: notification.type,
        read: notification.read,
      }));
      setNotifications(formattedNotifications);
      return formattedNotifications;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }
  };

  // Fetch sessions separately
  const fetchSessions = async () => {
    try {
      const sessions = await authService.getSessions();
      const formattedSessions = sessions.map((session) => ({
        id: session._id,
        name: session.name,
        type: session.type,
        date: formatSessionDate(session.date),
        time: session.time,
        status: session.status,
        progress: session.progress || 0,
      }));
      setTherapySessions(formattedSessions);
      return formattedSessions;
    } catch (error) {
      console.error("Error fetching sessions:", error);
      return [];
    }
  };

  // Create a new session
  const createSession = async (sessionData) => {
    try {
      await authService.createSession(sessionData);
      // Refresh sessions after creating
      await fetchSessions();
      await fetchUserData(); // Refresh all data
    } catch (error) {
      console.error("Error creating session:", error);
      throw error;
    }
  };

  // Submit session feedback
  const submitFeedback = async (sessionId, feedbackData) => {
    try {
      await authService.updateSessionFeedback(sessionId, feedbackData);
      // Refresh data after feedback submission
      await fetchUserData();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      throw error;
    }
  };

  // Mark notification as read
  const markNotificationRead = async (notificationId) => {
    try {
      await authService.markNotificationRead(notificationId);
      // Update local state
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Utility function to format notification time
  const formatNotificationTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else if (diffInHours < 168) {
      // 7 days
      const days = Math.floor(diffInHours / 24);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Utility function to format session date
  const formatSessionDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Load data when hook is first used
  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    // Data
    notifications,
    therapySessions,
    patientProgress,
    feedbackData,
    wellnessMetrics,
    loading,
    error,

    // Setters for backward compatibility
    setNotifications,
    setTherapySessions,
    setPatientProgress,
    setFeedbackData,
    setWellnessMetrics,

    // Functions
    fetchUserData,
    fetchNotifications,
    fetchSessions,
    createSession,
    submitFeedback,
    markNotificationRead,

    // Utility functions
    refreshData: fetchUserData,
  };
};
