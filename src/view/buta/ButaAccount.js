import React, { useEffect, useState } from "react";
import { Skeleton, Tooltip, Button, Spin, Divider } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import DiscordUser from "./DiscordUser";
import {
    isDiscordSignedIn,
    getGuilds,
    url,
    discordSignOut,
    getDiscordSelf,
} from "./handle/ButaHandler";
import {
    MailOutlined,
    SettingOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import "../../assets/scss/pages/buta/buta_account.scss";
import history from "../../handle/History";
import Navigation from "../../component/Navigation";
import { useDispatch } from "react-redux";
import { alertError } from "../../redux/actions/alert.actions";

/**
 * The list of different discord servers to modify.
 */
export default function ButaAccount() {
    let [guilds, setGuilds] = useState({
        hasSet: false,
        data: [],
    });

    let [self, setSelf] = useState({});

    let dispatch = useDispatch()

    useEffect(() => {
        if (!isDiscordSignedIn()) {
            history.push("/buta/login");
            return
        }

        const loadSelf = async () => {
            let selfData = await getDiscordSelf();

            setSelf(selfData);
        };

        const loadGuilds = async () => {
            let data = await getGuilds();

            if (data.status !== 200) {
                history.push("/")
                dispatch(alertError("There was an issue retrieving guilds."))
                return
            }

            setGuilds((prevState) => {
                return {
                    ...prevState,
                    hasSet: true,
                    data: data.data,
                };
            });
        };

        loadGuilds().catch(() => {});
        loadSelf().catch(() => {});
    }, []);

    const getInvite = (id) => {
        if (id == null || id === "" || typeof id == undefined) {
            return (
                "https://discord.com/api/oauth2/authorize" +
                "?client_id=723287750668845086" +
                "&permissions=8" +
                "&scope=bot"
            );
        }

        return (
            "https://discord.com/api/oauth2/authorize" +
            "?client_id=723287750668845086" +
            "&permissions=8" +
            "&scope=bot" +
            "&guild_id=" +
            id
        );
    };

    const goGuild = (id) => {
        history.push(`/buta/account/${id}`, ``);
    };

    const signOut = () => {
        history.push(`/buta`);
        discordSignOut();
    };

    return (
        <>
            <Navigation
                user={<DiscordUser />}
                breadcrumbs={[
                    {
                        name: <HomeOutlined />,
                        url: "/",
                    },
                    {
                        name: "Buta",
                        url: "/buta",
                    },
                    {
                        name: "Account",
                        url: "/buta/account",
                    },
                ]}
            />

            <div className="container">
                <div className="buta-title-container">
                    {self.username && <h1>Welcome back, {self.username}.</h1>}

                    {!self.username && <Spin icon={<LoadingOutlined />} />}

                    <h2>Manage your Discord servers</h2>
                </div>

                <div className="server-list-container">
                    {!guilds.hasSet && (
                        <Skeleton
                            active
                            title={false}
                            paragraph={{ rows: 6, width: "18rem" }}
                        />
                    )}

                    {guilds.hasSet &&
                        guilds.data.length !== 0 &&
                        guilds.data.map((guild, index) => (
                            <>
                                <div className="server-container" key={index}>
                                    <h2>{guild.name}</h2>

                                    <div className="server-icon">
                                        {guild.butaIn ? (
                                            <Tooltip title="Manage Buta settings in this server.">
                                                <SettingOutlined
                                                    onClick={() =>
                                                        goGuild(guild.id)
                                                    }
                                                />
                                            </Tooltip>
                                        ) : (
                                            <Tooltip title="Invite Buta to this server.">
                                                <MailOutlined
                                                    onClick={() =>
                                                        window.location.replace(
                                                            getInvite(guild.id)
                                                        )
                                                    }
                                                />
                                            </Tooltip>
                                        )}
                                    </div>
                                </div>
                            </>
                        ))}

                    {guilds.hasSet && guilds.data.length === 0 && (
                        <div>
                            <h3>
                                Buta isn't in any of your servers, you may want
                                to <a href={url}>invite</a> him!
                            </h3>
                        </div>
                    )}
                </div>

                <div>
                    <Button type="link" onClick={signOut}>
                        Sign Out
                    </Button>
                </div>
            </div>
        </>
    );
}
