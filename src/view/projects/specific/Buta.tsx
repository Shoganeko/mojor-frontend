import React from "react";
import {Breadcrumb, Button} from "antd";
import {HomeOutlined, ProjectOutlined, SettingOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import User from "../../../component/User";
import Navigation from "../../../component/Navigation";
import Container from "../../../component/Container";
import { ProjectLinks } from "../Projects";

export default function Buta() {
    return (
        <>
            <h1>Buta</h1>

            <div>
                <h3>What is Buta?</h3>
                <p>
                    Buta is a Discord bot that assists a server with extra
                    utilities and enjoyable games.
                </p>

                <h3>Why should I use Buta?</h3>
                <p>
                    Buta's vast amount of commands as well as it's simple online
                    dashboard can assist your server quickly and simply.
                </p>

                <h3>How can I get Buta?</h3>
                <p>
                    You can invite Buta to your server{" "}
                    <Link to="/discord/buta">here</Link>.
                </p>

                <ProjectLinks>
                    <li>
                        <a href="https://github.com/shoganeko/buta">GitHub</a>
                    </li>
                    <li>
                        <Link to="/discord/buta">Invite</Link>
                    </li>
                    <li>
                        <Link to="/buta">Dashboard</Link>
                    </li>
                </ProjectLinks>
            </div>
        </>
    );
}
