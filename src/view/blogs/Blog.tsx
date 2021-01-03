import React, { useEffect, useState } from "react";
import { Spin, Empty } from "antd";
import { EditOutlined, HomeOutlined } from "@ant-design/icons";
import User from "../../component/User";
import { getSelf } from "../../handle/AccountHandler";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import { useParams } from "react-router-dom";
import { getBlog } from "../../handle/BlogHandler";
import Navigation from "../../component/Navigation";
import { BlogResponse } from "./BlogData";
import useStatus from "../../handle/RequestUtil";
import styled from "styled-components"
import Container from "../../component/Container";

const BlogFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    min-width: 16vw;
    margin-top: 4rem;
`;

const BlogContainer = styled.div`
    max-width: 850px;
    padding-top: 4rem;
`;

/**
 * An individual blog.
 * @param {*} props 
 */
export default () => {
    const { id } = useParams() as any
    
    const [blogResponse, setBlogResponse] = useState({ } as BlogResponse) 
    const [complete, error, status, setStatus] = useStatus()

    const { blog, user } = blogResponse

    useEffect(() => {
        const loadBlog = async () => {
            let request = await getBlog(id);

            if (request.status === 200) {
                let response = request.data

                setBlogResponse(response as BlogResponse)
            }

            setStatus(prev => ({ ...prev, complete: true }))
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
                        name: blog === undefined ? "..." : blog.title,
                        url:
                            "/blog/" +
                            (blog === undefined ? "..." : blog.id),
                    },
                ]}
            />

            <Container>
                <BlogContainer>
                    {complete && !error && (
                        <>
                            <div>
                                <h1>{blog.title}</h1>
                                <h3>
                                    Posted on {blog.date}. Posted by{" "}
                                    {user.username}
                                </h3>
                            </div>

                            <div
                                dangerouslySetInnerHTML={{
                                    __html: blog.body,
                                }}
                            />

                            <BlogFooter>
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
                            </BlogFooter>
                        </>
                    )}

                    {!complete && <Spin />}

                    {complete && error && (
                        <Empty description="That blog could not be found." />
                    )}
                </BlogContainer>
            </Container>
        </>
    );
}