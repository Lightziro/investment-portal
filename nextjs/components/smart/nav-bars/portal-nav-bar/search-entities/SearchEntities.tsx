import React, { useState } from "react";
import { AutoComplete, Input } from "antd";
import classes from "../../../../../styles/nav-bar.module.scss";
import { axios } from "../../../../../utils/axios";
import { SearchOption } from "../../../../../ts/types/other/other.types";
import { SearchEntityItem } from "./search-entity-item/SearchEntityItem";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { getSearchData } from "../../../../../utils/api/get-data";

export const SearchEntities: React.FC = () => {
    const [options, setOptions] = useState<SearchOption[]>([]);
    const { t } = useTranslation();
    const router = useRouter();

    const handleSearch = async (value) => {
        if (!value) {
            return;
        }
        const data = await getSearchData(value);
        setOptions((prev) => data);
    };
    const handleClickSearch = (value) => {
        if (!value) {
            return;
        }
        router.push(`/search/${value}`);
    };

    return (
        <AutoComplete
            dropdownMatchSelectWidth={500}
            dropdownClassName={classes.dropDownSearch}
            onSearch={handleSearch}
            defaultActiveFirstOption={false}
            style={{ width: 450 }}
            options={options
                .filter((section) => section.items.length)
                .map((section) => ({
                    label: t(section.entity),
                    options: section.items.map((option) => ({
                        value: option.name,
                        label: (
                            <SearchEntityItem
                                label={section.entity}
                                option={option}
                            />
                        ),
                    })),
                }))}
        >
            <Input.Search
                onSearch={handleClickSearch}
                size="large"
                placeholder={t("Search on site")}
            />
        </AutoComplete>
    );
};
