import React from "react";

const SignIn = ({ isActive, onClose, onSignUpClick, onSignInSubmit }) => {
  return (
    <div className={`login-form-container ${isActive ? "active" : ""}`}>
      <div className="login-modal">
        <div id="close-login-btn" className="fas fa-times" onClick={onClose}></div>
        <img src="/images/black_leopard.PNG" alt="Black Leopard" className="login-logo" />
        <h2 className="login-title">Customer Portal</h2>
        <p className="login-subtext">Sign in to access your account</p>

        <form onSubmit={onSignInSubmit} className="login-form"> 
          <div className="input-group">
            <i className="fas fa-user"></i>
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
            <div className="login-options">
              <div className="checkbox">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
              </div>

              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <input type="submit" value="Sign in" className="btn" id="loginbtn" />
              <p className="help-text">
            Don't have an account? <a href="#" id="signup" onClick={onSignUpClick}>Create one</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
