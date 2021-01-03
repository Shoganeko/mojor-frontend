import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { getLatestMotd } from "../../handle/MotdHandler";
import styled from "styled-components"
import { Alert, Skeleton } from "antd";

const MotdContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: -3.5rem;
`;

const Title = styled.h1`
    color: rgb(146, 167, 204);
    font-size: 20px;
    font-weight: 300;
    margin-bottom: 0;
`;

const ViewMore = styled.div`
    a {
        font-size: 9px;
    }
`;

const Footer = styled.p`
    font-family: "Roboto Mono", monospace;
    font-size: 10px;
    text-transform: uppercase;
`;

export default () => {
    const [status, setStatus ] = useState({
        loaded: false,
        error: false,
        status: ""
    })

    let [motd, setMotd] = useState({
        motd: "",
        owner: "",
        date: "",
        dateUnix: -1
    });

    const loadMotd = async () => {
        try {
            let response = await getLatestMotd();

            if (response.status === 200) {
                let motd = response.data;

                setStatus((prev) => ({ ...prev, loaded: true }));

                setMotd({
                    motd: motd.motd.data,
                    owner: motd.owner.username,
                    date: new Date(motd.motd.date).toLocaleString(),
                    dateUnix: motd.motd.date,
                });
            } else {
                setStatus((prev) => ({
                    ...prev,
                    loaded: true,
                    error: true,
                    status: "Server error.",
                }));
            }
        } catch (ex) {
            setStatus(() => ({
                error: true,
                loaded: true,
                status: "Failed to load."
            }))

            return
        }
    };

    useEffect(() => {
        loadMotd();
    }, []);

    return (
        <>
            {!status.error && status.loaded && (
                <MotdContainer>
                    <Title>{motd.motd}</Title>

                    <Footer>
                        {motd.date} by {motd.owner}
                        <br />
                        <ViewMore>
                            <Link to={`/history?selected=${motd.dateUnix}`}>
                                View more
                            </Link>
                        </ViewMore>
                    </Footer>
                </MotdContainer>
            )}

            {!status.loaded && !status.error && (
                <MotdContainer>
                    <Skeleton
                        title={false}
                        paragraph={{ rows: 3, width: "12rem" }}
                    />
                </MotdContainer>
            )}

            {status.loaded && status.error && (
                <MotdContainer>
                    <Alert
                        message="There was an issue loading the MOTD."
                        description={status.status}
                        type="error"
                    />
                </MotdContainer>
            )}
        </>
    );
}