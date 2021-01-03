import React from "react";
import { ProjectLinks } from "../Projects";

export default () => {
    return (
        <>
            <h1>Unifey</h1>
            <div>
                <h3>What is Unifey?</h3>
                <p>
                    Unifey is an open-source social media platform, similar to
                    sites such as Reddit.
                </p>

                <h3>What is Unifey made in?</h3>
                <p>
                    Similarly to Mojor, it's made in ReactJS and Ktor (Kotlin)
                </p>

                <h3>Who else is working on Unifey?</h3>
                <p>You can view the people working on Unifey in the Discord.</p>

                <h3>When will Unifey be complete?</h3>
                <p>No idea.</p>

                <ProjectLinks>
                    <li>
                        <a href="https://github.com/unifey-net">
                            Unifey GitHub
                        </a>
                    </li>
                    <li>
                        <a href="https://discord.gg/2rfryZH">Discord</a>
                    </li>
                </ProjectLinks>
            </div>
        </>
    );
}
