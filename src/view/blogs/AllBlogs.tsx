import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Divider, Tag, Spin, Empty, Alert } from "antd";
import { EditOutlined, HomeOutlined } from "@ant-design/icons";
import User from "../../component/User";
import { getSelf } from "../../handle/AccountHandler";
import PlusCircleOutlined from "@ant-design/icons/lib/icons/PlusCircleOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import { ExpandOutlined } from "@ant-design/icons";
import { Link, useRouteMatch } from "react-router-dom";
import BlogTags from "./BlogTags";
import { getBlog, getBlogs } from "../../handle/BlogHandler";
import Navigation from "../../component/Navigation";
import { useDispatch } from "react-redux";
import { alertError } from "../../redux/actions/alert.actions";
import { BlogResponse } from "./BlogData";
import useStatus from "../../handle/RequestUtil";
import Container from "../../component/Container";
import styled from "styled-components";

const BlogContainer = styled.div`
    min-width: 300px;
    max-width: 600px;
`;

const BlogBody = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

const BlogHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    // subtitle
    h4 {
        font-weight: normal;
        font-size: 12px;
        margin-top: -1.5rem;
    }
`;

/**
 * The main list of all blogs.
 */
export default () => {
    const [complete, error, status, setStatus] = useStatus();
    const [blogs, setBlogs] = useState([] as BlogResponse[]);
    let dispatch = useDispatch();

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

    /**
     * Get the preview body.
     * @param {*} preBody
     * @param {*} id
     */
    const getBody = (preBody: string, id: string) => {
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

            <Container>
                <h1>Blog</h1>
                <div className="blog-controls">
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
                        ></Alert>
                    )}

                    {complete && !error && blogs.length === 0 && (
                        <Empty description="There are currently no blogs." />
                    )}

                    {complete &&
                        !error &&
                        blogs.map(
                            ({ blog, user }: BlogResponse, index: number) => (
                                <BlogContainer key={index}>
                                    <BlogHeader>
                                        <h1>
                                            <Link to={`/blog/${blog.id}`}>
                                                {blog.title}
                                            </Link>
                                        </h1>
                                        <h4 className="blog-subtitle">
                                            Posted on{" "}
                                            {new Date(
                                                blog.date
                                            ).toLocaleString()}
                                            . Created by {user.username}
                                        </h4>
                                        {blog.tags.length !== 0 && (
                                            <div>
                                                {blog.tags.map(
                                                    (tag: any, index: any) => {
                                                        return (
                                                            <Tag key={index}>
                                                                {tag}
                                                            </Tag>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        )}
                                    </BlogHeader>

                                    <BlogBody>
                                        {getBody(blog.body, blog.id)}
                                    </BlogBody>

                                    {index !== 0 && <Divider />}
                                </BlogContainer>
                            )
                        )}
                </div>
            </Container>
        </>
    );
}
