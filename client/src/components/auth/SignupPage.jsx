import React, { useState } from "react";
import {
  Leaf,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowLeft,
  Loader,
} from "lucide-react";
import authService from "../../services/authService";

const SignupPage = ({ onSwitchToLogin, onAuthSuccess, onBackToLanding }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    userType: "patient",
    agreeToTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const validateForm = () => {
    const { fullName, email, phone, password, confirmPassword, agreeToTerms } =
      formData;

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all required fields");
      return false;
    }

    if (fullName.trim().length < 2) {
      setError("Full name must be at least 2 characters long");
      return false;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }

    if (phone.trim().length < 10) {
      setError("Please enter a valid phone number (at least 10 digits)");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return false;
    }

    if (!agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const signupData = {
        fullName: formData.fullName.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        userType: formData.userType,
      };

      const response = await authService.signup(signupData);

      console.log("Signup successful:", response.user);

      // Call the authentication success handler to log the user in
      if (onAuthSuccess) {
        onAuthSuccess(response.user);
      } else {
        console.error("onAuthSuccess function not provided to SignupPage");
        setError("Authentication handler not found. Please refresh the page.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSignup(e);
    }
  };

  const handleSocialSignup = (provider) => {
    // Placeholder for social signup implementation
    setError(
      `${provider} signup is not yet implemented. Please use email/password registration.`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      {/* Back to Landing Button */}
      {onBackToLanding && (
        <button
          onClick={onBackToLanding}
          className="fixed top-6 left-6 flex items-center text-gray-600 hover:text-green-600 font-medium transition-colors z-50"
          disabled={loading}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </button>
      )}

      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white p-3 rounded-full shadow-lg">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Join AyurSutra
          </h1>
          <p className="text-gray-600">
            Begin your journey to holistic wellness
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSignup} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* User Type Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                    formData.userType === "patient"
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-300 hover:border-gray-400"
                  } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <input
                    type="radio"
                    name="userType"
                    value="patient"
                    checked={formData.userType === "patient"}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="sr-only"
                  />
                  <User className="h-5 w-5 mr-2" />
                  Patient
                </label>
                <label
                  className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                    formData.userType === "practitioner"
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-300 hover:border-gray-400"
                  } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <input
                    type="radio"
                    name="userType"
                    value="practitioner"
                    checked={formData.userType === "practitioner"}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="sr-only"
                  />
                  <Leaf className="h-5 w-5 mr-2" />
                  Practitioner
                </label>
              </div>
            </div>

            {/* Full Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Enter your full name"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Enter your phone number"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Create a password"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Confirm your password"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500 disabled:cursor-not-allowed"
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <button
                  type="button"
                  onClick={() =>
                    setError("Terms of Service page will be available soon.")
                  }
                  className="text-green-600 hover:underline disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  onClick={() =>
                    setError("Privacy Policy page will be available soon.")
                  }
                  className="text-green-600 hover:underline disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  Privacy Policy
                </button>
              </span>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or sign up with
                </span>
              </div>
            </div>

            {/* Social Signup Options */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialSignup("Google")}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
              >
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialSignup("Facebook")}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
              >
                <div className="w-5 h-5 mr-2 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  f
                </div>
                Facebook
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <span className="text-gray-600">Already have an account? </span>
            <button
              onClick={onSwitchToLogin}
              className="text-green-600 hover:text-green-700 font-medium disabled:cursor-not-allowed"
              disabled={loading}
            >
              Sign in here
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          By creating an account, you're joining thousands on their wellness
          journey
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
