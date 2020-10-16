import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components"

const NavContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 16px;

    .nav-user-data-container {
        a {
            color: $text-color;

            &:hover {
                text-decoration: underline;
            }
        }
    }
`;

type Props = {
    breadcrumbs: any[]
    user: any
}

/**
 * The top left navigation breadcrumbs.
 * 
 * @param {*} props 
 */
export default ({ breadcrumbs, user }: Props) => {
    return (
        <NavContainer>
            <Breadcrumb>
                {breadcrumbs.map((crumb, index) => (
                    <Breadcrumb.Item key={index}>
                        <Link to={crumb.url}>{crumb.name}</Link>
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>

            {user}
        </NavContainer>
    );
}
