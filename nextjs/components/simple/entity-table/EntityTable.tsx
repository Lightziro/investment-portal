import React from "react";
import {useTranslation} from "react-i18next";
interface EntityTable {
    columns: string[];
    row: any[][];
}
export const EntityTable: React.FC<EntityTable> = ({ columns, row }) => {
    const {t} = useTranslation()
    return (
        <table className="table">
            <thead>
                <tr>
                    {columns.map((item, i) => (
                        <th key={i} scope="col">
                            {t(item)}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {row.map((row, i) => (
                    <tr key={i}>
                        {row.map((item, i) => (
                            <th key={i} scope="row">
                                {item}
                            </th>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
