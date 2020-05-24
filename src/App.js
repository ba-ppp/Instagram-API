import React, { Component } from "react";
import "./styles.css";
import Router from "./Router";
import axios from "axios";

import "antd/dist/antd.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: []
    };
  }
  async componentDidMount() {
    let user = await axios.get("https://zbrfq.sse.codesandbox.io/users");
    this.setState({ user: user.data });
  }
  render() {
    return (
      <div className="App">
        <Router user={this.state.user} />
      </div>
    );
  }
}
