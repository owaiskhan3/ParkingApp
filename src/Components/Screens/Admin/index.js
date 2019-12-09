import React, { Component } from "react";
import firebase from "../../../config/firebase";
import Swal from "sweetalert2";

import Navbar from "./Components/AdminNavbar";
import AddUser from "./Components/AddUser";
import ViewBookings from "./Components/ViewBookings";
import ViewStudents from "./Components/ViewStudents";
import ViewFeedback from "./Components/ViewFeedback";

class Admin extends Component {
  state = {
    page: "AddUser"
  };

  changeState = page => {
    this.setState({ page });
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
        <h2>Admin Screen</h2>
        <Navbar changeState={this.changeState} logOut={this.logOutFunc} />
        {this.state.page == "AddUser" ? <AddUser /> : null}
        {this.state.page == "ViewBookings" ? <ViewBookings /> : null}
        {this.state.page == "ViewStudents" ? <ViewStudents /> : null}
        {this.state.page == "ViewFeedback" ? <ViewFeedback /> : null}
      </div>
    );
  }
}

export default Admin;
