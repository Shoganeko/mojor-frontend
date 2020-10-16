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

const Project = styled.div`
    a {
        text-decoration: underline;
    }
`

export default function Projects() {
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
                        <h3>Buta</h3>
                        <p>
                            Buta is a Discord bot that has various utilities to
                            assist you with moderation.{" "}
                            <Link to="/projects/buta">View more</Link>
                        </p>
                    </Project>

                    <Project>
                        <h3>Mojor</h3>
                        <p>
                            Mojor is a frontend and backend of this website. The
                            frontend is made using React, and the backend is
                            made using Ktor.{" "}
                            <Link to="/projects/mojor">View more</Link>
                        </p>
                    </Project>
                </div>
            </Container>
        </>
    );
}
