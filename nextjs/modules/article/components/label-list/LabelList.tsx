import React from "react";
import { Skeleton, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { ArticleLabel } from "../../../../ts/types/state/article.types";
import { Col, Row } from "react-bootstrap";
interface LabelList {
    labels: ArticleLabel[];
}
export const LabelList: React.FC<LabelList> = ({ labels }) => {
    return (
        <Row sm={"auto"}>
            {labels ? (
                labels.map((label) => (
                    <Col sm={"auto"}>
                        <Stack
                            className="wrapper-label-item"
                            alignItems="center"
                            direction="row"
                        >
                            <Icon
                                width={26}
                                height={26}
                                color="#b790f5"
                                icon={label.icon}
                            />
                            <span className="article-label-text">
                                {label.text}
                            </span>
                        </Stack>
                    </Col>
                ))
            ) : (
                <Skeleton
                    variant={"rectangular"}
                    height={62}
                    width="100%"
                    sx={{ ml: 2 }}
                />
            )}
        </Row>
    );
};
