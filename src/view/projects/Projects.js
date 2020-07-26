import React from "react";
import {Link} from "react-router-dom";
import {HomeOutlined, ProjectOutlined} from "@ant-design/icons"
import "../../assets/scss/pages/home.scss"
import User from "../../component/User";
import Navigation from "../../component/Navigation";

export default function Projects() {
    return (<>
        <Navigation user={<User/>} breadcrumbs={[
            {
                name: <HomeOutlined/>,
                url: "/"
            },
            {
                name: <ProjectOutlined/>,
                url: "/projects"
            }
        ]}/>

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
