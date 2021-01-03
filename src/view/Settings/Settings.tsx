import React from "react";
import { Tabs } from "antd";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import User from "../../component/User";
import { isSignedIn } from "../../handle/AccountHandler";
import { Redirect } from "react-router-dom";
import Navigation from "../../component/Navigation";
import Container from "../../component/Container";
import styled from "styled-components";
import Account from "./Account";
import PreviousLogins from "./PreviousLogins";

const { TabPane } = Tabs;

export default function Settings() {
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

            <Container>
                <h1>Settings</h1>

                <Tabs
                    defaultActiveKey="1"
                    size="small"
                    style={{
                        width: "480px",
                    }}
                >
                    <TabPane tab="Account" key="1">
                        <Account />
                    </TabPane>

                    <TabPane tab="Preferences" key="2">
                        <p>:)</p>
                    </TabPane>

                    <TabPane tab="Previous Logins" key="3">
                        <PreviousLogins />
                    </TabPane>
                </Tabs>
            </Container>
        </>
    );
}
