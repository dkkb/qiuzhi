import {StateCreator} from "zustand";
import {ArticleModel} from "../model/ArticleModel.ts";

export interface ArticleStore {
    article: ArticleModel | null,
    setArticle: (ArticleItem: ArticleModel) => void;
    getArticleList: (query: any) => any;
    markArticleAsRead: (articleId: string) => void;
}

export const createArticleStore: StateCreator<ArticleStore> = (set, get) => ({
    article: null,

    setArticle: (articleItem: ArticleModel) => {
        set(() => ({article: articleItem}));
    },

    getArticleList: (query: any) => {
    },

    markArticleAsRead: (articleId: string) => {
        console.log(`mark article as read ${articleId}`)
    },
})