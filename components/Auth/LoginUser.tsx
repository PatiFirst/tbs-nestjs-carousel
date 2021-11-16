import { Form, Input, Button, Checkbox, Divider, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/dist/client/link";
import styles from "../../styles/Login.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { LoginProps } from "../../services/auth/auth.model";
import { userLogin } from "../../services/auth/auth.service";

const jwt = require("jsonwebtoken");

const LoginUser = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token !== undefined) {
      const json = jwt.decode(token) as { [key: string]: string };
      if (json.role === "user") {
        router.push("/carousel");
      } else {
        router.push("/edit-carousel");
      }
    }
  }),
    [];

  const onLogin = (allValues: any) => {
    const loginProps: LoginProps = {
      username: allValues.username,
      password: allValues.password,
    };

    userLogin(loginProps)
      .then((res: any) => {
        localStorage.setItem("token", res?.data?.accessToken);
        if (!localStorage.getItem("token")) return;
        router.push("/carousel");
      })
      .catch((e) => {
        const content =
          e instanceof Error
            ? e.toString()
            : e?.response?.data?.message || null;
        Modal.error({
          title: "รหัสหรือ username ไม่ถูกต้อง",
          content: content,
        });
      });
  };

  return (
    <div className={styles.container}>
      <Divider>Welcome User!</Divider>

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onLogin}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>

        <Form.Item>
          Or <a href="/register">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginUser;
