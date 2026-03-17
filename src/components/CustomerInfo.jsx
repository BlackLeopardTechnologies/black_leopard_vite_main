import React from "react";

const CustomerInfo = ({ isActive, onClose, onSubmit }) => {
  return (
    <div className={`customer-info-container ${isActive ? "active" : ""}`}>
      <div id="close-customer-btn" className="fas fa-times" onClick={onClose}></div>

      <form onSubmit={onSubmit}>
        <h3>Millicent Info to Bookly</h3>
        <span>First Name</span>
        <input
          type="text"
          className="box"
          placeholder="enter your first name"
          name="firstname"
        />
        <span>Last Name</span>
        <input
          type="text"
          className="box"
          placeholder="enter your last name"
          name="lastname"
        />
        <span>Address</span>
        <input
          type="text"
          className="box"
          placeholder="enter your address"
          name="address"
        />
        <span>Phone Number</span>
        <input
          type="text"
          className="box"
          placeholder="enter your phone number"
          name="phone"
        />

        <input type="submit" value="Submit" className="btn" id="submitbtn" />
      </form>
    </div>
  );
};

export default CustomerInfo;
