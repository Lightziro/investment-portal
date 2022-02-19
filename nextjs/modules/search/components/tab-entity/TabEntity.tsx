import React from "react";
import {
    SearchItem,
    SearchOption,
} from "../../../../ts/types/other/other.types";
import { List } from "antd";
import { Avatar } from "@mui/material";

interface TabEntity {
    entityData: SearchOption;
}

export const TabEntity: React.FC<TabEntity> = ({ entityData }) => {
    return (
        <List
            itemLayout="horizontal"
            dataSource={entityData.items}
            renderItem={(item: SearchItem) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={
                            <Avatar
                                src={`${process.env.API_URL}/storage/${item.img_path}`}
                            />
                        }
                        title={<a href="https://ant.design">{item.name}</a>}
                        // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>
            )}
        />
    );
};
