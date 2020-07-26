import Cookies from "universal-cookie"
import {base} from "../../../handle/Api";
import store from "../../../redux/store"
import axios from "axios"
import { logOut, logIn } from "../../../redux/actions/buta.actions";
import history from "../../../handle/History"
import { alertError, alertInfo } from "../../../redux/actions/alert.actions";

/**
 * Get the authorization URL.
 */
export const url =
    "https://discord.com/api/oauth2/authorize?client_id=723287750668845086&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fbuta%2Fcallback&response_type=code&scope=guilds%20identify"


/**
 * Get the discord token.
 */
export const getDiscordToken = () =>
    store.getState().buta.token

/**
 * The API without authentication.
 */
export const api = axios.create({
    baseURL: base,
});

/**
 * The API with authentication.
 */
export const authApi = axios.create({
    baseURL: base,
    headers: {
        Authorization: `Bearer ${getDiscordToken()}`,
    },
});

/**
 * Checks if the user is logged in by checking if their token is null.
 */
export const isDiscordSignedIn = () => 
    store.getState().buta.isLoggedIn

/**
 * Sign
 */
export const signIn = async (token) => {
    let using = axios.create({
        baseURL: base,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    let request = await using.get("/buta/self")

    if (request.status !== 200) {
        history.push("/buta")
        store.dispatch(alertError("There was an issue with that token!"))
        return
    }

    let expire = new Date().getTime() + (1000 * 60 * 60 * 24 * 7)

    store.dispatch(logIn(token, request.data, expire))
}

/**
 * Sign out
 */
export const discordSignOut = () => {
    store.dispatch(logOut())
    store.dispatch(alertInfo("You have been signed out of Buta!"))
    history.push("/buta")
}

/**
 * Get a guild's roles by it's ID.
 * 
 * @param {string} id 
 */
export const getGuildRoles = async (id) => {
    return await authApi.get(`/buta/guild/roles?guild=${id}`)
}

/**
 * Get a guild by it's ID.
 * @param {string} id 
 */
export const getGuild = async (id) => {
    return await authApi.get(`/buta/guild?guild=${id}`);
}

/**
 * Get all available guilds to a user.
 */
export const getGuilds = async () => {
    return await authApi.get("/buta/guilds");
}

/**
 * Update a guild.
 * @param {*} id The guild's ID
 * @param {*} type The data type that you're modifying. 
 * @param {*} value The new value for that data type.
 */
export const updateGuild = async (id, type, value) => {
    let form = new FormData();

    form.append("guild", id)
    form.append("type", type)
    form.append("value", value)

    return await authApi.patch("/buta/guild", form)
}

/**
 * Get the self user.
 */
export const getDiscordSelf = async () => {
    if (!isDiscordSignedIn())
        return null

    return store.getState().buta.user
}