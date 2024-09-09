import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "../constants";

function Login(props) {
  const { handleLoggedIn } = props;

  const onFinish = (values) => {
    console.log("values", values);
    const { username, password } = values;
    const option = {
      method: "POST",
      url: `${BASE_URL}/signin`,
      data: {
        username: username,
        password: password,
      },
      headers: { "Content-Type": "application/json" },
    };
    axios(option)
      .then((res) => { // .then: promise
        if (res.status === 200) {
          const { data } = res;
          handleLoggedIn(data);
          message.success("登陆成功! ");
        }
      })
      .catch((err) => {
        console.log("login failed: ", err.message);
        message.error("Login failed!");
      });
  };

  // 只要有报错风险，要用 try{}catch{}

  return (
    <Form name="normal_login" className="login-form" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit" // 上传标志，加上才会点击上传
          className="login-form-button"
          style={{ backgroundColor: "black" }}
        >
          Log in
        </Button>
        Or <Link to="/register">register now!</Link>
      </Form.Item>
    </Form>
  );
}

export default Login;
