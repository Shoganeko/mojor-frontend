import React, {useState} from 'react';
import './assets/scss/base.scss';
import {getLatestMotd} from "./handle/MotdHandler";
import Home from "./pages/Home";
import {Route, Switch, Redirect} from "react-router-dom";
import {NotFound} from "./pages/NotFound";
import Projects from "./pages/projects/Projects";
import Buta from "./pages/projects/Buta";
import Mojor from "./pages/projects/Mojor";
import Clock from "./pages/Clock";
import Login from "./pages/Login";
import MotdHistory from "./pages/MotdHistory";
function App() {
    return (
        <Switch>
            <Route exact path="/"> <Home /> </Route>
            <Route exact path="/projects"> <Projects/> </Route>
            <Route path="/projects/buta"> <Buta/> </Route>
            <Route path="/projects/mojor"> <Mojor/> </Route>
            <Route path="/clock"> <Clock/> </Route>
            <Route path="/login"> <Login/> </Route>

            <Route path="/history"> <MotdHistory/> </Route>

            <Route exact path="/backend-down" component={() => <h1>The backend is currently down.</h1>}/>

            <Route path='/discord' component={() => {
                window.location.replace('https://discord.gg/R8n3T2v');
                return null;
            }}/>
            <Route component={NotFound}/>
        </Switch>
    );
}

export default App;
