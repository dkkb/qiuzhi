import React, {useEffect, useState} from "react";
import {formatDistanceToNow} from "date-fns";
import classnames from "classnames";
import {ArticleModel} from "../model/ArticleModel.ts";
import {ArticleReadStatus} from "../constants/constants.ts";
import {getFeedFavicon} from "../helpers/favicon.ts";
import {useBearStore} from "../stores";

interface ArticleItemProps {
    article: ArticleModel;
}

export const ArticleListItem = ({article}: ArticleItemProps) => {
    const [highlight, setHighlight] = useState(false);
    const [readStatus, setReadStatus] = useState(article.read_status);
    const store = useBearStore((state) => ({
        feed: state.feed,
        article: state.article,

        markArticleAsRead: state.markArticleAsRead,
        setArticle: state.setArticle,
    }));

    const updateCurrentArticle = (article: any) => {
        if (article.read_status === ArticleReadStatus.UNREAD) {
            setReadStatus(ArticleReadStatus.READ);
        }
    };

    const handleClick = async (_: React.MouseEvent) => {
        updateCurrentArticle(article);
    };

    // useEffect(() => {
    //     setReadStatus(article.read_status);
    // }, [article.read_status]);

    // useEffect(() => {
    //     setHighlight(store.article?.id === article.id);
    // }, [store.article, article]);

    return (
        <li
            className={classnames(
                "list-none rounded-sm p-3 pl-6 grid gap-1 relative select-none",
                "group hover:bg-accent hover:cursor-pointer",
                {
                    "text-[hsl(var(--foreground)_/_80%)]": readStatus === ArticleReadStatus.READ,
                    "bg-primary text-accent hover:bg-primary": highlight,
                }
            )}
            onClick={handleClick}
            id={article.id}
        >
            {readStatus === ArticleReadStatus.UNREAD && (
                <div className="absolute left-2 top-4 w-2 h-2 rounded-full bg-primary"/>
            )}
            <div
                className={classnames(
                    `${highlight ? "text-article-active-headline" : "text-article-headline"}`,
                    "font-bold text-sm group-hover:text-article-active-headline break-all"
                )}
            >
                {article.title}
            </div>
            <div
                className={classnames(
                    "text-xs line-clamp-2 break-all",
                    "text-article-paragraph group-hover:text-article-active-paragraph",
                    {
                        "text-article-active-paragraph": highlight,
                    }
                )}
            >
                {(article.description || "").replace(/<[^<>]+>/g, "")}
            </div>
            <div
                className={classnames(
                    "flex justify-between items-center text-xs text-article-paragraph group-hover:text-article-active-paragraph",
                    {
                        "text-article-active-paragraph": highlight,
                    }
                )}
            >
                <div className="flex items-center">
                    <img
                        src={store.feed?.logo || getFeedFavicon(article.source_url)}
                        alt=""
                        className="rounded w-4 mr-1"
                    />
                    <span className="max-w-[146px] overflow-hidden text-ellipsis mr-1 whitespace-nowrap">
              {article.author || ''}
            </span>
                </div>
                <div className="whitespace-nowrap">
                    {formatDistanceToNow(article.publish_date, {includeSeconds: true, addSuffix: true,})}
                </div>
            </div>
        </li>
    );
}
