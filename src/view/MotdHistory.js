import React, {useEffect, useState} from "react";
import {getLatestMotd, getMotds} from "../handle/MotdHandler";
import {Breadcrumb, Button, Card, Divider, Skeleton} from "antd";
import {Link, Redirect} from "react-router-dom";
import {HistoryOutlined, HomeOutlined, SettingOutlined} from "@ant-design/icons"
import "../assets/scss/pages/motdhistory.scss"
import User from "../component/User";
import SelectOutlined from "@ant-design/icons/lib/icons/SelectOutlined";
import Navigation from "../component/Navigation";

export default function MotdHistory() {
    let [selected, setSelected] = useState("")
    let [motds, setMotds] = useState([])

    const loadMotds = async () => {
        let motds = await getMotds()
        
        setMotds(motds.data)
    }

    useEffect(() => {
        loadMotds().catch(() => {})

        let urlSelected = new URLSearchParams(window.location.search).get("selected")

        if (urlSelected != null)
            setSelected(urlSelected)
    }, [])

    const updateSelected = (date) => {
        if (selected == date)
            setSelected("")
        else
            setSelected(date)
    }

    return (<>
        <Navigation user={<User/>} breadcrumbs={[
            {
                name: <HomeOutlined/>,
                url: "/"
            },
            {
                name: <HistoryOutlined/>,
                url: "/history"
            }
        ]}/>

        <div className="container">
            <h1>MOTD History</h1>

            <div className="motd-history-container">
                { motds.length === 0 &&
                    <>
                        <Skeleton active title={{width: "14rem"}} paragraph={{rows: 2}} />
                        <Skeleton active title={{width: "14rem"}} paragraph={{rows: 2}} />
                        <Skeleton active title={{width: "14rem"}} paragraph={{rows: 2}} />
                    </>
                }
                { motds.length > 0 &&
                    motds.map((motd, index) => {
                        let className = "motd-container"

                        if (motd.motd.date == selected)
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
                                            onClick={() => updateSelected(motd.motd.date)}
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
