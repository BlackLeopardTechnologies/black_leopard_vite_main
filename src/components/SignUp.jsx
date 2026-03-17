import React, { useState } from "react";

const SignUp = ({ isActive, onClose, onSignInClick, onSignUpSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  return (
    <div className={`login-form-container ${isActive ? "active" : ""}`}>
      <div className="login-modal">
        <div id="close-login-btn" className="fas fa-times" onClick={onClose}></div>
        <img src="/images/black_leopard.PNG" alt="Black Leopard" className="login-logo" />
        <h2 className="login-title">Customer Portal</h2>
        <p className="login-subtext">Create your account</p>

        <form onSubmit={onSignUpSubmit} className="login-form">
          {currentStep === 1 && (
            <>
              <div className="input-group">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  className="box"
                  placeholder="First Name"
                  name="firstname"
                />
              </div>
              <div className="input-group">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  className="box"
                  placeholder="Last Name"
                  name="lastname"
                />
              </div>
              <div className="input-group">
                <i className="fas fa-phone"></i>
                <input
                  type="tel"
                  className="box"
                  placeholder="Contact Number"
                  name="contact"
                />
              </div>
              <div className="input-group">
                <i className="fas fa-map-marker-alt"></i>
                <input
                  type="text"
                  className="box"
                  placeholder="Address"
                  name="address"
                />
              </div>
              <input type="button" value="Next" className="btn" onClick={handleNext} />
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="input-group">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  className="box"
                  placeholder="Email"
                  name="email"
                />
              </div>
              <div className="input-group">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  className="box"
                  placeholder="Password"
                  name="password"
                />
              </div>
              <div className="input-group">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  className="box"
                  placeholder="Confirm Password"
                  name="password_confirmation"
                />
              </div>
              <div className="login-options">
                <div className="checkbox">
                  <input type="checkbox" id="remember-me" />
                  <label htmlFor="remember-me">Remember me</label>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
                <input type="button" value="Back" className="btn" onClick={handleBack} style={{ flex: 1 }} />
                <input type="submit" value="Sign up" className="btn" id="signupbtn" style={{ flex: 1 }} />
              </div>
            </>
          )}

          <p className="help-text">
            Already have an account? <a href="#" id="signin" onClick={onSignInClick}>Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
