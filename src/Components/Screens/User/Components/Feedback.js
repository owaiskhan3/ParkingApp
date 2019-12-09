import React, { Component } from "react";
import firebase from "../../../../config/firebase";
import Swal from "sweetalert2";
class Feedback extends Component {
  state = {
    userFeedback: ""
  };

  submitFeedback = async () => {
    const { userFeedback } = this.state;
    console.log(userFeedback);
    this.setState({ userFeedback: "" });

    if (userFeedback !== "") {
      let userId = await firebase.getUid();

      console.log(userId);
      await firebase.submitFeedback(userFeedback, userId);
    } else {
      Swal.fire("Invalid Input", "Please Enter Your Feedback", "error");
    }
  };

  render() {
    return (
      <div>
        <h1>Give Feedback</h1>
        <div
          style={{
            width: "600px",
            height: "100px",
            margin: "0 auto"
          }}
        >
          <textarea
            onChange={e => this.setState({ userFeedback: e.target.value })}
            value={this.state.userFeedback}
            style={{
              width: "100%",
              height: "100%"
            }}
          ></textarea>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "10px"
            }}
          >
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
              onClick={() => this.submitFeedback()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Feedback;
