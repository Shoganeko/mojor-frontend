import React from "react";
import {getLatestMotd} from "../handle/MotdHandler";
import {Breadcrumb, Button, Divider} from "antd";
import {Link} from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons"
import "../assets/scss/pages/clock.scss"
import ClockCircleOutlined from "@ant-design/icons/lib/icons/ClockCircleOutlined";

export default class Clock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: "Loading...",
            date: "Loading..."
        }
    }

    days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    months = ["January","February","March","April","May","June","July ","August","September","October","November","December"]

    update = () => {
        let date = new Date()

        this.setState({
            date: `${this.days[date.getDay()]}, ${this.months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`,
            time: date.toLocaleTimeString()
        })
    }

    componentDidMount() {
        window.setInterval(function () {
            this.update();
        }.bind(this), 1000);
    }

    render() {
        return (<>
            <div className="nav-container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/"> <HomeOutlined /> </Breadcrumb.Item>
                    <Breadcrumb.Item> <ClockCircleOutlined/> </Breadcrumb.Item>
                </Breadcrumb>

                <Button ghost>Login</Button>
            </div>

            <div className="container">
                <div className="clock-container">
                    <h1 className="title">{this.state.time}</h1>
                    <p className="subtitle">{this.state.date}</p>
                </div>
            </div>
        </>)
    }
}
