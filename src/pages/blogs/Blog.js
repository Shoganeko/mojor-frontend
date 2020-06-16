import React from "react";
import {Breadcrumb, Button, Divider, Popconfirm, Tag} from "antd";
import {EditOutlined, HomeOutlined} from "@ant-design/icons";
import User from "../../handle/User";
import {getSelf, getToken} from "../../handle/AccountHandler";
import "../../assets/scss/pages/blog.scss"
import PlusCircleOutlined from "@ant-design/icons/lib/icons/PlusCircleOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import {Link, useRouteMatch} from "react-router-dom"
import BlogTags from "./BlogTags";
import {getBlog, getBlogs} from "../../handle/BlogHandler";
import ReactDOM from "react-dom"

export function ViewBlog() {
    const {
        params: { blog  }
    } = useRouteMatch()

    return (<BlogViewer id={blog}/>)
}

export class BlogViewer extends React.Component {
    state = {
        title: "",
        body: "",
        owner: "",
        id: "",
        date: "",
        tags: []
    }

    componentDidMount() {
        getBlog(this.props.id, (response) => {
            this.setState({
                tags: response.blog.blog.tags,
                title: response.blog.blog.title,
                body: response.blog.body,
                id: response.blog.blog.id,
                date: new Date(response.blog.blog.date).toLocaleString(),
                owner: response.blog.blog.creator,
                ownerText: response.owner.username
            })

            let self = getSelf()
            let visibility = self != null && self.permissions.includes("MOJOR_ADMIN")

            ReactDOM.render(<BlogTags
                id={this.state.id}
                tags={this.state.tags}
                visibility={visibility}
            />, document.getElementById("tag-container"))
        })
    }

    render() {
        return (<>
            <div className="nav-container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/"> <HomeOutlined /> </Breadcrumb.Item>
                    <Breadcrumb.Item href="/blog"> Blog </Breadcrumb.Item>
                    <Breadcrumb.Item> {this.state.title} </Breadcrumb.Item>
                </Breadcrumb>

                <User/>
            </div>

            <div className="container">
                <div className="blog-viewer-container">
                    <div className="blog-viewer-title">
                        <h1>{this.state.title}</h1>
                        <h3>Posted on {this.state.date}. Posted by {this.state.ownerText}</h3>
                        <div id="tag-container"/>
                    </div>
                    <div className="blog-viewer-body" dangerouslySetInnerHTML={{__html: this.state.body}} />
                    <div className="blog-viewer-footer">
                        {
                            this.getFooter()
                        }
                    </div>
                </div>
            </div>
        </>)
    }

    getFooter() {
        let self = getSelf()
        if (self != null && self.permissions.includes("MOJOR_ADMIN")) {
            return <>
                <p><EditOutlined/> Edit</p>
                <p><DeleteOutlined/> Delete</p>
            </>
        } else return <></>
    }
}

export class Blogs extends React.Component {
    state = {
        data: []
    }

    componentDidMount() {
        getBlogs((blogs) => {
            let data = []

            for (let i = 0; blogs.length > i; i++) {
                let obj = blogs[i]
                data.push({
                    body: obj.blog.body,
                    title: obj.blog.blog.title,
                    owner: obj.blog.blog.creator,
                    date: obj.blog.blog.date,
                    id: obj.blog.blog.id,
                    tags: obj.blog.blog.tags,
                    ownerText: obj.owner.username
                })
            }

            data.sort((a, b) => {
                return a.date - b.date
            })

            this.setState({
                data: data
            })
        })
    }

    render() {
        return (<>
            <div className="nav-container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/"> <HomeOutlined /> </Breadcrumb.Item>
                    <Breadcrumb.Item> Blog </Breadcrumb.Item>
                </Breadcrumb>

                <User/>
            </div>

            <div className="container">
                <h1>Blog</h1>
                <div className="blog-controls">
                    {
                        this.getControls()
                    }
                </div>
                <div className="blog-container">
                    {
                        this.state.data.map((blog, index) =>
                            <div key={index} className="blog">
                                <div className="blog-header">
                                    <h1><Link to={`/blog/${blog.id}`}>{blog.title}</Link></h1>
                                    <h4 className="blog-subtitle">Posted on {new Date(blog.date).toLocaleString()}. Created by {blog.ownerText}</h4>
                                    <div>
                                        {
                                            blog.tags.map((tag, index) => {
                                                return (<Tag key={index}>{tag}</Tag>)
                                            })
                                        }
                                    </div>
                                </div>

                                <div className="blog-body">
                                    {this.getBody(blog.body, blog.id)}
                                </div>

                                {
                                    this.getDivider(index)
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </>)
    }

    getBody(preBody, id) {
        let noEmote = preBody.replace(/<\/?[^>]+(>|$)/g, "")

        let diff = preBody.length - noEmote.length

        let body = preBody
            .replace("h1", "p")
            .replace("h2", "p")
            .replace("h3", "p")
            .replace("h4", "p")
            .replace("h5", "p")
            .replace("h6", "p")


        if (noEmote.length >= 100) {
            return (<div>
                <p dangerouslySetInnerHTML={{__html: body.substring(0, 50 + diff)}}/>
                <Link to={`/blog/${id}`}>Read more</Link>
            </div>)
        } else return (<p dangerouslySetInnerHTML={{__html: body}} />)
    }

    getControls() {
        let self = getSelf()

        if (self != null && self.permissions.includes("MOJOR_ADMIN")) {
            return (<Button type="link"><PlusCircleOutlined /></Button>)
        } else return (<></>)
    }

    getDivider(index) {
        if (index === 0)
            return (<></>)
        else
            return (<Divider/>)
    }
}
