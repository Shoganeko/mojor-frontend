import React from "react";
import {getLatestMotd} from "../handle/MotdHandler";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            motd: "Loading...",
            owner: "Loading...",
            date: "Loading..."
        }
    }

    componentDidMount() {
        getLatestMotd((motd) => {
            this.setState({
                motd: motd.motd.data,
                owner: motd.owner.username,
                date: new Date(motd.motd.date).toLocaleString()
            })
        })
    }

    render() {
        console.log("Bruhj")
        return <div>
            <p>{this.state.motd}</p>
            <p>{this.state.owner}</p>
            <p>{this.state.date}</p>
        </div>
    }
}
