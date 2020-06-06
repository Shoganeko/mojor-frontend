import React from "react";
import {Breadcrumb, Button} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import "../../assets/scss/pages/projects.scss"
import User from "../../handle/User";

export default class Mojor extends React.Component {
    render() {
        return (<>
            <div className="nav-container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/"> <HomeOutlined /> </Breadcrumb.Item>
                    <Breadcrumb.Item href="/projects"> Projects </Breadcrumb.Item>
                    <Breadcrumb.Item href="/projects/mojor"> Mojor </Breadcrumb.Item>
                </Breadcrumb>

                <User/>
            </div>

            <div className="container">
                <h1>Mojor</h1>
                <div className="project-details">
                    <h3>What is Mojor?</h3>
                    <p>Mojor is a pair of frontend and backend servers.</p>

                    <h3>What is Mojor made in?</h3>
                    <p>Mojor's frontend is made using React and the backend is made using Ktor.</p>

                    <ul className="project-links">
                        <li><a href="https://github.com/shoganeko/mojor-frontend">GitHub Frontend</a></li>
                        <li><a href="https://github.com/shoganeko/mojor">GitHub Backend</a></li>
                    </ul>
                </div>
            </div>
        </>)
    }
}
