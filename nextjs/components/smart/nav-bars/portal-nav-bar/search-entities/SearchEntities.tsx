import React, { useState } from "react";
import { AutoComplete, Input } from "antd";
import classes from "../../../../../styles/nav-bar.module.scss";
import { axios } from "../../../../../utils/axios";
import { SearchOption } from "../../../../../ts/types/other/other.types";
import { SearchEntityItem } from "./search-entity-item/SearchEntityItem";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

export const SearchEntities: React.FC = () => {
    const [options, setOptions] = useState<SearchOption[]>([]);
    const { t } = useTranslation();
    const router = useRouter();

    const handleSearch = async (value) => {
        if (!value) {
            return;
        }
        const data = await axios
            .get(`${process.env.API_URL}/api/search/${value}`)
            .then((res) => res.data);
        setOptions(data);
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
            options={options.map((item, i) => ({
                label: item.label,
                options: item.items.map((option) => ({
                    value: option.name,
                    label: (
                        <SearchEntityItem label={item.label} option={option} />
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
