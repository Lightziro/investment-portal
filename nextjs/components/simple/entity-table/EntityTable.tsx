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
                    {columns.map((item) => (
                        <th scope="col">{item}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {row.map((row) => (
                    <tr>
                        {row.map((item) => (
                            <th scope="row">{item}</th>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
