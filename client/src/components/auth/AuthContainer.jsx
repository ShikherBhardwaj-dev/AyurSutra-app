import React, { useState } from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

const AuthContainer = ({ onAuthSuccess, onBackToLanding }) => {
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
          onBackToLanding={onBackToLanding}
        />
      ) : (
        <SignupPage
          onSwitchToLogin={handleSwitchToLogin}
          onAuthSuccess={onAuthSuccess}
          onBackToLanding={onBackToLanding}
        />
      )}
    </div>
  );
};

export default AuthContainer;
