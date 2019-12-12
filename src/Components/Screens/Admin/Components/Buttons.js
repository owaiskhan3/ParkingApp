import React, { Component } from "react";

class Buttons extends Component {
  state = {};
  render() {
    return (
      <button
        className="btn waves-effect waves-light"
        type="submit"
        name="action"
        style={{
          width: "160px",
          height: "50px",
          margin: "5px 5px",
          fontSize: "16px"
        }}
        onClick={() => this.props.func()}
      >
        {this.props.title}
      </button>
    );
  }
}

export default Buttons;
