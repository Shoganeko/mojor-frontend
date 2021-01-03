import React from "react";
import {Link} from "react-router-dom";
import {HomeOutlined, ProjectOutlined} from "@ant-design/icons"
import User from "../../component/User";
import Navigation from "../../component/Navigation";
import Container from "../../component/Container";
import styled from "styled-components";

export const ProjectLinks = styled.div`
    list-style-type: none;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 2rem;

    li {
        padding: 0 8px;
        font-size: 16px;
        text-decoration: underline;
    }
`;

const Topic = styled.p`
    text-transform: uppercase;
    color: #595757;
    margin-top: -14px;
    font-size: 12px;
`;

const Project = styled.div`
    a {
        text-decoration: underline;
    }
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
                    {
                        name: <ProjectOutlined />,
                        url: "/projects",
                    },
                ]}
            />

            <Container>
                <h1>Projects</h1>
                <div>
                    <Project>
                        <h2>Buta</h2>
                        <Topic>Discord Bot</Topic>
                        <p>
                            Buta is a Discord bot that has various utilities to
                            assist you with moderation.{" "}
                            <Link to="/projects/buta">View more</Link>
                        </p>
                    </Project>

                    <Project>
                        <h2>Mojor</h2>
                        <Topic>Website</Topic>
                        <p>
                            Mojor is a frontend and backend of this website. The
                            frontend is made using React, and the backend is
                            made using Ktor.{" "}
                            <Link to="/projects/mojor">View more</Link>
                        </p>
                    </Project>

                    <Project>
                        <h2>Unifey</h2>
                        <Topic>Website</Topic>
                        <p>
                            Unifey is a work-in-progress open-source social media platform dedicated to free speech. It's made using Ktor and React with Redux. <a href="https://unifey.net">View more</a>
                        </p>    
                    </Project>
                </div>
            </Container>
        </>
    );
}
