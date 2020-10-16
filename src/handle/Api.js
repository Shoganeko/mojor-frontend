import axios from "axios";
import { logOut } from "../redux/actions/auth.actions";
import store from "../redux/store";

export const base = "http://localhost:8080"

/**
 * The API without authentication.
 */
export const api = axios.create({
    baseURL: base,
    validateStatus: () => true
});

/**
 * Get local token.
 * @returns {*}
 */
export const getToken = () => {
    let token = store.getState().auth.token

    if (isTokenExpired()) {
        store.dispatch(logOut())
        return null
    }

    return token !== "" ? token : null
}

/**
 * If the currently logged in token is expired.
 */
export const isTokenExpired = () =>
    store.getState().auth.expire !== -1 && new Date().getTime() >= store.getState().auth.expire

/**
 * The API with authentication.
 */
export const authApi = axios.create({
    baseURL: base,
    headers: {
        Authorization: `bearer ${getToken()}`,
    },
    validateStatus: () => true,
});
