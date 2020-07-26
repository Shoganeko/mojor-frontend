import React, { useEffect } from "react";
import { isDiscordSignedIn } from "./handle/ButaHandler";
import { url, signIn } from "./handle/ButaHandler";
import { Redirect } from "react-router-dom";
import { Spin } from "antd";
import queryString from "query-string";
import History from "../../handle/History";

/**
 * Handles login to Buta.
 */
export default function ButaLogin() {
    useEffect(() => {
        const logIn = async (token) => {
            await signIn(token);
            History.push("/buta/account");
        };

        let params = queryString.parse(window.location.search);

        if (!isDiscordSignedIn()) {
            if (params.token != null) {
                logIn(params.token);
            } else {
                window.location.replace(url);
                return null;
            }
        }
    }, []);

    if (isDiscordSignedIn()) return <Redirect to="/buta/account" />;

    return <Spin />;
}
