import React, { Component } from "react";
import "./components/Main.css";
import Router from "./Router";
import axios from "axios";

import "antd/dist/antd.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      post: []
    };
  }
  async componentDidMount() {
    let user = await axios.get("https://zbrfq.sse.codesandbox.io/users");
    let post = await axios.get("https://zbrfq.sse.codesandbox.io/posts");
    this.setState({ user: user.data, post: post.data });
  }
  render() {
    return (
      <div className="App">
        <Router user={this.state.user} post={this.state.post} />
      </div>
    );
  }
}
