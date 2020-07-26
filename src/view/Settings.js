import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Form, Input, Tabs, message, Table } from "antd";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import User from "../component/User";
import {
    changePassword,
    changeUsername,
    getAttempts,
    getSelf,
    isSignedIn,
} from "../handle/AccountHandler";
import { Redirect } from "react-router-dom";
import "../assets/scss/pages/settings.scss";
import Navigation from "../component/Navigation";
import history from "../handle/History";
import { useDispatch } from "react-redux";
import { alertError, alertSuccess } from "../redux/actions/alert.actions";

const { TabPane } = Tabs;

export default function Settings() {
    let [data, setData] = useState([]);
    let dispatch = useDispatch();

    useEffect(() => {
        const loadAttempts = async () => {
            let response = await getAttempts();

            if (response.status !== 200) {
                history.push("/");
                dispatch(
                    alertError("There was an issue making a web request.")
                );
                return;
            }

            let attempts = response.data

            for (let i = 0; attempts.length > i; i++) {
                let obj = attempts[i];

                setData((prevState) => {
                    return [
                        ...prevState,
                        {
                            time: new Date(obj.date).toLocaleString(),
                            success: obj.success,
                            ip: obj.ip,
                        },
                    ];
                });
            }
        };

        loadAttempts()
    }, []);

    const updateUser = async (vars) => {
        let username = vars["username"];
        let hasAlerted = false;

        history.push(`/settings`);

        if (username != null) {
            let response = changeUsername(username);

            if (response.ok) {
                dispatch(alertSuccess("Successfully changed username!"));
                hasAlerted = true;
            }
        }

        if (!hasAlerted) dispatch(alertError("Invalid username!"));
    };

    const changePass = async (vars) => {
        let password = vars["password"];
        let hasAlerted = false;

        history.push(`/settings`);

        if (password != null) {
            let response = await changePassword(password);

            if (response.ok) {
                dispatch(alertSuccess("Successfully changed password!"));
                hasAlerted = true;
            }

            if (!hasAlerted) dispatch(alertError("Invalid username!"));
        }

        if (!isSignedIn()) return <Redirect to="/login" />;

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
                            name: <SettingOutlined />,
                            url: "/settings",
                        },
                    ]}
                />

                <div className="container">
                    <Tabs
                        defaultActiveKey="1"
                        size="small"
                        className="settings-container"
                    >
                        <TabPane tab="Account" key="1">
                            <p>Change various account settings.</p>
                            <br />
                            <Form
                                name="basic"
                                className="set-username"
                                onFinish={updateUser}
                                onFinishFailed={() => {}}
                            >
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your new username!",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <br />

                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>

                            <Form
                                name="basic"
                                className="set-password"
                                onFinish={changePass}
                            >
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your new password!",
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
                            </Form>
                        </TabPane>

                        <TabPane tab="Preferences" key="2">
                            <p>No preferences currently, check back later!</p>
                        </TabPane>

                        <TabPane tab="Previous Logins" key="3">
                            <p>
                                View previous logins to this account. <br /> If
                                something seems suspicious, please email
                                support@shog.dev
                            </p>
                            <br />

                            <Table
                                columns={[
                                    {
                                        title: "Time",
                                        dataIndex: "time",
                                    },
                                    {
                                        title: "IP",
                                        dataIndex: "ip",
                                    },
                                    {
                                        title: "Success",
                                        dataIndex: "success",
                                        render: (bool) => (bool ? "Yes" : "No"),
                                    },
                                ]}
                                dataSource={data}
                            />
                        </TabPane>
                    </Tabs>
                </div>
            </>
        );
    };
}
