import React from "react"
import {Breadcrumb, Button} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import "../assets/scss/pages/notfound.scss"
import User from "../handle/User";

export const NotFound = () => {
    return (<>
        <div className="nav-container">
            <Breadcrumb>
                <Breadcrumb.Item href="/"> <HomeOutlined /> </Breadcrumb.Item>
                <Breadcrumb.Item> 404 </Breadcrumb.Item>
            </Breadcrumb>

            <User/>
        </div>
        <div className="not-found-container">
            <h1>That page could not be found!</h1>
        </div>
    </>);
}
