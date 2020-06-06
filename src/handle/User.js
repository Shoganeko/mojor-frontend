import React from "react"
import {getSelf, signedIn} from "./AccountHandler";
import {Link} from "react-router-dom";
import {Button} from "antd";

export default class User extends React.Component {
    render() {
        if (signedIn()) {
            let self = getSelf()

            return (<div className="user-data-top-container">
                <Link to="/">{self.username}</Link>
            </div>)
        } else {
            return (<Button ghost>Login</Button>)
        }
    }
}
