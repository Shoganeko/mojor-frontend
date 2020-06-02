const base = "http://localhost:8080"

export const getLatestMotd = (callback) => {
    fetch(`${base}/motd/latest`)
        .then((resp) => {
            if (resp.ok) {
                console.log("GO AGANE")
                resp.text()
                    .then((body) => callback(JSON.parse(body)))
            } else callback(null)
        })
        .catch(() => callback(null))
}