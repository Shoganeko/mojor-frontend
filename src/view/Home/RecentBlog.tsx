import React from "react"
import styled from "styled-components"

const Container = styled.div`
    margin-top: 1rem;

    a {
        text-transform: uppercase;
        text-decoration: underline;
    }
`

export default () => {
    return <Container>
        <a>View the most recent blog</a>
    </Container>
}