import React, { Component } from "react";
import firebase from "../../../../config/firebase";

class ViewParking extends Component {
  state = {};

  componentDidMount = async () => {
    var slots = await firebase.getSlots();

    this.setState({ slots });
  };

  render() {
    return <h1>View Parking</h1>;
  }
}

export default ViewParking;
