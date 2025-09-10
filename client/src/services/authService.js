// Authentication service for API calls
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

class AuthService {
  constructor() {
    this.token = localStorage.getItem("authToken");
    this.user = this.getStoredUser();
  }

  // Get stored user from localStorage
  getStoredUser() {
    try {
      const userData = localStorage.getItem("userData");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      localStorage.removeItem("userData");
      return null;
    }
  }

  // Store user data and token
  storeAuthData(user, token) {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  // Clear stored auth data
  clearAuthData() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    this.token = null;
    this.user = null;
  }

  // Get auth headers for API requests
  getAuthHeaders() {
    const headers = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Make authenticated API request
  async makeRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Handle authentication errors
        if (response.status === 401 || response.status === 403) {
          this.clearAuthData();
          throw new Error("Authentication failed. Please login again.");
        }
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // User registration
  async signup(userData) {
    try {
      const response = await this.makeRequest("/auth/signup", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      if (response.user && response.token) {
        this.storeAuthData(response.user, response.token);
      }

      return response;
    } catch (error) {
      console.error("Signup failed:", error);
      throw new Error(
        error.message || "Registration failed. Please try again."
      );
    }
  }

  // User login
  async login(credentials) {
    try {
      const response = await this.makeRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      if (response.user && response.token) {
        this.storeAuthData(response.user, response.token);
      }

      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error(
        error.message || "Login failed. Please check your credentials."
      );
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      if (!this.token) {
        throw new Error("No authentication token found");
      }

      const response = await this.makeRequest("/auth/me");

      if (response.user) {
        this.storeAuthData(response.user, this.token);
        return response.user;
      }

      return null;
    } catch (error) {
      console.error("Get current user failed:", error);
      this.clearAuthData();
      throw error;
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await this.makeRequest("/auth/profile", {
        method: "PUT",
        body: JSON.stringify(profileData),
      });

      if (response.user) {
        this.storeAuthData(response.user, this.token);
      }

      return response;
    } catch (error) {
      console.error("Profile update failed:", error);
      throw new Error(
        error.message || "Profile update failed. Please try again."
      );
    }
  }

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await this.makeRequest("/auth/change-password", {
        method: "PUT",
        body: JSON.stringify(passwordData),
      });

      return response;
    } catch (error) {
      console.error("Password change failed:", error);
      throw new Error(
        error.message || "Password change failed. Please try again."
      );
    }
  }

  // Logout
  async logout() {
    try {
      // Call server logout endpoint
      if (this.token) {
        await this.makeRequest("/auth/logout", {
          method: "POST",
        });
      }
    } catch (error) {
      console.error("Server logout failed:", error);
      // Continue with local logout even if server call fails
    } finally {
      // Clear local storage regardless
      this.clearAuthData();
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token && !!this.user;
  }

  // Get current user
  getUser() {
    return this.user;
  }

  // Get token
  getToken() {
    return this.token;
  }

  // Validate token expiration (basic check)
  isTokenValid() {
    if (!this.token) return false;

    try {
      const payload = JSON.parse(atob(this.token.split(".")[1]));
      const currentTime = Date.now() / 1000;

      if (payload.exp && payload.exp < currentTime) {
        this.clearAuthData();
        return false;
      }

      return true;
    } catch (error) {
      console.error("Token validation error:", error);
      this.clearAuthData();
      return false;
    }
  }

  // Initialize auth state on app load
  async initializeAuth() {
    if (this.token && this.user) {
      try {
        // Validate token and refresh user data
        if (this.isTokenValid()) {
          await this.getCurrentUser();
          return this.user;
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        this.clearAuthData();
      }
    }
    return null;
  }
}

// Create singleton instance
const authService = new AuthService();

export default authService;
