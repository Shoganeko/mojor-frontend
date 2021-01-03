import React from "react"
import { Link } from "react-router-dom";
import styled from "styled-components"

const Footer = styled.div`
    font-size: 12px;
    font-family: monospace, "Roboto Mono";
    text-transform: uppercase;
    position: absolute;
    bottom: 0;
    width: 100%;
    margin-top: 3rem;
    height: 5rem;
    text-align: center;
`;

export default () => {
    return (
        <Footer>
            <p>shog.dev ©{new Date().getFullYear()} <Link to="/privacy">Privacy</Link></p>
        </Footer>
    );
}