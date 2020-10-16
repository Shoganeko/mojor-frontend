import { useState } from "react"

type RequestStatus = {
    complete: boolean
    error: boolean
    statusString: string
}

const useStatus = (): [boolean, boolean, string, (reqStatus: (previous: RequestStatus) => RequestStatus) => void] => {
    const [status, setStatus] = useState({
        complete: false,
        error: false,
        statusString: ""
    })

    const { complete, error, statusString } = status

    return [
        complete,
        error,
        statusString,
        (reqStatus: (previous: RequestStatus) => RequestStatus) => { 
            setStatus(reqStatus(status))
        }
    ]
}

export default useStatus