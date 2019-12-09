import React, { Component } from "react";
import firebase from "../../../../config/firebase";
class ViewFeedback extends Component {
  state = {
    feedback: []
  };

  componentWillMount = async () => {
    let feedback = await firebase.getFeedbacks();
    console.log(feedback);

    this.setState({ feedback });
  };

  render() {
    return (
      <div>
        <h1>View Feedback</h1>
        <ul className="collection">
          {this.state.feedback.map((userFeedback, index) => {
            return (
              <li className="collection-item avatar" key={index}>
                <i className="material-icons circle green"></i>
                <span className="title"></span>
                <p>
                  <b>User Feedback:</b> {userFeedback.feedback}
                </p>
                <div>
                  <b>UserInfo:</b>
                  {Object.keys(userFeedback.userInfo).map((key, index) => {
                    console.log(key);
                    return (
                      <p key={index}>
                        {key}: {userFeedback.userInfo[key]}
                      </p>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ViewFeedback;
