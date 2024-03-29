import React, { Component } from "react";

import Buttons from "../../Admin/Components/Buttons";

class UserNavbar extends Component {
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
          {/* <Buttons
            title="View Parking"
            func={() => this.props.changeState("ViewParking")}
          /> */}
          <Buttons
            title="Book Parking"
            func={() => this.props.changeState("BookParking")}
          />
          <Buttons
            title="View Booking"
            func={() => this.props.changeState("ViewBooking")}
          />
          <Buttons
            title="Feedback"
            func={() => this.props.changeState("Feedback")}
          />
          <Buttons title="LogOut" func={() => this.props.logOut()} />
        </div>
      </nav>
    );
  }
}

export default UserNavbar;
