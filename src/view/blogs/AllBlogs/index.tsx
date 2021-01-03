import React, { useEffect, useState } from "react";
import { Button, Spin, Empty, Alert } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import User from "../../../component/User";
import { getSelf } from "../../../handle/AccountHandler";
import PlusCircleOutlined from "@ant-design/icons/lib/icons/PlusCircleOutlined";
import { getBlogs } from "../../../handle/BlogHandler";
import Navigation from "../../../component/Navigation";
import { BlogResponse } from "../BlogData";
import useStatus from "../../../handle/RequestUtil";
import Container from "../../../component/Container";
import Blog from "./Blog";

/**
 * The main list of all blogs.
 */
export default () => {
    const [complete, error, status, setStatus] = useStatus();
    const [blogs, setBlogs] = useState([] as BlogResponse[]);

    useEffect(() => {
        const loadBlogs = async () => {
            let response = await getBlogs();

            if (response.status !== 200) {
                setStatus((prev) => ({
                    ...prev,
                    error: true,
                    status: response.data.payload,
                }));
                return;
            }

            let blogs = response.data;

            let blogArray = [];

            for (let i = 0; blogs.length > i; i++) {
                let obj = blogs[i];

                blogArray.push(obj);
            }

            blogArray.sort((a, b) => {
                return a.date - b.date;
            });

            setBlogs(blogArray);

            setStatus((prev) => ({
                ...prev,
                complete: true,
            }));
        };

        loadBlogs();
    }, []);

    const getVisibility = () => {
        let self = getSelf();

        return self != null && self.permissions.includes("MOJOR_ADMIN");
    };

    return (
        <>
            <Navigation
                user={<User />}
                breadcrumbs={[
                    {
                        name: <HomeOutlined />,
                        url: "/",
                    },
                    {
                        name: "Blog",
                        url: "/blog",
                    },
                ]}
            />

            <Container>
                <h1>Blog</h1>
                <div>
                    {getVisibility() && (
                        <Button type="link">
                            <PlusCircleOutlined />
                        </Button>
                    )}
                </div>
                <div>
                    {!complete && <Spin />}

                    {complete && error && (
                        <Alert
                            type="error"
                            showIcon
                            message="There was an issue getting the blogs."
                            description={status}
                        />
                    )}

                    {complete && !error && blogs.length === 0 && (
                        <Empty description="There are currently no blogs." />
                    )}

                    {complete &&
                        !error &&
                        blogs.map((blog: BlogResponse, index: number) => (
                            <Blog
                                lastDiv={index !== blogs.length - 1}
                                response={blog}
                            />
                        ))}
                </div>
            </Container>
        </>
    );
}
