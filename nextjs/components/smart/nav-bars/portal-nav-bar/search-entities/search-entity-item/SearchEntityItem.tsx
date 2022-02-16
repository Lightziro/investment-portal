import React from "react";
import { getSearchContent } from "../../../../../../utils/other";
interface SearchEntityItem {
    nameEntity: string;
    item: any;
}
export const SearchEntityItem: React.FC<SearchEntityItem> = ({
    nameEntity,
    item,
}) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            {getSearchContent(nameEntity, item)}
        </div>
    );
};
