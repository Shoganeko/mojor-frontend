import {authApi, base, api, getToken} from "./Api";
import Cookies from "universal-cookie"
import store from "../redux/store"

const cookies = new Cookies();

/**
 * Get local self data.
 * @returns {any}
 */
export const getSelf = () =>
    store.getState().auth.user;

/**
 * If user is signed in.
 * @returns {boolean}
 */
export const isSignedIn = () =>
    getToken() != null

/**
 * Get login attempts for self.
 * @param callback
 */
export const getAttempts = async () => {
    return await authApi.get(`/user/attempts`)
}

/**
 * Change username.
 * @param username
 * @param callback
 */
export const changeUsername = async (username) => {
    if (!isSignedIn())
        return false

    let response = await authApi.post(`/user/username`, { username })

    if (response.status === 200) {
        store.dispatch(changeUsername(username))

        return true
    } else return false
}

/**
 * Change password.
 * @param password
 * @param callback
 */
export const changePassword = async (password) => {
    if (!isSignedIn())
        return null

    let response = await authApi.post(`/user/password`, { password });

    if (response.status === 200) {
        store.dispatch(changePassword(password));

        return response;
    } else return null;
}

/**
 * Login
 * @param username
 * @param password
 * @param captcha
 * @param callback
 */
export const login = async (username, password, captcha) => {
    let form = new FormData()

    form.append("username", username)
    form.append("password", password)
    form.append("captcha", captcha)

    return await api.post("/user", form)
}
