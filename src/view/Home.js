import React, { useEffect, useState } from "react";
import { getLatestMotd } from "../handle/MotdHandler";
import { Breadcrumb, Button, Divider, Skeleton, Alert } from "antd";
import { Link, Redirect } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import "../assets/scss/pages/home.scss";
import User from "../component/User";
import Navigation from "../component/Navigation";

export default function Home() {
    let [motd, setMotd] = useState({
        hasLoaded: false,
        motd: "",
        owner: "",
        date: "",
    });

    const loadMotd = async () => {
        let response = await getLatestMotd();

        if (response.status === 200) {
            let motd = response.data;

            setMotd((prevState) => {
                return {
                    ...prevState,
                    hasLoaded: true,
                    motd: motd.motd.data,
                    owner: motd.owner.username,
                    date: new Date(motd.motd.date).toLocaleString(),
                    dateUnix: motd.motd.date,
                };
            });
        } else {
            setMotd((prevState) => {
                return {
                    ...prevState,
                    hasLoaded: true,
                };
            });
        }
    };

    useEffect(() => {
        loadMotd();
    }, []);

    return (
        <>
            <Navigation
                user={<User />}
                breadcrumbs={[
                    {
                        name: <HomeOutlined />,
                        url: "/",
                    },
                ]}
            />

            <div className="container">
                <div className="home-container">
                    <h1 className="title">shog.dev</h1>

                    {motd.owner !== "" && motd.hasLoaded && (
                        <div className="motd-container">
                            <p className="motd-title">{motd.motd}</p>
                            <p className="motd-bottom">
                                {motd.date} by {motd.owner}
                                <br />
                                <Link to={`/history?selected=${motd.dateUnix}`}>
                                    View more
                                </Link>
                            </p>
                        </div>
                    )}

                    {motd.owner === "" && !motd.hasLoaded && (
                        <div className="motd-container">
                            <Skeleton
                                title={false}
                                paragraph={{ rows: 3, width: "12rem" }}
                            />
                        </div>
                    )}

                    {motd.hasLoaded && motd.owner === "" && (
                        <div className="motd-container">
                            <Alert
                                message="There was an issue loading that MOTD!"
                                type="error"
                            />
                        </div>
                    )}

                    <div className="links-container">
                        <p>
                            <a target="_blank" href="/discord">
                                discord
                            </a>
                            , <Link to="/projects">projects</Link>,{" "}
                            <Link to="/clock">clock</Link>,{" "}
                            <Link to="/blog">blog</Link>,{" "}
                            <Link to="/buta">buta</Link>.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
