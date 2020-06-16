import React from "react";
import {Breadcrumb, Button, Form, Input, Tabs, message, Table} from "antd";
import {HomeOutlined, SettingOutlined} from "@ant-design/icons";
import ClockCircleOutlined from "@ant-design/icons/lib/icons/ClockCircleOutlined";
import User from "../handle/User";
import {changePassword, changeUsername, getAttempts, getSelf, signedIn} from "../handle/AccountHandler";
import {Redirect} from "react-router-dom";
import "../assets/scss/pages/settings.scss"
const { TabPane } = Tabs;

export default class Settings extends React.Component {
    state = {
        data: [] // the login attempt table's data.
    }

    componentDidMount() {
        let params = new URLSearchParams(window.location.search)
        let inv = params.get("inv")

        switch (inv) {
            case "pf":
                message.error("Password does not meet the requirements!")
                break;
            case "ps":
                message.success("Password successfully changed!")
                break;
            case "uf":
                message.error("Username does not meet the requirements or is taken!")
                break;
            case "us":
                message.success("Username successfully changed!")
                break;
            default:
                break;
        }

        getAttempts((attempts => {
            for (let i = 0; attempts.length > i; i++) {
                let obj = attempts[i]

                this.state.data.push({
                    time: new Date(obj.date).toLocaleString(),
                    success: obj.success,
                    ip: obj.ip
                })
            }
        }))
    }

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    render() {
        if (!signedIn())
            return (<Redirect to="/login"/>)

        return (<>
            <div className="nav-container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/"> <HomeOutlined /> </Breadcrumb.Item>
                    <Breadcrumb.Item> <SettingOutlined/> </Breadcrumb.Item>
                </Breadcrumb>

                <User/>
            </div>

            <div className="container">
                <Tabs defaultActiveKey="1" size="small" className="settings-container">
                    <TabPane tab="Account" key="1">
                        <p>Change various account settings.</p>
                        <br/>
                        <Form
                            name="basic"
                            className="set-username"
                            onFinish={(vars) => {
                                let pass = vars["username"]

                                changeUsername(pass, (success) => {
                                    let url = "?inv="

                                    if (success)
                                        url += "us"
                                    else url += "uf"

                                    getSelf()
                                    window.location.replace('/settings' + url);
                                })
                            }}
                            onFinishFailed={() => {}}
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your new username!' }]}
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
                            onFinish={(vars) => {
                                let pass = vars["password"]

                                changePassword(pass, (success) => {
                                    let url = "?inv="

                                    if (success)
                                        url += "ps"
                                    else url += "pf"

                                    window.location.replace('/settings' + url);
                                })
                            }}
                            onFinishFailed={() => {}}
                        >
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your new password!' }]}
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
                        <p>View previous logins to this account. <br/> If something seems suspicious, please email support@shog.dev</p>
                        <br/>

                        <Table columns={[
                            {
                                title: 'Time',
                                dataIndex: 'time',
                            },
                            {
                                title: 'IP',
                                dataIndex: 'ip'
                            },
                            {
                                title: "Success",
                                dataIndex: 'success',
                                render: bool => bool ? "Yes" : "No"
                            }
                        ]} dataSource={this.state.data} />
                    </TabPane>
                </Tabs>
            </div>
        </>)
    }
}
