import React from "react";
import {getLatestMotd, getMotds} from "../handle/MotdHandler";
import {Breadcrumb, Button, Card, Divider} from "antd";
import {Link, Redirect} from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons"
import "../assets/scss/pages/motdhistory.scss"
import User from "../handle/User";
import SelectOutlined from "@ant-design/icons/lib/icons/SelectOutlined";

export default class MotdHistory extends React.Component {
    constructor(props) {
        super(props);

        let selected = new URLSearchParams(window.location.search).get("selected")

        if (selected == null)
            selected = ""

        console.log("selected")

        this.state = {
            motd: [],
            selected: selected
        }
    }

    componentDidMount() {
        getMotds((motd) => {
            let ar = []

            for (let i = 0; motd.length > i; i++) {
                ar.push(motd[i])
            }

            console.log(ar);

            this.setState({
                motd: ar
            })
        })
    }

    render() {
        if (this.state.motd === "Loading")
            return <Redirect to="/backend-down"/>

        return (<>
            <div className="nav-container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/"> <HomeOutlined /> </Breadcrumb.Item>
                    <Breadcrumb.Item > MOTD History </Breadcrumb.Item>
                </Breadcrumb>

                <User/>
            </div>

            <div className="container">
                <h1>MOTD History</h1>

                <div className="motd-history-container">
                    {
                        this.state.motd.map((motd, index) => {
                            let className = "motd-container"

                            if (motd.motd.date == this.state.selected)
                                className += " selected"
                            else className += " unselected"

                            return (
                                <div key={index} className={className}>
                                    <div className="motd-header">
                                        <div>
                                            <h2>{motd.motd.data}</h2>
                                        </div>

                                        <div>
                                            <SelectOutlined
                                                className="select"
                                                onClick={() => {
                                                    if (this.state.selected == motd.motd.date)
                                                        this.setState({selected: ""})
                                                    else this.setState({selected: motd.motd.date})
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <p>by {<Link to={`/@${motd.owner.username}`}>{motd.owner.username}</Link>} on {new Date(motd.motd.date).toLocaleString()}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>)
    }
}
