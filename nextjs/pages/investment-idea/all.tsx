import React from "react";
import { GetServerSidePropsContext, NextPage } from "next";
import { getViewEntity } from "../../utils/api/get-data";
import { axios } from "../../utils/axios";
import { IdeaModel } from "../../ts/types/entity/idea.types";
import { Card } from "antd";
import { Avatar } from "@mui/material";
const { Meta } = Card;

interface AllIdeas {
    ideas: IdeaModel[];
}

const AllIdeas: NextPage<AllIdeas> = ({ ideas }) => {
    console.log(ideas);
    return (
        <div>
            {ideas.map((idea) => (
                <Card key={idea.idea_id} style={{ width: 300, marginTop: 16 }}>
                    <Meta
                        avatar={
                            <Avatar
                                src={`${process.env.API_URL}/storage/${idea.author.avatar_path}`}
                            />
                        }
                        title="Card title"
                        description="This is the description"
                    />
                </Card>
            ))}
        </div>
    );
};
export default AllIdeas;

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const config: any = { headers: context.req.headers };
    const ideas = await axios(`${process.env.API_URL_DOCKER}/api/idea/all`)
        .then((res) => res.data)
        .catch((e) => []);
    return {
        props: {
            ideas,
        },
    };
};
