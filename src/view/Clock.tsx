import React, {useEffect, useState} from "react";
import {Breadcrumb, Button, Divider, Skeleton} from "antd";
import {HomeOutlined, SettingOutlined} from "@ant-design/icons"
import ClockCircleOutlined from "@ant-design/icons/lib/icons/ClockCircleOutlined";
import User from "../component/User";
import Navigation from "../component/Navigation";
import Container from "../component/Container";
import styled from "styled-components"

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const months = ["January","February","March","April","May","June","July ","August","September","October","November","December"]


const Title = styled.h1`
    font-size: 64px;
    font-family: "Roboto Mono", monospace;
    font-weight: 200;

    @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
        font-size: 32px;
    }
`;

const SubTitle = styled.p`
    margin-top: -2rem;

    @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
        margin-top: -1.5rem;
    }
`;

export default () => {
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

    return (
        <>
            <Navigation
                user={<User />}
                breadcrumbs={[
                    {
                        name: <HomeOutlined />,
                        url: "/",
                    },
                    {
                        name: <ClockCircleOutlined />,
                        url: "/clock",
                    },
                ]}
            />

            <Container>
                {date === "" && time === "" && (
                    <div>
                        <Skeleton
                            title={{ width: "24rem" }}
                            paragraph={{ rows: 0 }}
                        />

                        <Skeleton
                            title={{ width: "10rem" }}
                            paragraph={{ rows: 0 }}
                        />
                    </div>
                )}

                {date !== "" && time !== "" && (
                    <>
                        <Title className="title">{time}</Title>
                        <SubTitle className="subtitle">{date}</SubTitle>
                    </>
                )}
            </Container>
        </>
    );
}
