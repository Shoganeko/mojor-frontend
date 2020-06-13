import { useRouteMatch } from "react-router-dom"
import React from "react"

export default function Account() {
    const {
        params: { user }
    } = useRouteMatch()

    return (<AccountPage name={user} />)
}

class AccountPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
}
