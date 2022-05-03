import React from "react";
interface EntityTable {
    columns: string[];
    row: any[][];
}
export const EntityTable: React.FC<EntityTable> = ({ columns, row }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    {columns.map((item, i) => (
                        <th key={i} scope="col">
                            {item}
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
