import {ArticleReadStatus} from "../constants/constants.ts";

export interface ArticleModel {
    uuid: string
    feed_title: string
    title: string
    image: string
    author: string
    description: string
    create_date: string
    read_status: ArticleReadStatus
    feed_url: string
}