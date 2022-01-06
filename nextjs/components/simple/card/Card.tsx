import React from "react";
interface Card {
    backgroundColor?: string;
    color?: string;
}
export const Card: React.FC<Card> = ({
    children,
    backgroundColor = "white",
    color = "black",
}) => {
    return (
        <div className="card-wrapper" style={{ backgroundColor, color }}>
            {children}
        </div>
    );
};
