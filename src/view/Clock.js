import React, {useEffect, useState} from "react";
import {getLatestMotd} from "../handle/MotdHandler";
import {Breadcrumb, Button, Divider, Skeleton} from "antd";
import {Link} from "react-router-dom";
import {HomeOutlined, SettingOutlined} from "@ant-design/icons"
import "../assets/scss/pages/clock.scss"
import ClockCircleOutlined from "@ant-design/icons/lib/icons/ClockCircleOutlined";
import User from "../component/User";
import Navigation from "../component/Navigation";

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const months = ["January","February","March","April","May","June","July ","August","September","October","November","December"]

export default function Clock() {
    let [time, setTime] = useState("")
    let [date, setDate] = useState("")

    let update = () => {
        let dateObj = new Date()

        setDate(`${days[dateObj.getDay()]}, ${months[dateObj.getMonth()]} ${dateObj.getDate()} ${dateObj.getFullYear()}`)
        setTime(dateObj.toLocaleTimeString())
    }

    useEffect(() => {
        let id = window.setInterval(update, 1000);

        return () => {
            window.clearInterval(id)
        }
    }, [])

    return (<>
        <Navigation user={<User/>} breadcrumbs={[
            {
                name: <HomeOutlined/>,
                url: "/"
            },
            {
                name: <ClockCircleOutlined/>,
                url: "/clock"
            }
        ]}/>

        <div className="container">
            <div className="clock-container">
                { date === "" && time === "" &&
                    <>
                        <Skeleton title={{width: "24rem"}} paragraph={{rows: 0}}/>
                        <Skeleton title={{width: "10rem"}} paragraph={{rows: 0}}/>
                    </>
                }

                { date !== "" && time !== "" &&
                    <>
                        <h1 className="title">{time}</h1>
                        <p className="subtitle">{date}</p>
                    </>
                }
            </div>
        </div>
    </>)
}
