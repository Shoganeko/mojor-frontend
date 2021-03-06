import { Button, notification } from "antd";
import React, { useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Form, Input, Checkbox } from "antd";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";
import ReCAPTCHA from "react-google-recaptcha";
import { message } from "antd";
import { login, isSignedIn } from "../handle/AccountHandler";
import history from "../handle/History";
import { Redirect } from "react-router-dom";
import User from "../component/User";
import Navigation from "../component/Navigation";
import LoginOutlined from "@ant-design/icons/lib/icons/LoginOutlined";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/actions/auth.actions";
import styled from "styled-components";
import Container from "../component/Container";
import toast from "react-hot-toast";
import toastStyle from "../handle/toastStyle";
import { Store } from "antd/lib/form/interface";

const LoginContainer = styled.div`
    .reCaptchaForm {
        margin-bottom: 1rem;
    }

    min-width: 400px;

    .login-form {
        max-width: 300px;
    }

    .login-form-forgot {
        float: right;
    }
    
    .ant-col-rtl .login-form-forgot {
        float: left;
    }

    .login-form-button {
        width: 100%;
    }
`;

/**
 * The login page.
 *
 * The login requires a username, password, and recaptcha.
 */
export default function Login() {
    let dispatch = useDispatch();

    const [ref, setRef] = useState<ReCAPTCHA>();

    if (isSignedIn()) return <Redirect to="/" />;

    const formLogin = async (values: Store) => {
        let captcha = ref!!.getValue()

        if (captcha == null || captcha === "") {
            toast.error("You must fill out the captcha!", toastStyle);
            return;
        }

        let response = await login(values.username, values.password, captcha);

        if (response.status === 200) {
            history.push("/");

            let data = response.data;

            dispatch(logIn(data.token.token, data.user, data.token.expire));

            toast.success(`You are now signed in as ${data.user.name}!`, toastStyle);
        } else {
            ref!!.reset();

            (document.getElementById("normal_login_password")!! as HTMLInputElement).value = "";

            toast.error("Invalid username or password!", toastStyle);
        }
    };

    return (
        <>
            <Navigation
                user={<User />}
                breadcrumbs={[
                    {
                        name: <HomeOutlined />,
                        url: "/",
                    },
                    {
                        name: <LoginOutlined />,
                        url: "/login",
                    },
                ]}
            />

            <Container>
                <LoginContainer>
                    <h1>Login</h1>

                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={formLogin}
                    >
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
                                prefix={
                                    <UserOutlined className="site-form-item-icon" />
                                }
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
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                noStyle
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a
                                href="#"
                                className="login-form-forgot"
                                onClick={() =>
                                    toast("cry about it", {
                                        icon: "😢",
                                        ...toastStyle
                                    })
                                }
                            >
                                Forgot password
                            </a>
                        </Form.Item>

                        <ReCAPTCHA
                            ref={(captcha: ReCAPTCHA) => setRef(captcha)}
                            sitekey="6Le4HJgUAAAAALeqcwesooIXY1Bw-oR9wtxN0IHH"
                            theme="dark"
                        />

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                style={{
                                    marginTop: "1.5rem",
                                }}
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </LoginContainer>
            </Container>
        </>
    );
}
