import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import CreatePassword from "./components/CreatePassword";
import Main from "./components/Main";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/login">
              <Login user={this.props.user} />
            </Route>
            <Route exact path="/create/account">
              <CreateAccount />
            </Route>
            <Route exact path="/create/password">
              <CreatePassword />
            </Route>
            <Route exact path="/">
              <Main post={this.props.post} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
