import { useParams } from "react-router-dom";
import React from "react"
import Mojor from "./specific/Mojor";
import Unifey from "./specific/Unifey";
import Buta from "./specific/Buta";
import User from "../../component/User";
import Navigation from "../../component/Navigation";
import { HomeOutlined, ProjectOutlined } from "@ant-design/icons";
import Container from "../../component/Container";

const projects = [
    {
        name: "mojor",
        obj: <Mojor/>
    },
    {
        name: "unifey",
        obj: <Unifey/>
    },
    {
        name: "buta",
        obj: <Buta/>
    }
]

const findProject = (project: string): JSX.Element => {
    for (let i = 0; projects.length > i; i++) {
        let proj = projects[i];

        if (proj.name == project) 
            return proj.obj;
    }

    return <>That project could not be found.</>
}

export default () => {
    const { project } = useParams() as any;

    const projectJsx = findProject(project)

    return (
        <>
            <Navigation
                user={<User/>}
                breadcrumbs={[
                    {
                        name: <HomeOutlined />,
                        url: "/",
                    },
                    {
                        name: <ProjectOutlined />,
                        url: "/projects",
                    },
                    {
                        name: project[0].toUpperCase() + project.substring(1),
                        url: "/projects/" + project.toLowerCase(),
                    },
                ]}
            /> 

            <Container>{projectJsx}</Container>
        </>
    );
}