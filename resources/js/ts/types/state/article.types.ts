export interface Article {
    articleId: string;
    title: string;
    dateCreate: string;
    dateUpdate: string;
    preview: string;
    author: {
        userId: number;
        avatar: string;
        fullName: string;
    };
}
export interface ArticleLabel {
    icon: string;
    text: string;
}
export interface ArticleView extends Article {
    labels: ArticleLabel[];
    content: string;
}
