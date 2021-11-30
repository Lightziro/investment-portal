export interface Article {
    articleId: string;
    title: string;
    dateCreate: string;
    dateUpdate: string;
    content: string;
    preview: string;
    author: {
        userId: number;
        avatar: string;
        fullName: string;
    };
}
