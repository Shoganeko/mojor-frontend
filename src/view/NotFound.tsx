import React from "react"
import {HomeOutlined, SettingOutlined} from "@ant-design/icons";
import User from "../component/User";
import Navigation from "../component/Navigation";
import styled from "styled-components"

const NotFoundContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 4rem;
`;

export default () => {
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
                        name: "404",
                        url: "",
                    },
                ]}
            />

            <NotFoundContainer>
                <h1>That page could not be found!</h1>
            </NotFoundContainer>
        </>
    );
}