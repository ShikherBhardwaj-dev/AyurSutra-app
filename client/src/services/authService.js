// Enhanced Auth Service
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

class AuthService {
  constructor() {
    this.token = null;
    this.user = null;
  }

  // Get stored token
  getToken() {
    if (this.token) return this.token;

    try {
      return localStorage.getItem("ayursutra_token");
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return null;
    }
  }

  // Get stored user
  getStoredUser() {
    if (this.user) return this.user;

    try {
      const storedUser = localStorage.getItem("ayursutra_user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error accessing stored user:", error);
      return null;
    }
  }

  // Store auth data
  storeAuthData(token, user) {
    try {
      this.token = token;
      this.user = user;
      localStorage.setItem("ayursutra_token", token);
      localStorage.setItem("ayursutra_user", JSON.stringify(user));
    } catch (error) {
      console.error("Error storing auth data:", error);
    }
  }

  // Clear auth data
  clearAuthData() {
    try {
      this.token = null;
      this.user = null;
      localStorage.removeItem("ayursutra_token");
      localStorage.removeItem("ayursutra_user");
    } catch (error) {
      console.error("Error clearing auth data:", error);
    }
  }

  // Check if token is valid (basic check)
  isTokenValid() {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Basic JWT structure validation
      const parts = token.split(".");
      if (parts.length !== 3) return false;

      // Decode payload to check expiry
      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      return payload.exp > currentTime;
    } catch (error) {
      console.error("Token validation error:", error);
      return false;
    }
  }

  // Get auth headers
  getAuthHeaders() {
    const token = this.getToken();
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // API request helper with error handling
  async apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 401) {
          this.clearAuthData();
          throw new Error(data.message || "Authentication failed");
        }

        if (response.status === 403) {
          throw new Error(data.message || "Access forbidden");
        }

        if (response.status === 404) {
          throw new Error(data.message || "Resource not found");
        }

        if (response.status >= 500) {
          throw new Error("Server error. Please try again later.");
        }

        throw new Error(data.message || `HTTP Error: ${response.status}`);
      }

      return data;
    } catch (error) {
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        throw new Error(
          "Unable to connect to server. Please check your internet connection."
        );
      }
      throw error;
    }
  }

  // User registration
  async signup(userData) {
    try {
      const response = await this.apiRequest("/auth/signup", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      if (response.token && response.user) {
        this.storeAuthData(response.token, response.user);
      }

      return response;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  }

  // User login
  async login(credentials) {
    try {
      const response = await this.apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      if (response.token && response.user) {
        this.storeAuthData(response.token, response.user);
      }

      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  // Get current user from server
  async getCurrentUser() {
    try {
      const response = await this.apiRequest("/auth/me");

      if (response.user) {
        this.user = response.user;
        try {
          localStorage.setItem("ayursutra_user", JSON.stringify(response.user));
        } catch (error) {
          console.error("Error storing updated user data:", error);
        }
      }

      return response.user;
    } catch (error) {
      console.error("Get current user error:", error);
      throw error;
    }
  }

  // Get dashboard data
  async getDashboardData() {
    try {
      return await this.apiRequest("/dashboard");
    } catch (error) {
      console.error("Dashboard data fetch error:", error);
      throw error;
    }
  }

  // Get notifications
  async getNotifications() {
    try {
      const response = await this.apiRequest("/notifications");
      return response.notifications || [];
    } catch (error) {
      console.error("Notifications fetch error:", error);
      throw error;
    }
  }

  // Mark notification as read
  async markNotificationRead(notificationId) {
    try {
      return await this.apiRequest(`/notifications/${notificationId}/read`, {
        method: "PUT",
      });
    } catch (error) {
      console.error("Mark notification read error:", error);
      throw error;
    }
  }

  // Get user sessions
  async getSessions() {
    try {
      const response = await this.apiRequest("/sessions");
      return response.sessions || [];
    } catch (error) {
      console.error("Sessions fetch error:", error);
      throw error;
    }
  }

  // Create new session
  async createSession(sessionData) {
    try {
      return await this.apiRequest("/sessions", {
        method: "POST",
        body: JSON.stringify(sessionData),
      });
    } catch (error) {
      console.error("Create session error:", error);
      throw error;
    }
  }

  // Update session feedback
  async updateSessionFeedback(sessionId, feedbackData) {
    try {
      return await this.apiRequest(`/sessions/${sessionId}/feedback`, {
        method: "PUT",
        body: JSON.stringify(feedbackData),
      });
    } catch (error) {
      console.error("Update session feedback error:", error);
      throw error;
    }
  }

  // Get user progress
  async getProgress() {
    try {
      const response = await this.apiRequest("/progress");
      return response.progress || {};
    } catch (error) {
      console.error("Progress fetch error:", error);
      throw error;
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await this.apiRequest("/auth/profile", {
        method: "PUT",
        body: JSON.stringify(profileData),
      });

      // Update stored user data
      if (response.user) {
        this.user = response.user;
        try {
          localStorage.setItem("ayursutra_user", JSON.stringify(response.user));
        } catch (error) {
          console.error("Error storing updated user data:", error);
        }
      }

      return response;
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    }
  }

  // Change password
  async changePassword(passwordData) {
    try {
      return await this.apiRequest("/auth/change-password", {
        method: "PUT",
        body: JSON.stringify(passwordData),
      });
    } catch (error) {
      console.error("Change password error:", error);
      throw error;
    }
  }

  // Logout
  async logout() {
    try {
      // Call logout endpoint
      await this.apiRequest("/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      // Log error but don't throw - we still want to clear local data
      console.error("Logout API error:", error);
    } finally {
      // Always clear local auth data
      this.clearAuthData();
    }
  }

  // Check authentication status
  isAuthenticated() {
    const token = this.getToken();
    const user = this.getStoredUser();
    return !!(token && user && this.isTokenValid());
  }

  // Get user role
  getUserRole() {
    const user = this.getStoredUser();
    return user?.userType || "patient";
  }

  // Get user info
  getUserInfo() {
    return this.getStoredUser();
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;
