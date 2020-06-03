import React from "react";
import {getLatestMotd} from "../../handle/MotdHandler";
import {Breadcrumb, Button, Divider} from "antd";
import {Link} from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons"
import "../../assets/scss/pages/home.scss"

export default class Projects extends React.Component {
    render() {
        return (<>
            <div className="nav-container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/"> <HomeOutlined /> </Breadcrumb.Item>
                    <Breadcrumb.Item> Projects </Breadcrumb.Item>
                </Breadcrumb>

                <Button ghost>Login</Button>
            </div>

            <div className="container">
                <h1>Projects</h1>
                <div className="projects-container">
                    <div className="project-container">
                        <h3>Buta</h3>
                        <p>Buta is a Discord bot that has various utilities to assist you with moderation. <Link to="/projects/buta">View more</Link></p>
                    </div>

                    <div className="project-container">
                        <h3>Mojor</h3>
                        <p>Mojor is a frontend and backend of this website. The frontend is made using React, and the backend is made using Ktor. <Link to="/projects/mojor">View more</Link></p>
                    </div>
                </div>
            </div>
        </>)
    }
}
