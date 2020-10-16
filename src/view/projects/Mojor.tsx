import React from "react";
import {Breadcrumb, Button} from "antd";
import {HomeOutlined, ProjectOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import User from "../../component/User";
import Navigation from "../../component/Navigation";
import Container from "../../component/Container";
import { ProjectLinks } from "./Projects";

export default function Mojor() {
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
                    {
                        name: "Mojor",
                        url: "/projects/mojor",
                    },
                ]}
            />

            <Container>
                <h1>Mojor</h1>
                <div>
                    <h3>What is Mojor?</h3>
                    <p>Mojor is a pair of frontend and backend servers.</p>

                    <h3>What is Mojor made in?</h3>
                    <p>
                        Mojor's frontend is made using React and the backend is
                        made using Ktor.
                    </p>

                    <ProjectLinks>
                        <li>
                            <a href="https://github.com/shoganeko/mojor-frontend">
                                GitHub Frontend
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/shoganeko/mojor">
                                GitHub Backend
                            </a>
                        </li>
                    </ProjectLinks>
                </div>
            </Container>
        </>
    );
}
