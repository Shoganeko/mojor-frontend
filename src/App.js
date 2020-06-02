import React, {useState} from 'react';
import './assets/scss/base.scss';
import {getLatestMotd} from "./handle/MotdHandler";
import Home from "./pages/Home";
function App() {
    return (
        <Home/>
    );
}

export default App;
