import {ArticleReadStatus} from "../constants/constants.ts";

export interface ArticleModel {
    uuid: string
    title: string
    author: string
    description: string
    create_date: string
    read_status: ArticleReadStatus
    feed_url: string
}