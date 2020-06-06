import React from "react";
import {Breadcrumb, Button} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import "../../assets/scss/pages/projects.scss"
import User from "../../handle/User";

export default class Buta extends React.Component {
    render() {
        return (<>
            <div className="nav-container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/"> <HomeOutlined /> </Breadcrumb.Item>
                    <Breadcrumb.Item href="/projects"> Projects </Breadcrumb.Item>
                    <Breadcrumb.Item href="/projects/buta"> Buta </Breadcrumb.Item>
                </Breadcrumb>

                <User/>
            </div>

            <div className="container">
                <h1>Buta</h1>
                <div className="project-details">
                    <h3>What is Buta?</h3>
                    <p>Buta is a Discord bot that assists a server with extra utilities and enjoyable games.</p>

                    <h3>Why should I use Buta?</h3>
                    <p>Buta's vast amount of commands as well as it's simple online dashboard can assist your server quickly and simply.</p>

                    <h3>How can I get Buta?</h3>
                    <p>You can invite Buta to your server <Link to="/discord/buta">here</Link>.</p>

                    <ul className="project-links">
                        <li><a href="https://github.com/shoganeko/buta">GitHub</a></li>
                        <li><Link to="/discord/buta">Invite</Link></li>
                        <li><Link to="/buta">Dashboard</Link></li>
                    </ul>
                </div>
            </div>
        </>)
    }
}
