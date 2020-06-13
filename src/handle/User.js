import React from "react"
import {getSelf, signedIn} from "./AccountHandler";
import {Link} from "react-router-dom";
import {Button} from "antd";

export default class User extends React.Component {
    render() {
        if (signedIn()) {
            let self = getSelf()

            return (<div className="nav-user-data-container">
                <Link to={`/settings`}>{self.username}</Link>
            </div>)
        } else {
            return (<Button href="/login" ghost>Login</Button>)
        }
    }
}
