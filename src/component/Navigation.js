import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

/**
 * The top left navigation breadcrumbs.
 * 
 * @param {*} props 
 */
export default function Navigation(props) {
    return (
        <div className="nav-container">
            <Breadcrumb>
                {props.breadcrumbs.map((crumb, index) => (
                    <Breadcrumb.Item key={index}>
                        <Link to={crumb.url}>{crumb.name}</Link>
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>

            {props.user}
        </div>
    );
}
