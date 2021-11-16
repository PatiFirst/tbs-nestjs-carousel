import { Form, Input, Button, Checkbox, Divider, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import Link from "next/dist/client/link";
import { useRouter } from "next/dist/client/router";
import { SignUpProps } from "../../services/auth/auth.model";
import { userSignUp } from "../../services/auth/auth.service";
import styles from "../../styles/Login.module.css";

const RegisterUser = () => {
  const router = useRouter();

  const onSignUp = (allValues: any) => {
    if (allValues.password === allValues.confirm) {
      const signUpProps: SignUpProps = {
        username: allValues.username,
        password: allValues.password,
      };

      userSignUp(signUpProps)
        .then(() => {
          Modal.success({
            content: 'Register Finish!',
          })
          router.push("/");
        })
        .catch((e) => {
          const title =
            e instanceof Error
              ? e.toString()
              : e?.response?.data?.message || null;
          Modal.error({
            title: title,
          });
        });
    }
  };

  return (
    <div className={styles.container}>
      <Divider>Register!</Divider>

      <Form
        name="register"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onSignUp}
        autoComplete="off"
      >
        <Form.Item
          label="New Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please input your confirm password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <div className={styles.tabSwitch}>
          <Link href="/">
            <a>Already have?</a>
          </Link>
        </div>

        <Form.Item
        // wrapperCol={{ offset: 8, span: 16 }}
        >
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterUser;
