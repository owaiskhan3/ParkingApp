import React, { Component } from "react";

import Buttons from "./Buttons";

class AdminNavbar extends Component {
  state = {};

  style = {
    width: "100px",
    height: "40px",
    // backgroundColor: "transparent",
    border: "1px black"
    // color: "white"
  };
  render() {
    return (
      <nav
        style={{
          backgroundColor: "#f4f5f4",
          display: "flex",
          flexWrap: "wrap",
          height: "100%"
        }}
      >
        <div
          className="nav-wrapper"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexWrap: "wrap",
            flexFlow: "wrap",
            width: "100%"
          }}
        >
          <Buttons
            title="Add User"
            func={() => this.props.changeState("AddUser")}
          />
          <Buttons
            title="View Bookings"
            func={() => this.props.changeState("ViewBookings")}
          />
          <Buttons
            title="View Students"
            func={() => this.props.changeState("ViewStudents")}
          />
          <Buttons
            title="View Feedback"
            func={() => this.props.changeState("ViewFeedback")}
          />
          <Buttons title="LogOut" func={() => this.props.logOut()} />
        </div>
      </nav>
    );
  }
}

export default AdminNavbar;
