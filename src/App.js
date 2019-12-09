import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";

import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import PrivateRoute from "./Components/PrivateRoute";



class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            {/* <Route exact path="/adminLogin" component={AdminLogin} />
            <PrivateRoute exact path="/makeQuiz" component={MakeQuiz} />
            <PrivateRoute exact path="/updateQuiz" component={UpdateQuiz} />
            <PrivateRoute exact path="/updatingQuiz" component={UpdatingQuiz} />
            <PrivateRoute path="/home" component={Home} />
            <Redirect to={localStorage.path || "/home"} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
