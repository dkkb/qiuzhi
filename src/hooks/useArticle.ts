import useSWRInfinite from "swr/infinite";
import {useMatch} from "react-router-dom";
import {omit} from "lodash";
import {useBearStore} from "../stores";
import {ArticleModel} from "../model/ArticleModel";
import {RouteConfig} from "../RootConfig.ts";
import {axiosClient} from "../helpers/request.ts";
import json from './zhihu.rss.json';
import {ArticleReadStatus} from "../constants/constants.ts";

const PAGE_SIZE = 20;

export interface UseArticleProps {
    feedId?: string;
    type?: string;
}

export function useArticle({feedId, type}: UseArticleProps) {
    const store = useBearStore((state) => ({
        // currentFilter: state.currentFilter,
        // updateArticleStatus: state.updateArticleStatus,
    }));

    const isToday = useMatch(RouteConfig.LOCAL_TODAY);
    const isAll = useMatch(RouteConfig.LOCAL_ALL);
    const isStarred = useMatch(RouteConfig.LOCAL_STARRED);
    //
    // const query = omit({
    //     read_status: isStarred ? undefined : store.currentFilter.id,
    //     limit: PAGE_SIZE,
    //     feed_uuid: feedId,
    //     item_type: type,
    //     is_today: isToday && 1,
    //     is_all: isAll && 1,
    //     is_starred: isStarred && 1,
    // });
    // console.log("%c Line:29 🍖 query", "color:#ea7e5c", query);
    // const getKey = (pageIndex: number, previousPageData: any) => {
    //     if (previousPageData && !previousPageData.list?.length) return null;
    //     return {
    //         ...query,
    //         cursor: pageIndex + 1,
    //     };
    // };
    // const {data, isLoading, size, mutate, setSize} = useSWRInfinite(
    //     getKey,
    //     (q) => axiosClient.get("/articles", {params: {...q},}).then((res) => res.data),
    //     {
    //         revalidateIfStale: true,
    //         revalidateOnFocus: true,
    //         revalidateOnReconnect: true,
    //     }
    // );
    let data: ArticleModel[] = [];
    let isLoading = true;
    if (feedId) {
        json.rss.channel.item.forEach((item: any) => {
            data.push({
                status: ArticleReadStatus[item.status],
                publish_date: new Date(Date.parse(item.publish_date)),
                ...item,
            })
        });
        isLoading = false;
    }
    console.log(data);
    const list = data ? data.flatMap(item => item || []) : [];
    const articles = [...list];
    console.log(articles);
    const isEmpty = !isLoading && list.length === 0;
    const isReachingEnd = isEmpty || (data && data.length < PAGE_SIZE);

    return {
        articles,
        isLoading,
        mutate: null,
        size: null,
        setSize: null,
        isEmpty,
        isReachingEnd,
        isToday: !!isToday,
        isAll: !!isAll,
        isStarred: !!isStarred,
    };
}
