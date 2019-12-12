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

  render() {
    return (
      <div>
        <h2>Admin Screen</h2>
        <Navbar changeState={this.changeState} logOut={this.props.logout} />
        {this.state.page === "AddUser" ? <AddUser /> : null}
        {this.state.page === "ViewBookings" ? <ViewBookings /> : null}
        {this.state.page === "ViewStudents" ? <ViewStudents /> : null}
        {this.state.page === "ViewFeedback" ? <ViewFeedback /> : null}
      </div>
    );
  }
}

export default Admin;
