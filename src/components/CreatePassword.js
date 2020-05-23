import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { notification } from "antd";
import "./createAccount.css";
import axios from "axios";

export default class ForgetPass extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  async componentDidMount() {
    const users = await axios.get("https://zbrfq.sse.codesandbox.io/users");
    this.setState({ users: users.data });
  }
  render() {
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 8
        }
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 16
        }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const onFinish = values => {
      let err = "";
      let user = this.state.users.filter(function(x) {
        return x.username.indexOf(values.username) !== -1;
      });
      let id = user[0].id;
      console.log(id);
      if (!user.length) {
        err = "Username hasn't existed!";
      } else {
        err = "Change success!";
      }

      const openNotificationWithIcon = type => {
        notification[type]({
          message: "Notification Title",
          description: err
        });
      };
      if (!user.length) {
        openNotificationWithIcon("warning");
      } else {
        openNotificationWithIcon("success");
        console.log("hi");
        axios.put("https://zbrfq.sse.codesandbox.io/users/" + id, values);
      }
    };

    return (
      <div className="form-input">
        <Form
          {...formItemLayout}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86"
          }}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please input your Username!"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!"
              }
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!"
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
