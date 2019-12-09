import React, { Component } from "react";
import Navbar from "../Navbar";
import firebase from "../../config/firebase";
import Swal from "sweetalert2";
import { Link as Routerlink, Redirect } from "react-router-dom";

import withPath from "../HOC/withPath";

import Admin from "../Screens/Admin";
import User from "../Screens/User";

// import { Link as RouterLink } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { loc: "/dashboard" };
  }

  componentDidMount = async () => {
    let userType = await firebase.getUserType();
    console.log(userType.data());
    this.setState({ userData: userType.data() });
  };

  logOutFunc = async () => {
    try {
      console.log("logout running");
      await firebase.logOut().then(() => {
        this.setState({ loc: "/" });
        localStorage.clear();
        this.props.history.push("/");
        Swal.fire("Success", "Successfully LoggedOut", "success");
      });
    } catch (e) {
      console.log(e);
    }
  };

  renderUser = userdata => {
    console.log(userdata);

    return userdata.types == "admin" ? <Admin /> : <User />;
  };

  renderInfo = userdata => {
    console.log(userdata.type);
    return (
      <div
        key={Math.random()}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div className="row">
          <div className="m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">
                  FirstName: {userdata.firstName}
                </span>
                <p>lastName: {userdata.lastName}</p>
                <p>User Email: {userdata.email}</p>
                <p>User Id: {userdata.uid}</p>
                <p>User Type: {userdata.types}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const userdata = this.state.userData;
    console.log(userdata);
    return (
      <div>
        <Navbar />

        {/* <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
          style={{ margin: "10px" }}
          onClick={() => this.logOutFunc()}
        >
          Logout
          <i className="material-icons right"></i>
        </button> */}

        {/* <h1>Dashboard</h1> */}

        {/* {userdata ? this.renderInfo(userdata) : <p>Loading...</p>} */}

        {userdata ? this.renderUser(userdata) : <p>Loading...</p>}
      </div>
    );
  }
}

export default withPath(Dashboard);
