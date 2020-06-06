import {base} from "./Api";

export const getLatestMotd = (callback) => {
    fetch(`${base}/motd/latest`)
        .then((resp) => {
            if (resp.ok) {
                resp.json().then((js) => callback(js))
            } else callback(null)
        })
        .catch(() => callback(null))
}

export const getMotds = (callback) => {
    fetch(`${base}/motd`)
        .then((resp) => {
            if (resp.ok) {
                resp.json().then((js) => callback(js))
            } else callback(null)
        })
        .catch(() => callback(null))
}
