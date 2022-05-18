import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { Logo } from "components";
import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { useAppDispatch } from "redux/store";
import { toggleLogin } from "redux/actions";

interface User {
  name: string;
  password: string;
  username: string;
}

export const Header: React.FC = () => {
  const visible = useSelector((state: RootState) => state.login.showLogin);
  const dispatch = useAppDispatch();

  const [isLogin, setIsLogin] = React.useState(true);
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/", {
        headers: {
          "Access-Control-Allow-Credentials": true,
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        let userData = res.data.user;
        setUser({
          username: userData.username,
          name: userData.name,
          password: "",
        });
      });
    return () => {};
  }, []);

  const onFinish = (values: any) => {
    const { username, password } = values;
    axios
      .post(
        "http://localhost:3001/login",
        {
          username,
          password,
        },
        {
          headers: { "Access-Control-Allow-Credentials": true },
        }
      )
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        dispatch(toggleLogin(false));
      })
      .catch((err) => {
        alert("Wrong username or password!");
        console.log(err);
      });
  };

  const onFinishRegister = (values: any) => {
    const { username, password, name } = values;
    axios
      .post(
        "http://localhost:3001/register",
        {
          username,
          password,
          name,
        },
        {
          headers: { "Access-Control-Allow-Credentials": true },
        }
      )
      .then(() => {
        setIsLogin(true);
      })
      .catch((err) => {
        alert("Something went wrong!");
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const loginForm = (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 12 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
        <Button
          type="primary"
          htmlType="submit"
          className={`${style.login_btn_form}`}
        >
          Login
        </Button>

        <Button
          type="dashed"
          onClick={() => setIsLogin(false)}
          className={`${style.regis_btn_form}`}
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );

  const registerForm = (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 12 }}
      initialValues={{ remember: true }}
      onFinish={onFinishRegister}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
        <Button
          type="primary"
          htmlType="submit"
          className={`${style.login_btn_form}`}
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <div className={`${style.header}`}>
      <Modal
        title="Login"
        visible={visible}
        footer={[]}
        maskClosable
        onCancel={() => dispatch(toggleLogin(false))}
      >
        {isLogin ? loginForm : registerForm}
      </Modal>
      <Logo />
      <p className={`${style.user_name}`}>{user && user.name}</p>
      {user ? (
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            setUser(null);
          }}
          className={`${style.login_btn}`}
          type={"dashed"}
        >
          Logout
        </Button>
      ) : (
        <Button
          onClick={() => dispatch(toggleLogin(true))}
          className={`${style.login_btn}`}
          type={"primary"}
        >
          Login
        </Button>
      )}
    </div>
  );
};
