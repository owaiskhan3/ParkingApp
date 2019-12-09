import React, { Component } from "react";

class Buttons extends Component {
  state = {};
  render() {
    return (
      <button
        className="btn waves-effect waves-light"
        type="submit"
        name="action"
        style={{ width: "15%", height: "90%" }}
        onClick={() => this.props.func()}
      >
        {this.props.title}
      </button>
    );
  }
}

export default Buttons;
