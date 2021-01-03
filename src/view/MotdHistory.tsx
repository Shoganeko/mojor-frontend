import React, {useEffect, useState} from "react";
import {getMotds} from "../handle/MotdHandler";
import {Skeleton} from "antd";
import {Link} from "react-router-dom";
import {HistoryOutlined, HomeOutlined} from "@ant-design/icons"
import User from "../component/User";
import Navigation from "../component/Navigation";
import Container from "../component/Container";
import styled from "styled-components";

const MotdHistoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const MotdHistory = styled.div`
    background-color: #161616;
    padding: 24px;
    border-radius: 4px;
`;

const MotdHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export default () => {
    let [selected, setSelected] = useState(0)
    let [motds, setMotds] = useState([] as any)

    const loadMotds = async () => {
        let motds = await getMotds()
        
        setMotds(motds.data)
    }

    useEffect(() => {
        loadMotds().catch(() => {})

        let urlSelected = new URLSearchParams(window.location.search).get("selected")

        if (urlSelected != null)
            setSelected(+urlSelected)
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
                        name: <HistoryOutlined />,
                        url: "/history",
                    },
                ]}
            />

            <Container>
                <h1>MOTD History</h1>

                <MotdHistoryContainer>
                    {motds.length === 0 && (
                        <>
                            <Skeleton
                                active
                                title={{ width: "14rem" }}
                                paragraph={{ rows: 2 }}
                            />
                            <Skeleton
                                active
                                title={{ width: "14rem" }}
                                paragraph={{ rows: 2 }}
                            />
                            <Skeleton
                                active
                                title={{ width: "14rem" }}
                                paragraph={{ rows: 2 }}
                            />
                        </>
                    )}
                    {motds.length > 0 &&
                        motds.map((motd: any, index: number) => {
                            return (
                                <MotdHistory
                                    key={index}
                                >
                                    <MotdHeader>
                                        <div>
                                            <h2>{motd.motd.data}</h2>
                                        </div>
                                    </MotdHeader>

                                    <p>
                                        by{" "}
                                        {
                                            <Link
                                                to={`/@${motd.owner.username}`}
                                            >
                                                {motd.owner.username}
                                            </Link>
                                        }{" "}
                                        on{" "}
                                        {new Date(
                                            motd.motd.date
                                        ).toLocaleString()}
                                    </p>
                                </MotdHistory>
                            );
                        })}
                </MotdHistoryContainer>
            </Container>
        </>
    );
}
