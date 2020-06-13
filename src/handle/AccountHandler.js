import {base} from "./Api";
import Cookies from "universal-cookie"

const cookies = new Cookies();

export const getSelf = () =>
    JSON.parse(localStorage.getItem("selfData"))

export const signedIn = () =>
    cookies.get("token") != null

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
                        cookies.set("token", json.payload.token.token, {
                            path: '/',
                            sameSite: 'Strict'
                        })

                        localStorage.setItem("selfData", JSON.stringify(json.payload.user))

                        callback(json.payload)
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
