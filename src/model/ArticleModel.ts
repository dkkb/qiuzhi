import {ArticleReadStatus} from "../constants/constants.ts";

export interface ArticleModel {
    id: string
    title: string
    image?: string
    author: string
    description: string
    content: string
    publish_date: string
    read_status: ArticleReadStatus
    source_url?: string
}
