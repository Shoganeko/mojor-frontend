import {Breadcrumb, Button, notification} from "antd";
import React from "react";
import {HomeOutlined} from "@ant-design/icons";
import { Form, Input, Checkbox } from 'antd';
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";
import "../assets/scss/pages/login.scss"
import ReCAPTCHA from "react-google-recaptcha";
import {sha512} from "js-sha512";
import { message } from 'antd';
import {login, signedIn} from "../handle/AccountHandler";
import history from "../handle/History"
import {Redirect} from "react-router-dom";
import User from "../handle/User";

const recaptchaRef = React.createRef();

export default class Login extends React.Component {
    render () {
        if (signedIn())
            return (<Redirect to="/"/>)

        return (<>
            <div className="nav-container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/"> <HomeOutlined /> </Breadcrumb.Item>
                    <Breadcrumb.Item> Login </Breadcrumb.Item>
                </Breadcrumb>

                <User/>
            </div>
            <div className="container">
                <div className="login-container">
                    <h1>Login</h1>

                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={values => {
                            let captcha = recaptchaRef.current.getValue()

                            if (captcha == null || captcha === "") {
                                message.error("You must fill out the captcha!")
                                return
                            }

                            login(values.username, sha512(values.password), captcha, (data) => {
                                if (data != null) {
                                    notification["success"]({
                                        message: 'Success',
                                        description:
                                            'You are now logged in! Redirecting...',
                                    })

                                    setTimeout(() => {
                                        history.push("/")
                                    }, 1500)
                                } else {
                                    recaptchaRef.current.reset()
                                    document.getElementById("normal_login_password").value = ""
                                    message.error("Invalid username or password!")
                                }
                            })
                        }}
                    >
                        <Form.Item
                            name="username"
                            rules={[{
                                required: true,
                                message: 'Please input your Username!'
                            }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{
                                required: true,
                                message: 'Please input your Password!'
                            }]}
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

                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </Form.Item>

                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6Le4HJgUAAAAALeqcwesooIXY1Bw-oR9wtxN0IHH"
                            theme="dark"
                            className="reCaptchaForm"
                        />

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="">register now!</a>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>);
    }
}
