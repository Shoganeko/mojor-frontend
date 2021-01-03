import React from "react";
import Home from "./view/Home/Home";
import { Route, Switch } from "react-router-dom";
import NotFound from "./view/NotFound";
import Projects from "./view/projects/Projects";
import Buta from "./view/projects/specific/Buta";
import Mojor from "./view/projects/specific/Mojor";
import Clock from "./view/Clock";
import Login from "./view/Login";
import MotdHistory from "./view/MotdHistory";
import Settings from "./view/Settings/Settings";
import Blog from "./view/blogs/Blog";
import AllBlogs from "./view/blogs/AllBlogs";
import "./assets/default.scss";

import { useSelector, useDispatch } from "react-redux";
import Footer from "./component/Footer";
import styled from "styled-components";
import { Toaster } from "react-hot-toast";
import SpecificProject from "./view/projects/SpecificProject";

const MainContainer = styled.div`
    min-height: 100vh;
    position: relative;
`;

const ContentContainer = styled.div`
    padding-bottom: 8rem;
`

export default () => {
    return (
        <MainContainer>
            <Toaster />

            <ContentContainer>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/projects" component={Projects} />
                    <Route exact path="/projects/:project" component={SpecificProject} />
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
                            window.location.replace(
                                "https://discord.gg/R8n3T2v"
                            );
                            return null;
                        }}
                    />

                    <Route component={NotFound} />
                </Switch>
            </ContentContainer>

            <Footer />
        </MainContainer>
    );
};
