import React from "react";
import {getLatestMotd} from "../handle/MotdHandler";
import {Breadcrumb, Button, Divider} from "antd";
import {Link, Redirect} from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons"
import "../assets/scss/pages/home.scss"
import User from "../handle/User";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            motd: "Loading...",
            owner: "Loading...",
            date: "Loading..."
        }
    }

    componentDidMount() {
        getLatestMotd((motd) => {
            if (motd != null) {
                this.setState({
                    motd: motd.motd.data,
                    owner: motd.owner.username,
                    date: new Date(motd.motd.date).toLocaleString(),
                    dateUnix: motd.motd.date
                })
            } else {
                this.setState({
                    motd: "Loading",
                    owner: "Loading",
                    date: "Loading"
                })
            }
        })
    }

    render() {
        if (this.state.motd === "Loading")
            return <Redirect to="/backend-down"/>

        return (<>
            <div className="nav-container">
                <Breadcrumb>
                    <Breadcrumb.Item> <HomeOutlined /> </Breadcrumb.Item>
                </Breadcrumb>

                <User/>
            </div>

            <div className="container">
                <div className="home-container">
                    <h1 className="title">shog.dev</h1>

                    <div className="motd-container">
                        <p className="motd-title">{this.state.motd}</p>
                        <p className="motd-bottom">
                            {this.state.date} by {this.state.owner}
                            <br/>
                            <Link to={`/history?selected=${this.state.dateUnix}`}>View more</Link>
                        </p>
                    </div>

                    <div className="links-container">
                        <p>
                            <a target="_blank" href="/discord">discord</a>, <Link to="/projects">projects</Link>, <Link to="/clock">clock</Link>.
                        </p>
                    </div>
                </div>
            </div>
        </>)
    }
}
