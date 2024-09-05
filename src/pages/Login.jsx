import { Logo } from "../components/Logo";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Icons } from "../components/icons";
import { Axios } from "../lib/axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utils/login";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { data: user } = await Axios.get(
      `/users?login=${values.login}&parol=${values.password}`
    );

    // const isDataCorrect = users.find((user) => {
    //   return user.login === values.login && user.parol === values.password;
    // });

    let isDataCorrect = !!user.length;

    console.log(isDataCorrect);

    if (isDataCorrect) {
      dispatch(setAuth(user));

      localStorage.setItem("login", user[0].login);
      // localStorage.setItem("parol", user[0].parol);
      localStorage.setItem("role", user[0].role);
      // localStorage.setItem("location", user[0].location);

      return navigate("/");
    }

    console.log("Error");
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
          <p className="text-sm text-gray-400">
            Kirish uchun login va parolni kiriting!
          </p>
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
            name="login"
            rules={[
              {
                required: true,
                message: "Iltimos Loginingizni kiriting!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Login"
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
              placeholder="Parol"
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

          <div className="flex items-center justify-end">
            <Button type="primary" htmlType="submit" className="w-fit">
              Kirish
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
