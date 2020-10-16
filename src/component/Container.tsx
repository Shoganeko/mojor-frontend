import styled from "styled-components"

export default styled.div`
    margin-top: 12rem;

    display: flex;
    flex-direction: column;
    align-items: center;

    a {
        color: rgba(255, 255, 255, 0.75);

        &:hover {
            color: gray;
        }
    }

    @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
        margin-top: 2rem;
    }
`;