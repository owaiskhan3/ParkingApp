import React, { Component } from "react";

class Navbar extends Component {
  state = {};
  render() {
    let color1 = `#b6cae9`;
    let color2 = `#c5b2d8`;
    return (
      <nav style={{ backgroundImage: `linear-gradient(${color1}, ${color2})` }}>
        <div
          className="nav-wrapper"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <a href="/" className="brand-logo">
            Parking App
          </a>
        </div>
      </nav>
    );
  }
}

export default Navbar;
