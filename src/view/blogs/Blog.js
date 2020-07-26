import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Divider, Tag, Spin, Empty } from "antd";
import { EditOutlined, HomeOutlined } from "@ant-design/icons";
import User from "../../component/User";
import { getSelf } from "../../handle/AccountHandler";
import "../../assets/scss/pages/blog.scss";
import PlusCircleOutlined from "@ant-design/icons/lib/icons/PlusCircleOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import { ExpandOutlined } from "@ant-design/icons"
import { Link, useRouteMatch } from "react-router-dom";
import BlogTags from "./BlogTags";
import { getBlog, getBlogs } from "../../handle/BlogHandler";
import Navigation from "../../component/Navigation";

/**
 * An individual blog.
 * @param {*} props 
 */
export default function Blog(props) {
    const {
        params: { id },
    } = useRouteMatch();

    let [blog, setBlog] = useState({
        isLoaded: false,
        title: "",
        body: "",
        owner: "",
        ownerText: "",
        id: "",
        date: "",
        tags: [],
    });

    useEffect(() => {
        const loadBlog = async () => {
            let request = await getBlog(id);

            if (request.status === 200) {
                let response = request.data

                setBlog((prevState) => ({
                    ...prevState,
                    tags: response.blog.tags,
                    title: response.blog.title,
                    body: response.blog.body,
                    id: response.blog.id,
                    date: new Date(response.blog.date).toLocaleString(),
                    owner: response.blog.creator,
                    ownerText: response.owner.username,
                }));
            }

            setBlog((prevState) => ({
                ...prevState,
                isLoaded: true,
            }));
        };

        loadBlog();
    }, [id]);

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
                    {
                        name: blog.title,
                        url: "/blog/" + blog.id,
                    },
                ]}
            />

            <div className="container">
                <div className="blog-viewer-container">
                    {blog.isLoaded && blog.title !== "" && (
                        <>
                            <div className="blog-viewer-title">
                                <h1>
                                    {blog.title}
                                </h1>
                                <h3>
                                    Posted on {blog.date}. Posted by{" "}
                                    {blog.ownerText}
                                </h3>
                                <div>
                                    <BlogTags
                                        id={blog.id}
                                        tags={blog.tags}
                                        visibility={getVisibility()}
                                    />
                                </div>
                            </div>
                            <div
                                className="blog-viewer-body"
                                dangerouslySetInnerHTML={{
                                    __html: blog.body,
                                }}
                            />
                            <div className="blog-viewer-footer">
                                {getVisibility() && (
                                    <>
                                        <p>
                                            <EditOutlined /> Edit
                                        </p>
                                        <p>
                                            <DeleteOutlined /> Delete
                                        </p>
                                    </>
                                )}
                            </div>
                        </>
                    )}

                    {!blog.isLoaded && <Spin />}

                    {blog.isLoaded && blog.title === "" && <Empty />}
                </div>
            </div>
        </>
    );
}