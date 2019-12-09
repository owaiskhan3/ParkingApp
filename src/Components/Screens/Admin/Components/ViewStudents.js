import React, { Component } from "react";
import firebase from "../../../../config/firebase";
import loader from "../../../../Assets/loader.gif";

class ViewStudents extends Component {
  state = {
    // students: []
    loading: true
  };

  componentDidMount = async () => {
    let students = await firebase.getStudents();
    console.log(students);
    this.setState({ students, loading: false });
  };
  render() {
    return this.state.loading ? (
      <img
        src={loader}
        style={{
          display: "flex",
          alignItems: "cente",
          justifyContent: "center",
          margin: "0 auto "
        }}
      />
    ) : (
      <div>
        <h1>view students</h1>
        {this.state.students ? (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>DOB</th>
                  <th>Class</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {this.state.students.map((student, index) => {
                  return (
                    <tr key={index}>
                      {<td>{student.st_Id}</td>}
                      <td>{student.st_name}</td>
                      <td>{student.st_email}</td>
                      <td>{student.st_mob}</td>
                      <td>{student.st_dob}</td>
                      <td>{student.st_class}</td>
                      <td>{student.gender}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    );
  }
}

export default ViewStudents;
