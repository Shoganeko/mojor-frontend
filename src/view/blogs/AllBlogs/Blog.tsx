import React from "react"
import { BlogResponse } from "../BlogData";
import styled from "styled-components"
import { Link } from "react-router-dom";
import { Divider, Tag } from "antd";

type Props = {
    response: BlogResponse
    lastDiv: boolean
}

const BlogContainer = styled.div`
    min-width: 300px;
    max-width: 600px;
`;

const BlogBody = styled.div`
    margin-top: 1rem;
    margin-bottom: 2rem;

    p {
        font-family: "Roboto", sans-serif;
    }
`;

const BlogHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    // subtitle
    h4 {
        font-weight: normal;
        font-size: 12px;
        margin-top: -1rem;
    }
`;

export default ({ response, lastDiv }: Props) => {
    const { user, blog } = response;

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
                <BlogBody>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: body.substring(0, 50 + diff),
                        }}
                    />
                    <Link to={`/blog/${id}`}>Read more</Link>
                </BlogBody>
            );
        } else
            return (
                <BlogBody>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: body.substring(0, 50 + diff),
                        }}
                    />
                </BlogBody>
            );
    };

    return (
        <BlogContainer>
            <BlogHeader>
                <h1>
                    <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                </h1>
                <h4 className="blog-subtitle">
                    Posted on {new Date(blog.date).toLocaleString()}. Created by{" "}
                    {user.username}
                </h4>
            </BlogHeader>

            {getBody(blog.body, blog.id)}

            {lastDiv && <Divider />}
        </BlogContainer>
    );
}