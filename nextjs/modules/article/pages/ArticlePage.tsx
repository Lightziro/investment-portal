import React, {useEffect} from "react";
import {Divider, Grid, Paper} from "@mui/material";
import {ArticleHeader} from "../components/article-header/ArticleHeader";
import {CommentsList} from "../../../components/smart/comments-list/CommentsList";
import {NewsList} from "../../../components/ordinary/news-list/NewsList";
import {ArticleContent} from "../components/article-content/ArticleContent";
import {AboutAuthor} from "../components/about-author/AboutAuthor";
import {News} from "../../../ts/types/entity/stock-market.types";
import {useDispatch} from "react-redux";
import {setViewEntity} from "../../../redux/actions/viewActions";
import {useRootSelector} from "../../../hooks/useTypeSelector";
import {ArticleModel} from "../../../ts/types/entity/article.types";
import {
    fetchArticleComments,
    fetchArticleEmotions,
    fetchArticleLabels,
    setArticleComments,
} from "../../../redux/actions/articleArtions";
import {ArticleEmotion} from "../components/article-emotion/ArticleEmotion";
import {Entity} from "../../../ts/enums/other.enums";
import styles from './../Article.module.scss';
import classnames from "classnames";

interface ArticlePage {
    article: ArticleModel;
    news: News[];
}

export const ArticlePage: React.FC<ArticlePage> = ({article, news}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setViewEntity(article, Entity.Article));
        dispatch(setArticleComments(article.comments));
        dispatch(fetchArticleLabels(article.article_id));
        dispatch(fetchArticleEmotions(article.article_id));
    }, []);
    const {comments, labels} = useRootSelector((store) => store.view.article);
    return (
        <div className={styles.pageWrapper}>
            <NewsList items={news}/>
            <div className='w-100'>
                <div className={classnames(styles.articleWrapper, 'border-main')}>

                    <ArticleHeader
                        article={article}
                    />
                    <Divider/>
                    <ArticleContent
                        preview={article.preview_path}
                        content={article.content}
                    />
                </div>
            </div>
            {/*<Grid md={8} item lg={9}>*/}

            {/*    <Grid spacing={3} container>*/}
            {/*        <Grid sm={12} xs={12} md={6} item lg={6}>*/}
            {/*            <AboutAuthor author={article.author}/>*/}
            {/*        </Grid>*/}
            {/*        <Grid sm={12} md={6} xs={12} item lg={6}>*/}
            {/*            <ArticleEmotion articleId={article.article_id}/>*/}
            {/*        </Grid>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}

            {/*<div>*/}
            {/*    <CommentsList*/}
            {/*        entityId={article.article_id}*/}
            {/*        entityName={Entity.Article}*/}
            {/*        comments={comments}*/}
            {/*    />*/}
            {/*</div>*/}
        </div>
    );
};
