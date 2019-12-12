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
                  <th>Student Id</th>
                  <th>Student Email</th>
                  <th>FirstName</th>
                  <th>LastName</th>
                </tr>
              </thead>
              <tbody>
                {this.state.students.map((student, index) => {
                  return (
                    <tr key={index}>
                      {<td>{student.uid}</td>}
                      <td>{student.email}</td>
                      <td>{student.firstName}</td>
                      <td>{student.lastName}</td>
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
