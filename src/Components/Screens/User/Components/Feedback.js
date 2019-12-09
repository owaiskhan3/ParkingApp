import React, { Component } from "react";

class Feedback extends Component {
  state = {
    userFeedback: ""
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
              onClick={() => console.log(this.state.userFeedback)}
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
