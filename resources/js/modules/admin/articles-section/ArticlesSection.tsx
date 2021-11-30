import React, { useEffect, useState } from "react";
import {
    Button,
    Container,
    Pagination,
    Stack,
    Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { CreateArticle } from "./create-article/CreateArticle";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticlesForAdmin } from "../../../redux/actions/articleArtions";
import { StoreData } from "../../../ts/types/redux/store.types";

export const ArticlesSection: React.FC = () => {
    const [dialog, setDialog] = useState(false);
    const dispatch = useDispatch();
    const { list, lastPage } = useSelector(
        (state: StoreData) => state.admin.articles
    );
    useEffect(() => {
        dispatch(fetchArticlesForAdmin(0));
    }, []);
    return (
        <Container maxWidth="xl">
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={5}
            >
                <Typography variant="h4" gutterBottom>
                    Stats articles
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Icon icon="ant-design:plus-outlined" />}
                    onClick={() => setDialog(true)}
                >
                    Create article
                </Button>
            </Stack>
            <Stack justifyContent="center">
                {list && (
                    <Pagination
                        onChange={(e, page) =>
                            dispatch(fetchArticlesForAdmin(page))
                        }
                        count={lastPage}
                        color="primary"
                    />
                )}
            </Stack>
            {dialog && (
                <CreateArticle
                    create={dialog}
                    onClose={() => setDialog(false)}
                />
            )}
        </Container>
    );
};
