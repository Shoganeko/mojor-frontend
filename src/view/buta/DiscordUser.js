import React, { useEffect, useState } from "react";
import { getSelf, signedIn } from "../../handle/AccountHandler";
import { Link } from "react-router-dom";
import { Skeleton } from "antd";
import { isDiscordSignedIn, getDiscordSelf, signIn } from "./handle/ButaHandler";

/**
 * The top right view of a Discord user.
 */
export default function DiscordUser() {
    let [data, setData] = useState({
        name: "",
        discriminator: "",
    });

    const loadSelf = async () => {
        let self = await getDiscordSelf();

        if (self != null) {
            setData((prevState) => {
                return {
                    ...prevState,
                    name: self.username,
                    discriminator: self.discriminator,
                };
            });
        }
    };

    useEffect(() => {
        loadSelf().catch(() => {});
    }, []);

    return (
        <>
            {isDiscordSignedIn() && (
                <div className="nav-user-data-container">
                    {data.discriminator === "" && (
                        <Skeleton
                            active
                            title={{ width: "8rem" }}
                            paragraph={{ rows: 0 }}
                        />
                    )}

                    {data.discriminator !== "" && (
                        <Link to={`/buta/account`}>
                            {data.name}#{data.discriminator}
                        </Link>
                    )}
                </div>
            )}

            {!isDiscordSignedIn() && (
                <div className="nav-user-data-container">
                    <Link to={`/buta/login`}>Login using Discord</Link>
                </div>
            )}
        </>
    );
}
