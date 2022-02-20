import React from "react";
import { SearchItem } from "../../../../../../ts/types/other/other.types";
import Link from "next/link";
import { getLinkByEntity } from "../../../../../../utils/other";

interface SearchEntityItem {
    label: string;
    option: SearchItem;
}

export const SearchEntityItem: React.FC<SearchEntityItem> = ({
    option,
    label,
}) => {
    return (
        <Link href={getLinkByEntity(label, option.entity_id)}>
            <div className="d-flex justify-content-between">{option.name}</div>
        </Link>
    );
};
