import {base} from "./Api";
import Cookies from "universal-cookie"

const cookies = new Cookies();

export const getSelf = () =>
    JSON.parse(localStorage.getItem("selfData"))

export const signedIn = () =>
    cookies.get("token") != null

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
