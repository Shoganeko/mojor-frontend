import React from "react";
import {Breadcrumb, Button} from "antd";
import {HomeOutlined, ProjectOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import User from "../../../component/User";
import Navigation from "../../../component/Navigation";
import Container from "../../../component/Container";
import { ProjectLinks } from "../Projects";

export default () => {
    return (
        <>
            <h1>Mojor</h1>
            <div>
                <h3>What is Mojor?</h3>
                <p>
                    Mojor is this website. The source code of this website can
                    be found in the links below.
                </p>

                <h3>What is Mojor made in?</h3>
                <p>
                    Mojor's frontend is made using ReactJS and the backend is
                    made using Ktor (Kotlin).
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
        </>
    );
}
