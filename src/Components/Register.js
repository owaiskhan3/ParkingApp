import React, { Component } from "react";
import Navbar from "./Navbar";
import { Link as RouterLink, Redirect } from "react-router-dom";
import Swal from "sweetalert2";

import Input from "./InputComponent";
import firebase from "../config/firebase";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loc: "/register"
    };
  }
  toggleChange = () => {
    this.setState({
      isAdmin: !this.state.isAdmin
    });
  };

  setKeys = (key, value) => {
    console.log(key);
    this.setState({ [key]: value });
  };

  signUp = async () => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPass,
      isAdmin
    } = this.state;
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmPass == ""
    ) {
      // Swal.fire("Oops...", "please fill the empty fields", "error");
    } else {
      try {
        if (password === confirmPass) {
          await firebase.signUpWithFirebase(
            email,
            password,
            firstName,
            lastName,
            isAdmin
          );
          console.log("success");
          Swal.fire("Success", "Succesfully Registered", "success");
          this.setState({ loc: "/" });
        } else {
          Swal.fire(
            "Oops... Please check your password",
            "Password should be Same",
            "error"
          );
        }
      } catch (e) {
        console.log(e);
        Swal.fire("Error..", e.message, "error");
      }
      this.setState({ signup: false });
    }
  };

  renderRegister = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <Navbar />
        <h2 className="adminHeading">SignUP</h2>
        <div id="line"></div>

        <Input
          type="text"
          id="first_name"
          keys="firstName"
          label="First Name"
          setKeys={this.setKeys}
        />

        <Input
          type="text"
          id="last_name"
          keys="lastName"
          label="Last Name"
          setKeys={this.setKeys}
        />

        <Input
          type="email"
          id="email"
          keys="email"
          label="Email"
          setKeys={this.setKeys}
        />

        <Input
          type="password"
          id="password"
          keys="password"
          label="Password"
          setKeys={this.setKeys}
        />
        <Input
          type="password"
          id="confirm_password"
          keys="confirmPass"
          label="Confirm Password"
          setKeys={this.setKeys}
        />

        <div className="form-group">
          <p>
            <label>
              <input
                type="checkbox"
                checked={this.state.isAdmin}
                onChange={this.toggleChange}
              />
              <span>Admin</span>
            </label>
          </p>
          <input
            type="checkbox"
            className="form-control checkbox"
            onChange={e => {
              this.setState({ isAdmin: this.checked });
            }}
          />
        </div>
        <div className="loginBtn">
          <button type="submit" className="btn" onClick={() => this.signUp()}>
            Signup
          </button>
          <br /> <RouterLink to="/">Go to Login</RouterLink>
        </div>
        <Redirect to={this.state.loc} />
      </div>
    );
  };

  render() {
    if (localStorage.isAuthenticated) {
      return <Redirect to="/home" />;
    }
    return (
      <div>
        {this.renderRegister()}
        <Redirect to={this.state.loc} />
      </div>
    );
  }
}

export default Register;
