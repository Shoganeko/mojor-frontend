import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Divider, Tag, Spin, Empty } from "antd";
import { EditOutlined, HomeOutlined } from "@ant-design/icons";
import User from "../../component/User";
import { getSelf } from "../../handle/AccountHandler";
import "../../assets/scss/pages/blog.scss";
import PlusCircleOutlined from "@ant-design/icons/lib/icons/PlusCircleOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import { ExpandOutlined } from "@ant-design/icons";
import { Link, useRouteMatch } from "react-router-dom";
import BlogTags from "./BlogTags";
import { getBlog, getBlogs } from "../../handle/BlogHandler";
import Navigation from "../../component/Navigation";
import { useDispatch } from "react-redux";
import { alertError } from "../../redux/actions/alert.actions";


/**
 * The main list of all blogs.
 */
export default function AllBlogs() {
    let [data, setData] = useState([]);
    let dispatch = useDispatch()

    useEffect(() => {
        const loadBlogs = async () => {
            let response = await getBlogs();

            if (response.status !== 200) {
                dispatch(alertError("There was an issue retrieving the blogs."))
                return
            }

            let blogs = response.data

            let blogArray = [];

            for (let i = 0; blogs.length > i; i++) {
                let obj = blogs[i];

                blogArray.push({
                    body: obj.blog.body,
                    title: obj.blog.title,
                    owner: obj.blog.creator,
                    date: obj.blog.date,
                    id: obj.blog.id,
                    tags: obj.blog.tags,
                    ownerText: obj.owner.username,
                });
            }

            blogArray.sort((a, b) => {
                return a.date - b.date;
            });

            setData(blogArray);
        };

        loadBlogs();
    }, []);

    /**
     * Get the preview body.
     * @param {*} preBody
     * @param {*} id
     */
    const getBody = (preBody, id) => {
        let noEmote = preBody.replace(/<\/?[^>]+(>|$)/g, "");

        let diff = preBody.length - noEmote.length;

        let body = preBody
            .replace("h1", "p")
            .replace("h2", "p")
            .replace("h3", "p")
            .replace("h4", "p")
            .replace("h5", "p")
            .replace("h6", "p");

        if (noEmote.length >= 100) {
            return (
                <div>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: body.substring(0, 50 + diff),
                        }}
                    />
                    <Link to={`/blog/${id}`}>Read more</Link>
                </div>
            );
        } else return <p dangerouslySetInnerHTML={{ __html: body }} />;
    };

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

            <div className="container">
                <h1>Blog</h1>
                <div className="blog-controls">
                    {getVisibility() && (
                        <Button type="link">
                            <PlusCircleOutlined />
                        </Button>
                    )}
                </div>
                <div className="blog-container">
                    {data.length === 0 && <Spin />}
                    {data.length !== 0 &&
                        data.map((blog, index) => (
                            <div key={index} className="blog">
                                <div className="blog-header">
                                    <h1>
                                        <Link to={`/blog/${blog.id}`}>
                                            {blog.title}
                                        </Link>
                                    </h1>
                                    <h4 className="blog-subtitle">
                                        Posted on{" "}
                                        {new Date(blog.date).toLocaleString()}.
                                        Created by {blog.ownerText}
                                    </h4>
                                    {blog.tags.length !== 0 && (
                                        <div>
                                            {blog.tags.map((tag, index) => {
                                                return (
                                                    <Tag key={index}>{tag}</Tag>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                <div className="blog-body">
                                    {getBody(blog.body, blog.id)}
                                </div>

                                {index !== 0 && <Divider />}
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
