import React from "react";
import {motion} from "framer-motion";
import {ArticleItem} from "../ArticleItem";
import {CheckCheck, Filter, RefreshCw, Snail} from "lucide-react";
import {ArticleModel} from "../../model/ArticleModel.ts";
import {TooltipBox} from "../../Components/tooltip.tsx";
import {Icon} from "../../Components/icon.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup, DropdownMenuRadioItem,
    DropdownMenuTrigger
} from "../../Components/dropdown-menu.tsx";
import {ArticleListItemPlaceholder} from "../../Components/ArticleListItemPlaceholder.tsx";

export type ArticleListProps = {
    feedUuid?: string;
    type?: string;
    title: string | null;
    size: any;
    setSize: any;
    isReachingEnd?: boolean;
    isEmpty: boolean;
    isLoading: boolean;
};

export const ArticleList = () => {
    const filterList = [
        {id: 0, title: "All",},
        {id: 1, title: "Unread",},
        {id: 2, title: "Read",},
    ];
    // const {articles, isLoading, size, mutate, setSize, isEmpty, isReachingEnd, isToday, isAll, isStarred} =
    //     useArticle({feedUuid, type,});
    const articles: ArticleModel[] = [];
    const isLoading = true;
    const isEmpty = true;
    const isStarred = true;

    const renderList = (): React.JSX.Element[] => {
        return (articles || []).map((article: ArticleModel, idx: number) => {
            return (
                <motion.div
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.2}}
                    initial={{opacity: 0, y: 30}}
                    key={article.title + idx}
                >
                    <ArticleItem article={article}/>
                </motion.div>
            );
        });
    };

    const markAllRead = () => {
    }
    const handleRefresh = () => {
    }

    const changeFilter = (id: any) => {
        if (filterList.some((_) => _.id === parseInt(id, 10))) {
            // store.setFilter({
            //     ...store.filterList.filter((_) => _.id === parseInt(id, 10))[0],
            // });
        }
    };
    return (
        <div className={"w-1/6 max-w-[300px] shadow"}>
            <div
                className="h-[var(--app-toolbar-height)] grid grid-cols-[auto_1fr] items-center justify-between border-b">
                <div
                    className=" flex items-center px-3 text-base font-bold w-full text-ellipsis overflow-hidden whitespace-nowrap text-article-headline"
                >
                    {"store.viewMeta.title"}
                </div>
                <div className={"flex items-center justify-end px-2 space-x-0.5"}>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <TooltipBox content="Filter">
                                <Icon>
                                    <Filter size={16}/>
                                </Icon>
                            </TooltipBox>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuRadioGroup value={"${store.currentFilter.id}"} onValueChange={changeFilter}>
                                {filterList.map((item) => {
                                    return (
                                        <DropdownMenuRadioItem key={`${item.id}`} value={`${item.id}`}>
                                            {item.title}
                                        </DropdownMenuRadioItem>
                                    );
                                })}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <TooltipBox content="Mark all as read">
                        <Icon onClick={markAllRead}>
                            <CheckCheck size={16}/>
                        </Icon>
                    </TooltipBox>
                    {!!!isStarred && (
                        <TooltipBox content="Reload feed">
                            <Icon onClick={handleRefresh}>
                                <RefreshCw size={16} className={`${true ? "spinning" : "333"}`}/>
                            </Icon>
                        </TooltipBox>
                    )}
                </div>
            </div>
            <div>
                {isEmpty ? (
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-full flex flex-col justify-center items-center gap-1 text-muted-foreground">
                        <Snail size={34} strokeWidth={1}/>
                        <p>Yay, no matching items.</p>
                    </div>
                ) : null}
                <ul className="m-0 grid gap-2 pt-2 pr-1 pb-1 pl-2">{renderList()}</ul>
                <div className="pt-1">
                    {isLoading && (<ArticleListItemPlaceholder/>)}
                </div>
            </div>
        </div>
    );
}
