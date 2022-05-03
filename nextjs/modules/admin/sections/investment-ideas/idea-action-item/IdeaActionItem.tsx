import React from "react";
import { useRouter } from "next/router";
import { IdeaStatus } from "../../../../../ts/enums/investment-idea.enum";
import { IconButton } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import { DtoIdeaItem } from "../../../ts/types/response/admin-response-item.types";
import EditIcon from "@mui/icons-material/Edit";

interface IdeaActionItem {
    idea: DtoIdeaItem;
}
export const IdeaActionItem: React.FC<IdeaActionItem> = ({ idea }) => {
    const router = useRouter();
    switch (idea.status) {
        case IdeaStatus.Analyzed:
            return (
                <IconButton color="primary" component="span">
                    <PublishIcon
                        onClick={() =>
                            router.push(
                                `/admin/investment-ideas/${idea.idea_id}`
                            )
                        }
                    />
                </IconButton>
            );
        case IdeaStatus.Published:
            return (
                <IconButton color="primary" component="span">
                    <EditIcon
                        onClick={() =>
                            router.push(
                                `/admin/investment-ideas/${idea.idea_id}`
                            )
                        }
                    />
                </IconButton>
            );
        default:
            return null;
    }
};
