import React, { Component } from "react";
import firebase from "../../../../config/firebase";

class AddUser extends Component {
  state = {
    gender: "male"
  };

  handleOptionChange = changeEvent => {
    this.setState({
      gender: changeEvent.target.value
    });
  };

  handleChange = e => {
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  submit = async () => {
    console.log("submit");
    console.log(this.state);
    let students = this.state;
    await firebase.addStudent(students);

    this.setState({
      st_Id: "",
      st_name: "",
      st_email: "",
      st_class: "",
      st_pass: "",
      st_dob: "",
      st_mob: ""
    });
  };

  render() {
    return (
      <div style={{ margin: "20px" }}>
        <h3>Add New Student</h3>
        <form
          style={{
            width: "50%",
            margin: "0 auto"
          }}
          onSubmit={e => {
            e.preventDefault();
            this.submit();
          }}
        >
          <label></label>
          <input
            type="text"
            placeholder="Student ID"
            onChange={this.handleChange}
            name="st_Id"
            value={this.state.st_Id}
            className="validate"
          />

          <label></label>
          <input
            type="text"
            placeholder="Student Name"
            onChange={this.handleChange}
            name="st_name"
            value={this.state.st_name}
            className="validate"
          />
          <label></label>
          <input
            type="number"
            placeholder="Student Mobile #"
            onChange={this.handleChange}
            name="st_mob"
            value={this.state.st_mob}
            className="validate"
          />
          <label></label>
          <input
            type="email"
            placeholder="Student Email"
            onChange={this.handleChange}
            name="st_email"
            value={this.state.st_email}
            className="validate"
          />
          <label></label>
          <input
            type="text"
            placeholder="Student Class"
            onChange={this.handleChange}
            name="st_class"
            value={this.state.st_class}
            className="validate"
          />
          <input
            type="text"
            placeholder="ID Key"
            onChange={this.handleChange}
            name="st_pass"
            value={this.state.st_pass}
            className="validate"
          />
          <label>DOB</label>
          <input
            type="date"
            placeholder="Student DOB"
            onChange={this.handleChange}
            name="st_dob"
            value={this.state.st_dob}
            className="validate"
          />
          <label>Gender</label>
          <div>
            <label>
              <input
                className="with-gap"
                name="group3"
                type="radio"
                checked={this.state.gender === "male"}
                value="male"
                onChange={this.handleOptionChange}
              />
              <span>Male</span>
            </label>
            <label>
              <input
                className="with-gap"
                name="group3"
                type="radio"
                value="female"
                checked={this.state.gender === "female"}
                onChange={this.handleOptionChange}
              />
              <span>Female</span>
            </label>
          </div>

          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
            onClick={() => this.submit}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AddUser;
