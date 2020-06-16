import {base} from "./Api";
import Cookies from "universal-cookie"

const cookies = new Cookies();

/**
 * Get local self data.
 * @returns {any}
 */
export const getSelf = () =>
    JSON.parse(localStorage.getItem("selfData"))

/**
 * If user is signed in.
 * @returns {boolean}
 */
export const signedIn = () =>
    getToken() != null

/**
 * Get login attempts for self.
 * @param callback
 */
export const getAttempts = (callback) => {
    fetch(`${base}/user/attempts`, {
        method: 'GET',
        headers: {
            "Authorization": `bearer ${cookies.get("token")}`
        }
    }).then((result) => {
        result.json()
            .then((json) => callback(json))
    })
        .catch(() => callback(null))
}

/**
 * Change username.
 * @param username
 * @param callback
 */
export const changeUsername = (username, callback) => {
    let form = new FormData()

    form.append("username", username)

    fetch(`${base}/user/username`, {
        method: 'POST',
        body: form,
        headers: {
            "Authorization": `bearer ${cookies.get("token")}`
        }
    })
        .then((result) => {
            if (result.ok) {

                let self = getSelf()
                self.username = username

                localStorage.setItem("selfData", JSON.stringify(self))

                callback(true)
            } else callback(false)
        })
        .catch(() => callback(false))
}

/**
 * Change password.
 * @param password
 * @param callback
 */
export const changePassword = (password, callback) => {
    let form = new FormData()

    form.append("password", password)

    fetch(`${base}/user/password`, {
        method: 'POST',
        body: form,
        headers: {
            "Authorization": `bearer ${cookies.get("token")}`
        }
    })
        .then((result) => callback(result.ok))
        .catch(() => callback(false))
}

/**
 * Get local token.
 * @returns {*}
 */
export const getToken = () =>
    cookies.get("token")

/**
 * Login
 * @param username
 * @param password
 * @param captcha
 * @param callback
 */
export const login = (username, password, captcha, callback) => {
    console.log(`Signing in using ${username}...`)

    let form = new FormData()

    form.append("username", username)
    form.append("password", password)
    form.append("captcha", captcha)

    fetch(`${base}/user`, {
        method: 'POST',
        body: form
    })
        .then((resp) => {
            if (resp.ok) {
                console.log(`Sign in successful!`)

                resp.json()
                    .then((json) => {
                        cookies.set("token", json.token.token, {
                            path: '/',
                            sameSite: 'Strict'
                        })

                        localStorage.setItem("selfData", JSON.stringify(json.user))

                        callback(json)
                    })
            } else {
                console.log(`Sign in unsuccessful!`)
                callback(null)
            }
        })
        .catch(() => {
            console.log("Sign in unsuccessful!")
            callback(null)
        })
}
