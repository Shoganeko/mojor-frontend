import { Button, Form, Input } from "antd"
import React from "react"
import history from "../../handle/History";
import styled from "styled-components"
import { Store } from "antd/lib/form/interface";
import {
    changePassword,
    changeUsername
} from "../../handle/AccountHandler";
import toast from "react-hot-toast";
import toastStyle from "../../handle/toastStyle";
import { logOut } from "../../redux/actions/auth.actions";
import { useDispatch } from "react-redux";

const SettingContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px;
`;

export default () => {
    const dispatch = useDispatch()

    /**
     * Change username.
     */
    const updateUser = async (vars: Store) => {
        let username = vars["username"];

        history.push(`/settings`);

        if (username != null) {
            let response = await changeUsername(username);

            if (response) {
                toast.success("Successfully changed username!", toastStyle);
            } else {
                toast.error("Invalid username!", toastStyle);
            }
        }
    };

    /**
     * Change password.
     */
    const changePass = async (vars: Store) => {
        let password = vars["password"];

        history.push(`/settings`);

        if (password != null) {
            let response = await changePassword(password);

            if (response) {
                toast.success("Successfully changed password!", toastStyle);
            } else {
                toast.error("Invalid username!", toastStyle);
            }
        }
    };

    return (
        <>
            <p>Change various account settings.</p>
            <br />

            <Form name="basic" onFinish={updateUser} onFinishFailed={() => {}}>
                <SettingContainer>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your new username!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </SettingContainer>
            </Form>

            <Form name="basic" onFinish={changePass}>
                <SettingContainer>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your new password!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </SettingContainer>
            </Form>

            <br/>

            <Button onClick={() => dispatch(logOut())}>Sign Out</Button>
        </>
    );
}