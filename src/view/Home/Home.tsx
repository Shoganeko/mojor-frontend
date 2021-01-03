import React from "react";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import User from "../../component/User";
import Navigation from "../../component/Navigation";
import styled from "styled-components"
import Container from "../../component/Container";
import RecentMotd from "./RecentMotd";
import Heading from "../../component/Heading";

const LinksContainer = styled.div`
    text-align: center;
    margin-top: 1rem;

    a {
        font-size: 14px;
    }
`;

const TryContainer = styled.div`
`

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
                ]}
            />

            <Container>
                <Heading>SHO</Heading>

                <RecentMotd />

                <LinksContainer>
                    <p>
                        <a target="_blank" href="/discord">
                            discord
                        </a>
                        , <Link to="/projects">projects</Link>,{" "}
                        <Link to="/clock">clock</Link>,{" "}
                        <Link to="/blog">blog</Link>.
                    </p>
                </LinksContainer>

                <TryContainer>
                    <p>
                        try <Link to="/projects/unifey">unifey</Link> or <Link to="/projects/buta">buta</Link>.
                    </p>
                </TryContainer>
            </Container>
        </>
    );
}
