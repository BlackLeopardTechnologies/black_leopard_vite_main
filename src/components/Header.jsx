import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import CustomerInfo from "./CustomerInfo";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
   { label: "Projects", href: "#projects" },
];

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showCustomerInfo, setShowCustomerInfo] = useState(false);
  const [formData, setFormData] = useState({});
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showStickyNav, setShowStickyNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Show sticky nav after scrolling 150px
      setShowStickyNav(scrollPosition > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileNavigation = () => {
    setMobileNavOpen(false);
  };

  const handleUserIconClick = () => {
    closeMobileNavigation();
    setShowSignIn(true);
    setShowSignUp(false);
    setShowCustomerInfo(false);
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowSignIn(false);
    setShowCustomerInfo(false);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const password_confirmation = e.target.password_confirmation.value;

    if (password !== password_confirmation) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    setFormData({ email, password, password_confirmation });
    setShowSignUp(false);
    setShowCustomerInfo(true);
  };

  const handleCustomerInfoSubmit = async (e) => {
    e.preventDefault();
    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;
    const address = e.target.address.value;
    const phone = e.target.phone.value;

    const finalData = {
      ...formData,
      firstname,
      lastname,
      address,
      phone,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/register", finalData);
      if (response.status === 201) {
        alert("Registration successful!");
        closeForms();
        setShowSignIn(true);
      } else {
        alert(`An error occurred. Status: ${response.status}`);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post("http://localhost:8000/api/login", { email, password });
      if (response.status === 200) {
        alert("Sign-in successful!");
        closeForms();
        window.location.reload();
      } else {
        alert(`Invalid Credentials. Status: ${response.status}`);
      }
    } catch (error) {
      alert("Invalid Credentials. Please try again.");
    }
  };

  const closeForms = () => {
    setShowSignIn(false);
    setShowSignUp(false);
    setShowCustomerInfo(false);
  };

  return (
    <div>
      <header className="header ad-header">
        <div className="ad-header__topbar">
          <div className="ad-header__topbar-inner">
            <div className="ad-topbar__location">
              <FontAwesomeIcon icon={faLocationDot} aria-hidden="true" />
              <span> Koforidua Adweso Mile 50, Eastern Region, Ghana</span>
            </div>

            <div className="ad-topbar__contact">
              <FontAwesomeIcon icon={faPhone} aria-hidden="true" />
              <span> +233 509 957 073</span>
            </div>
          </div>
        </div>

        <div className="ad-header__main">
          <Link to="/" className="ad-brand" onClick={closeMobileNavigation}>
            <img src="/images/black_leopard.PNG" alt="Black Leopard logo" className="ad-brand__logo" />
            <span className="ad-brand__copy">
              <span className="ad-brand__title">Black Leopard</span>
              <span className="ad-brand__subtitle">Technologies</span>
            </span>
          </Link>

          <nav className={`ad-nav ${mobileNavOpen ? "is-open" : ""}`} aria-label="Primary navigation">
            <div className="ad-nav__menu">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="ad-nav__link"
                  onClick={closeMobileNavigation}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* <div className="ad-nav__mobile-actions">
              <button type="button" className="ad-portal-link" onClick={handleUserIconClick}>
                Customer Portal
                <FontAwesomeIcon icon={faCircleUser} aria-hidden="true" />
              </button>
            </div> */}
          </nav>

          {/* <div className="ad-header__actions">
            <button type="button" className="ad-portal-link" onClick={handleUserIconClick}>
              Customer Portal
              <FontAwesomeIcon icon={faCircleUser} aria-hidden="true" />
            </button>
          </div> */}

          <button
            type="button"
            className={`ad-menu-toggle ${mobileNavOpen ? "is-open" : ""}`}
            onClick={() => setMobileNavOpen((currentValue) => !currentValue)}
            aria-label="Toggle navigation"
            aria-expanded={mobileNavOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Sticky Navigation Overlay */}
      <nav className={`sticky-nav-overlay ${showStickyNav ? "is-visible" : ""}`} aria-label="Sticky navigation">
        <div className="sticky-nav-main">
          <Link to="/" className="sticky-brand" onClick={closeMobileNavigation}>
            <img src="/images/black_leopard.PNG" alt="Black Leopard logo" className="sticky-brand__logo" />
            <span className="sticky-brand__copy">
              <span className="sticky-brand__title">Black Leopard</span>
              <span className="sticky-brand__subtitle">Technologies</span>
            </span>
          </Link>

          <nav className={`sticky-nav ${mobileNavOpen ? "is-open" : ""}`} aria-label="Sticky Primary navigation">
            <div className="sticky-nav__menu">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="sticky-nav__link"
                  onClick={closeMobileNavigation}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* <div className="sticky-nav__mobile-actions">
              <button type="button" className="ad-portal-link" onClick={handleUserIconClick}>
                Customer Portal
                <FontAwesomeIcon icon={faCircleUser} aria-hidden="true" />
              </button>
            </div> */}
          </nav>

          {/* <div className="sticky-nav__actions">
            <button type="button" className="ad-portal-link" onClick={handleUserIconClick}>
              Customer Portal
              <FontAwesomeIcon icon={faCircleUser} aria-hidden="true" />
            </button>
          </div> */}

          <button
            type="button"
            className={`ad-menu-toggle ${mobileNavOpen ? "is-open" : ""}`}
            onClick={() => setMobileNavOpen((currentValue) => !currentValue)}
            aria-label="Toggle navigation"
            aria-expanded={mobileNavOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <SignIn
        isActive={showSignIn}
        onClose={closeForms}
        onSignUpClick={handleSignUpClick}
        onSignInSubmit={handleSignInSubmit}
      />

      <SignUp
        isActive={showSignUp}
        onClose={closeForms}
        onSignUpSubmit={handleSignUpSubmit}
      />

      <CustomerInfo
        isActive={showCustomerInfo}
        onClose={closeForms}
        onSubmit={handleCustomerInfoSubmit}
      />
    </div>
  );
};

export default Header;
