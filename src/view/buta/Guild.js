import React, { useEffect, useState } from "react";
import {
    getGuild,
    getGuildRoles,
    getGuilds,
    signIn,
    updateGuild,
} from "./handle/ButaHandler";
import { Avatar, Skeleton, Divider, Switch, Tabs } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import DiscordUser from "./DiscordUser";
import { useRouteMatch } from "react-router-dom";
import { message, Typography } from "antd";
import Navigation from "../../component/Navigation";
import AutoFillRole from "./handle/AutoFillRole";

import "../../assets/scss/pages/buta/modify_guild.scss";
import { useDispatch } from "react-redux";
import { alertError } from "../../redux/actions/alert.actions";

import history from "../../handle/History";

const { Paragraph } = Typography;
const { TabPane } = Tabs;

/**
 * TODO increase size of title
 * @returns {*}
 * @constructor
 */
export default function Guild() {
    const {
        params: { guild },
    } = useRouteMatch();

    let dispatch = useDispatch();

    let [prefix, setPrefix] = useState("");
    let [swearFilter, setSwearFilter] = useState(undefined);
    let [swearFilterMsg, setSwearFilterMsg] = useState("");
    let [joinRole, setJoinRole] = useState({
        name: "",
        id: "",
        color: {
            r: -1,
            g: -1,
            b: -1,
        },
    });

    let [roles, setRoles] = useState([]);
    let [buta, setButa] = useState({});
    let [discord, setDiscord] = useState({
        name: "",
        imageUrl: "",
    });

    /**
     * Checke
     * @param checked
     */
    const swearFilterChecked = (checked) => {
        let toggleStr = checked ? "on" : "off"

        message.success(`The swear filter is now ${toggleStr}!`);

        updateGuild(guild, "swear_filter_on", checked);

        setSwearFilter(checked);
    };

    /**
     * Update the prefix.
     * @param {*} prefix
     */
    const updatePrefix = (pre) => {
        if (pre === prefix) return;

        if (pre.length === 0 || pre.length > 6) {
            message.error("The message length must be above 0 and below 6!");
        } else {
            setPrefix(pre);

            updateGuild(guild, "prefix", pre);

            message.success("The prefix has been updated!");
        }
    };

    /**
     * Update the swear filter message.
     * @param {*} msg
     */
    const updateSwearFilterMsg = (msg) => {
        if (msg.length === 0 || msg.length > 128) {
            message.error("The message length must be above 0 and below 128!");
        } else {
            setSwearFilterMsg(msg);
            message.success("The swear filter message has been updated!");
        }
    };

    /**
     * Load data.
     * @param id
     * @returns {Promise<void>}
     */
    const loadData = async (id) => {
        let request = await getGuild(id);

        if (request.status !== 200) {
            dispatch(alertError("There was an issue loading that guild!"));
            history.push("/buta");
            return;
        }

        let response = request.data;

        setPrefix(response.butaGuild.prefix);

        setButa(response.butaGuild);
        setDiscord(response.discordGuild);
        setSwearFilterMsg(response.butaGuild.swearFilterMsg);
        setSwearFilter(response.butaGuild.swearFilterOn);

        await loadRoles(id, response.butaGuild.joinRole);
    };

    /**
     * Update the join role.
     */
    const updateRole = async (role) => {
        for (let i = 0; roles.length > i; i++) {
            let roleObj = roles[i];

            if (role === roleObj.name) {
                message.success("The join role is now " + roleObj.name + "!");

                setJoinRole((prev) => {
                    return {
                        ...prev,
                        name: roleObj.name,
                        id: roleObj.id,
                        color: {
                            r: roleObj.color.red,
                            g: roleObj.color.green,
                            b: roleObj.color.blue,
                        },
                    };
                });

                await updateGuild(guild, "join_role", roleObj.id);

                return;
            }
        }

        message.error("There isn't a role with that name!");
    };

    const loadRoles = async (id, joinRoleId) => {
        let response = await getGuildRoles(id);
        setRoles(response);

        for (let i = 0; response.length > i; i++) {
            let role = response[i];

            if (role.id === joinRoleId) {
                setJoinRole((prev) => {
                    return {
                        ...prev,
                        name: role.name,
                        id: role.id,
                        color: {
                            r: role.color.red,
                            g: role.color.green,
                            b: role.color.blue,
                        },
                    };
                });

                return;
            }
        }

        setJoinRole((prev) => {
            return { ...prev, id: "-1" };
        }); // to let ui know that it doesn't exist
    };

    useEffect(() => {
        loadData(guild).catch(() => {}); // TODO

        return () => {};
    }, [guild]);

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
                    {
                        name: discord.name,
                        url: `/buta/account/${guild}`,
                    },
                ]}
            />

            <div className="container">
                <div className="server-modify-title">
                    <h1>
                        {discord.name !== "" && discord.imageUrl !== "" && (
                            <>
                                <Avatar
                                    src={discord.imageUrl === ""}
                                    size={38}
                                />{" "}
                                {discord.name}
                            </>
                        )}

                        {(discord.name === "" || discord.imageUrl === "") && (
                            <Skeleton
                                title={{ width: "14rem" }}
                                paragraph={{ rows: 0 }}
                                avatar
                            />
                        )}
                    </h1>
                </div>

                <div className="server-modify-container">
                    <Tabs defaultActiveKey="1" onChange={() => {}}>
                        <TabPane tab="Prefix" key="1">
                            {prefix === "" && (
                                <Skeleton
                                    paragraph={{ rows: 1, width: "10rem" }}
                                />
                            )}

                            {prefix !== "" && (
                                <>
                                    This is what you put infront of a command to
                                    let Buta know it's a command. Make sure this
                                    doesn't collide with any other bots.
                                    <br />
                                    <br />
                                    Your current prefix:
                                    <Paragraph
                                        editable={{ onChange: updatePrefix }}
                                    >
                                        {prefix}
                                    </Paragraph>
                                </>
                            )}
                        </TabPane>
                        <TabPane tab="Swear Filter" key="2">
                            {swearFilterMsg !== "" && (
                                <>
                                    <div className="swear-filter-control">
                                        We do not ensure the swear filter to be
                                        perfect, however it should catch the
                                        most basic of curses. If there is
                                        something missed, or if there's
                                        something that it should not be blocking
                                        please message us.
                                        <div className="swear-filter-toggle swear-filter-child">
                                            <h2>Swear Filter</h2>
                                            <Switch
                                                checked={swearFilter}
                                                checkedChildren="On"
                                                unCheckedChildren="Off"
                                                onChange={swearFilterChecked}
                                            />
                                        </div>
                                        <div className="swear-filter-message swear-filter-child">
                                            <h2>Swear Filter Message</h2>
                                            <p>
                                                The message can be formatted
                                                with a few different things to
                                                make it more dynamic per-person.{" "}
                                                <code>{"{user}"}</code> will be
                                                replaced with the user's name,
                                                <code>
                                                    {"{guild-name}"}
                                                </code>{" "}
                                                will be replaced with the
                                                guild's name, and{" "}
                                                <code>{"{guild-size}"}</code>{" "}
                                                will be replaced with the
                                                guild's size.
                                            </p>

                                            <div className="swear-filter-input">
                                                <h4>Current Message</h4>
                                                <Paragraph
                                                    editable={{
                                                        onChange: updateSwearFilterMsg,
                                                    }}
                                                >
                                                    {swearFilterMsg}
                                                </Paragraph>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {swearFilterMsg === "" && (
                                <>
                                    <Skeleton title={{ width: "14rem" }} />
                                    <Skeleton
                                        paragraph={{ rows: 2, width: "14rem" }}
                                    />
                                    <Skeleton
                                        paragraph={{ rows: 2, width: "14rem" }}
                                    />
                                </>
                            )}
                        </TabPane>
                        <TabPane tab="Join Role" key="4">
                            {joinRole.id === "" && (
                                <Skeleton
                                    input
                                    paragraph={{ width: "14rem", rows: 1 }}
                                />
                            )}
                            {joinRole.id === "-1" && (
                                <>
                                    <p>
                                        There's currently not a join role set.
                                    </p>
                                    <AutoFillRole
                                        roles={roles}
                                        onFinish={updateRole}
                                    />
                                </>
                            )}
                            {joinRole.id !== "-1" && joinRole.id !== "" && (
                                <>
                                    <p>
                                        The join role is currently set to{" "}
                                        <span
                                            style={{
                                                color: `rgb(${joinRole.color.r}, ${joinRole.color.g}, ${joinRole.color.b})`,
                                            }}
                                        >
                                            {joinRole.name}
                                        </span>
                                        .
                                    </p>
                                    <AutoFillRole
                                        roles={roles}
                                        onFinish={updateRole}
                                    />
                                </>
                            )}
                            {joinRole.id !== "" && (
                                <>
                                    <Divider />
                                    If a role doesn't show up, or doesn't allow
                                    you to set it, make sure:
                                    <ul>
                                        <li>
                                            Buta has permission to view roles
                                            (MANAGE_ROLES)
                                        </li>
                                        <li>
                                            Buta's role is above the role you're
                                            trying to set
                                        </li>
                                    </ul>
                                </>
                            )}
                            {joinRole.id === "" && (
                                <>
                                    <Divider />
                                    <Skeleton
                                        paragraph={{ width: "14rem", rows: 4 }}
                                    />
                                </>
                            )}
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </>
    );
}
