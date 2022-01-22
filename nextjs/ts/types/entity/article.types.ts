export interface Article {
    articleId: number;
    title: string;
    dateCreate: string;
    dateUpdate: string;
    preview: string;
    author: ArticleAuthor;
    content: string;
}

export interface ArticleAuthor {
    userId: number;
    avatar: string;
    fullName: string;
}

export interface ArticleLabel {
    icon: string;
    text: string | number;
}

export interface ArticleView extends Article {
    labels: ArticleLabel[];
    content: string;
    comments: Comment[];
}
