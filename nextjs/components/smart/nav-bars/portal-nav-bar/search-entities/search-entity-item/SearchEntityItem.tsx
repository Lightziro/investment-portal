import React from "react";
import { SearchItem } from "../../../../../../ts/types/other/other.types";
import Link from "next/link";
import { TypeSearchEntity } from "../../../../../../ts/enums/other.enums";

interface SearchEntityItem {
    label: string;
    option: SearchItem;
}

export const SearchEntityItem: React.FC<SearchEntityItem> = ({
    option,
    label,
}) => {
    const getLinkByEntity = () => {
        switch (label) {
            case TypeSearchEntity.companies:
                return `/company/${option.entity_id}`;
            case TypeSearchEntity.profiles:
                return `/profile/${option.entity_id}`;
            default:
                return "";
        }
    };
    return (
        <Link href={getLinkByEntity()}>
            <div className="d-flex justify-content-between">{option.name}</div>
        </Link>
    );
};
