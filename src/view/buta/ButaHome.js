import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import DiscordUser from "./DiscordUser";
import { Link } from "react-router-dom";
import { Divider } from "antd";
import Navigation from "../../component/Navigation";

import "../../assets/scss/pages/buta/home.scss";

export default function ButaHome() {
  return (
    <>
      <Navigation
        user={<DiscordUser />}
        breadcrumbs={[
          {
            name: <HomeOutlined />,
            url: "/",
          },
          {
            name: "Buta",
            url: "/buta",
          },
        ]}
      />

      <div className="container">
        <div className="buta-home-container">
          <h1 className="title">Buta</h1>

          <div className="buta-features">
            <div className="feature">
              <h3>Moderation</h3>
              <span>
                Buta includes multiple utilities to assist you and your staff
                team with moderation.
              </span>
            </div>

            <Divider />

            <div className="feature">
              <h3>Games</h3>
              <span>
                Buta comes with games such as Uno to assure you your members
                won't get bored.
              </span>
            </div>
          </div>

          <Divider/>

          <div className="buta-details">
            <h2>Ready to get started?</h2>
            <p>
              Get started <Link to="/buta/account">here</Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
