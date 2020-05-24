import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { notification } from "antd";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./Login.css";

class NormalLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      check: true
    };
  }

  render() {
    let err = "Login success";
    const onFinish = values => {
      const username = values.username;
      const password = values.password;

      let rsUser = this.props.user.filter(function(x) {
        return x.username.indexOf(username) !== -1;
      });

      if (rsUser.length) {
        let rsPass = this.props.user.filter(function(x) {
          return x.password.indexOf(password) !== -1;
        });
        console.log(rsPass);
        if (!rsPass.length) {
          err = "Wrong password!";
          this.setState({ check: false });
        }
      } else {
        err = "Username not exist!";
        this.setState({ check: false });
      }
      const openNotificationWithIcon = type => {
        notification[type]({
          message: "Notification Title",
          description: err
        });
      };
      if (this.state.check === false) {
        openNotificationWithIcon("warning");
      } else {
        openNotificationWithIcon("success");
      }
    };

    return (
      <Router>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="/create/password">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="/create/account"> Register now!</a>
          </Form.Item>
        </Form>
      </Router>
    );
  }
}
export default NormalLoginForm;
