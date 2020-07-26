import React from "react"
import {Breadcrumb, Button} from "antd";
import {HomeOutlined, SettingOutlined} from "@ant-design/icons";
import "../assets/scss/pages/notfound.scss"
import User from "../component/User";
import Navigation from "../component/Navigation";

export const NotFound = () => {
    return (<>
        <Navigation user={<User/>} breadcrumbs={[
            {
                name: <HomeOutlined/>,
                url: "/"
            },
            {
                name: "404",
                url: ""
            }
        ]}/>

        <div className="not-found-container">
            <h1>That page could not be found!</h1>
        </div>
    </>);
}

export default NotFound