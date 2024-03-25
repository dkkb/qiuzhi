import clsx from "clsx";
import {ArticleList} from "../PreviewLayout/ArticleList/ArticleList.tsx";
import {Snail} from "lucide-react";
import {ArticleDetail} from "./ArticleDetail.tsx";
import {useBearStore} from "../stores";
import {useArticle} from "../hooks/useArticle.ts";
import {useQuery} from "../helpers/url.ts";

export const ArticleContainer = () => {
    const store = useBearStore((state) => ({
        feed: state.feed,
        article: state.article,
    }));
    const [, type, feedId] = useQuery();
    const {articles, isLoading, size, mutate, setSize, isReachingEnd} =
        useArticle({feedId, type,});
    console.log(articles, store.article, store.feed);
    const emptyPlaceholder = () => {
        return (
            <div
                className="top-1/2 flex-col gap-1 text-muted-foreground flex items-center justify-center h-full w-full">
                <Snail size={34} strokeWidth={1}/>
                <p>Yay, no matching items.</p>
            </div>
        )
    }

    return (
        <div className={clsx("relative grid h-[100vh] flex-1 pl-0", {})}>
            <div className="bg-panel flex h-full flex-1 overflow-hidden rounded-md">
                <ArticleList isLoading={isLoading} articles={articles}/>
                {store.article ?
                    <ArticleDetail article={store.article!} feed_title={store.feed?.title}/>
                    : emptyPlaceholder()
                }
            </div>
        </div>
    );
};
