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
    page: "ViewParking"
  };

  changeState = page => {
    this.setState({ page: page });
  };

  logOutFunc = async () => {
    try {
      console.log("logout running");
      await firebase.logOut().then(() => {
        // localStorage.path = "/";
        localStorage.clear();
        Swal.fire("Success", "Successfully LoggedOut", "success");
        this.props.history.push("/");
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div>
        <Navbar changeState={this.changeState} logOut={this.logOutFunc} />
        <div>User Screen</div>
        {this.state.page == "ViewParking" ? <ViewParking /> : null}
        {this.state.page == "BookParking" ? <BookParking /> : null}
        {this.state.page == "ViewBooking" ? <ViewBooking /> : null}
        {this.state.page == "Feedback" ? <Feedback /> : null}
      </div>
    );
  }
}

export default User;
