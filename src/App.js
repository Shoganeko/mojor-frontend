import React from "react";
import Home from "./view/Home/Home";
import { Route, Switch } from "react-router-dom";
import NotFound from "./view/NotFound";
import Projects from "./view/projects/Projects";
import Buta from "./view/projects/Buta";
import Mojor from "./view/projects/Mojor";
import Clock from "./view/Clock";
import Login from "./view/Login";
import MotdHistory from "./view/MotdHistory";
import Settings from "./view/Settings";
import Blog from "./view/blogs/Blog";
import AllBlogs from "./view/blogs/AllBlogs";
import { message } from "antd";
import styled from "styled-components";
import "./assets/default.scss";

import { useSelector, useDispatch } from "react-redux";
import { clearAlert } from "./redux/actions/alert.actions";

function App() {
    const alert = useSelector((state) => state.alert);
    let dispatch = useDispatch();

    if (alert.message) {
        switch (alert.type) {
            case "info":
                message.info(alert.message, 2);
                dispatch(clearAlert());
                break;

            case "success":
                message.success(alert.message, 2);
                dispatch(clearAlert());
                break;

            case "warning":
                message.warning(alert.message, 2);
                dispatch(clearAlert());
                break;

            case "error":
                message.error(alert.message, 2);
                dispatch(clearAlert());
                break;

            default:
                break;
        }
    }

    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/projects" component={Projects} />
            <Route path="/projects/buta" component={Buta} />
            <Route path="/projects/mojor" component={Mojor} />
            <Route path="/clock" component={Clock} />
            <Route path="/login" component={Login} />
            <Route path="/history" component={MotdHistory} />
            <Route path="/settings" component={Settings} />
            <Route path="/blog/:id" component={Blog} />
            <Route path="/blog" component={AllBlogs} />

            <Route
                exact
                path="/backend-down"
                component={() => (
                    <h1
                        style={{
                            textAlign: "center",
                            marginTop: "14rem",
                        }}
                    >
                        The backend is currently down.
                    </h1>
                )}
            />

            <Route
                path="/discord"
                component={() => {
                    window.location.replace("https://discord.gg/R8n3T2v");
                    return null;
                }}
            />

            <Route component={NotFound} />
        </Switch>
    );
}

export default App;
