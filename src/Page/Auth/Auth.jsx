import React, { useState } from "react";
import './Auth.css'
import Signin from "./Signin";
import Signup from "./Signup";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const togglePanel = () => {
    setIsRegister(!isRegister);
  };
  return (
    <div className="flex justify-center h-screen items-center overflow-hidden">
      <div className="box lg:max-w-4xl">
        <div className={`cover ${isRegister ? "rotate-active" : ""}`}>
          <div className="front">
            <img
              src="https://media.istockphoto.com/id/1371541328/vector/multi-factor-authentication-concept-mfa-cybersecurity-solutions-3d-illustration.jpg?s=612x612&w=0&k=20&c=S6xx9k0fH23mx5kpPn1WJ8jMGuhqNYblH9AaVLhRvUE="
              alt=""
            />
            <div className="text">
              <span className="text-1">
                Success is built upon well-organized tasks
              </span>
              <span className="text-2 text-xs">Let's get connected</span>
            </div>
          </div>
          <div className="back">
            <img
              src="https://cdn.pixabay.com/photo/2024/04/07/18/55/ai-generated-8682027_1280.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="forms h-full">
            <div className="form-content h-full">
                <div className="login-form">
                    <Signin togglePanel={togglePanel}/>
                </div>
                <div className="signup-form">
                    <Signup togglePanel={togglePanel}/>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
