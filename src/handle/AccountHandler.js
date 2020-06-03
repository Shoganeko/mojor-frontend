import {base} from "./Api";

export const login = (username, password, callback) => {
    let form = new FormData()

    form.append("username", username)
    form.append("password", password)

    fetch(`${base}/v1/user`, {
        method: 'POST'
    })
        .then((resp) => {
            if (resp.ok) {
                resp.text()
                    .then((text) => callback(text))
            } else callback(null)
        })
        .catch(() => callback(null))
}
