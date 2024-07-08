import { Logo } from "../components/Logo";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Icons } from "../components/icons";

const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="w-full h-full flex justify-center mt-40">
      <div className="w-fit h-fit flex flex-col gap-y-7">
        <Logo />
        <div className="flex flex-col gap-y-3 items-center">
          <h1 className="text-3xl font-semibold">Kirish</h1>
          <p className="text-sm text-gray-400">Kirish uchun login va parolni kiriting!</p>
        </div>

        <Form
          name="normal_login"
          className="w-[436px]"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Iltimos E-mail pochtangizni kiriting!",
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
                message: "Iltimos parolingizni kiriting!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item> */}

          <div className="flex items-center justify-between">
            <Button type="primary" htmlType="submit" className="w-fit">
              Kirish
            </Button>

            <Button className="w-fit">
              <Icons.google />
              Google hisob orqali kirish
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
