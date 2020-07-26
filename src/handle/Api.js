import axios from "axios";
import { getToken } from "./AccountHandler"

export const base = "http://localhost:8080"

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
        Authorization: `bearer ${getToken()}`
    }
})
