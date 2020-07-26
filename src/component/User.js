import React from "react";
import { getSelf, isSignedIn } from "../handle/AccountHandler";
import { Link } from "react-router-dom";
import { Button } from "antd";

/**
 * The default top right icon that either shows your username or a login button.
 */
export default function User() {
    return (
        <>
            {isSignedIn() && (
                <div className="nav-user-data-container">
                    <Link to={`/settings`}>{getSelf().username}</Link>
                </div>
            )}

            {!isSignedIn() && (
                <Link to="/login">
                    <Button ghost>Login</Button>
                </Link>
            )}
        </>
    );
}
