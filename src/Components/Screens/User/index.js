import React, { Component } from "react";
import firebase from "../../../config/firebase";
import Swal from "sweetalert2";

import Navbar from "./Components/UserNavbar";
import BookParking from "./Components/BookParking";
import ViewBooking from "./Components/ViewBooking";
import ViewParking from "./Components/ViewParking";
import Feedback from "./Components/Feedback";

class User extends Component {
  state = {
    page: "BookParking"
  };

  changeState = page => {
    this.setState({ page: page });
  };

  render() {
    return (
      <div>
        <h2>User Screen</h2>
        <Navbar changeState={this.changeState} logOut={this.props.logout} />
        {/* {this.state.page == "ViewParking" ? <ViewParking /> : null} */}
        {this.state.page === "BookParking" ? <BookParking /> : null}
        {this.state.page === "ViewBooking" ? <ViewBooking /> : null}
        {this.state.page === "Feedback" ? <Feedback /> : null}
      </div>
    );
  }
}

export default User;
