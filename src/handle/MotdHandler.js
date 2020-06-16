import {base} from "./Api";

/**
 * Get the latest MOTD
 * @param callback
 */
export const getLatestMotd = (callback) => {
    fetch(`${base}/motd/latest`)
        .then((resp) => {
            if (resp.ok) {
                resp.json().then((js) => callback(js))
            } else callback(null)
        })
        .catch(() => callback(null))
}

/**
 * Get all MOTDs
 * @param callback
 */
export const getMotds = (callback) => {
    fetch(`${base}/motd`)
        .then((resp) => {
            if (resp.ok) {
                resp.json().then((js) => callback(js))
            } else callback(null)
        })
        .catch(() => callback(null))
}
