import React from "react";
import {
    SearchItem,
    SearchOption,
} from "../../../../ts/types/other/other.types";
import { List } from "antd";
import { Avatar } from "@mui/material";
import { LinkWrapper } from "../../../../components/simple/link/Link";
import { getLinkByEntity } from "../../../../utils/other";

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
                            <LinkWrapper
                                href={getLinkByEntity(
                                    entityData.entity,
                                    item.entity_id
                                )}
                            >
                                <Avatar
                                    src={`${process.env.API_URL}/storage/${item.img_path}`}
                                />
                            </LinkWrapper>
                        }
                        title={
                            <LinkWrapper
                                href={getLinkByEntity(
                                    entityData.entity,
                                    item.entity_id
                                )}
                            >
                                {item.name}
                            </LinkWrapper>
                        }
                    />
                </List.Item>
            )}
        />
    );
};
