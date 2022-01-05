import React, { Fragment } from "react";
import Skeleton from "react-loading-skeleton";
import { Col } from "react-bootstrap";
interface LoadArticleItems {
    count: number;
    height: number;
    sm: any;
}
export const LoadArticleItems: React.FC<LoadArticleItems> = ({
    count,
    height,
    sm,
}) => {
    return (
        <Fragment>
            {Array(count)
                .fill(1)
                .map((_, i) => (
                    <Col key={i} sm={sm}>
                        <Skeleton height={height} />
                    </Col>
                ))}
        </Fragment>
    );
};
