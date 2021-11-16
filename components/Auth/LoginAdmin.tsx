import { Form, Input, Button, Checkbox, Divider, Modal } from 'antd';
import Link from 'next/dist/client/link';
import { useRouter } from 'next/dist/client/router';
import { AdminProps } from '../../services/auth/auth.model';
import { adminLogin } from '../../services/auth/auth.service';
import styles from '../../styles/Login.module.css'


const LoginAdmin = () => {
  const router = useRouter();

  const onLogin = (allValues: any) => {
    const loginProps: AdminProps = {
      username: allValues.username,
      password: allValues.password,
    }

    adminLogin(loginProps)
    .then((res:any) => {
      localStorage.setItem('token', res?.data?.accessToken);
      if(!localStorage.getItem('token')) return
      router.push('/edit-carousel');
    })
    .catch((e) => {
      const content = e instanceof Error ? e.toString() : e?.response?.data?.message || null;
      Modal.error({
        title: 'รหัสหรือ username ไม่ถูกต้อง',
        content: content ,
      });
    })
  };

    return (
        <div className={styles.container}>
          <Divider>Admin!</Divider>

          <Form
            name="admin_login"
            initialValues={{ remember: true }}
            onFinish={onLogin}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login to Admin
              </Button>
            </Form.Item>
            
          </Form>  

      </div>
    )
}

export default LoginAdmin;