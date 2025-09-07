import React, { useState } from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

const AuthContainer = ({ onAuthSuccess }) => {
  const [currentPage, setCurrentPage] = useState("login"); // 'login' or 'signup'

  const handleSwitchToSignup = () => {
    setCurrentPage("signup");
  };

  const handleSwitchToLogin = () => {
    setCurrentPage("login");
  };

  return (
    <div>
      {currentPage === "login" ? (
        <LoginPage
          onSwitchToSignup={handleSwitchToSignup}
          onAuthSuccess={onAuthSuccess}
        />
      ) : (
        <SignupPage
          onSwitchToLogin={handleSwitchToLogin}
          onAuthSuccess={onAuthSuccess}
        />
      )}
    </div>
  );
};

export default AuthContainer;
