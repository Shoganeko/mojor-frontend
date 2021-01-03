import React from "react";
import { Link } from "react-router-dom";
import { ProjectLinks } from "../Projects";

export default function Buta() {
    return (
        <>
            <h1>Buta</h1>

            <div>
                <h3>What is Buta?</h3>
                <p>
                    Buta is a Discord bot that assists a server with extra
                    utilities and enjoyable games.
                </p>

                <h3>Why should I use Buta?</h3>
                <p>
                    Buta's vast amount of commands as well as it's simple online
                    dashboard can assist your server quickly and simply.
                </p>

                <h3>How can I get Buta?</h3>
                <p>
                    You can invite Buta to your server{" "}
                    <Link to="/discord/buta">here</Link>.
                </p>

                <ProjectLinks>
                    <li>
                        <a href="https://github.com/shoganeko/buta">GitHub</a>
                    </li>
                    <li>
                        <Link to="/discord/buta">Invite</Link>
                    </li>
                    <li>
                        <Link to="/buta">Dashboard</Link>
                    </li>
                </ProjectLinks>
            </div>
        </>
    );
}
