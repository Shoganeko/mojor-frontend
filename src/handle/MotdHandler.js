import { api } from "./Api";

/**
 * Get the latest MOTD>
 */
export const getLatestMotd = async () => {
    return await api.get(`/motd/latest`)
}

/**
 * Get all MOTDs.
 */
export const getMotds = async () => {
    return await api.get(`/motd`)
}
