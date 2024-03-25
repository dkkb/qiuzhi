import React, {useLayoutEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {ArticleListItem} from "./ArticleListItem.tsx";
import {CheckCheck, Filter, RefreshCw} from "lucide-react";
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
    // feedUuid?: string;
    // type?: string;
    isLoading: boolean;
    articles: ArticleModel[];
};

export const ArticleList = ({isLoading, articles}: ArticleListProps) => {
    const filterList = [
        {id: 0, title: "All",},
        {id: 1, title: "Unread",},
        {id: 2, title: "Read",},
    ];

    const renderList = (): React.JSX.Element[] => {
        return (articles || []).map((article: ArticleModel, idx: number) => {
            return (
                <motion.div
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.2}}
                    initial={{opacity: 0, y: 30}}
                    key={article.title + idx}
                >
                    <ArticleListItem article={article}/>
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

    // Calculate the number of placeholder items to render based on the container height and the placeholder height.
    const [placeholderCount, setPlaceholderCount] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        const container = containerRef.current;
        if (container) {
            const containerHeight = container.getBoundingClientRect().height;
            const placeholderHeight = 100;
            const count = Math.floor(containerHeight / placeholderHeight);
            setPlaceholderCount(count);
        }
    }, []);
    const listRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className={"w-1/5 max-w-[400px] min-w-[300px] shadow shrink-0 basis-[var(--app-article-width)] border-r flex flex-col h-full"}
            ref={containerRef}>
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
                    <TooltipBox content="Reload feed">
                        <Icon onClick={handleRefresh}>
                            <RefreshCw size={16} className={`${true ? "spinning" : "333"}`}/>
                        </Icon>
                    </TooltipBox>
                </div>
            </div>
            <div className="relative flex-1 overflow-y-auto" ref={listRef}>
                <ul className="m-0 grid gap-2 pt-2 pr-1 pb-1 pl-2">{renderList()}</ul>
                <div className="pt-1">
                    {isLoading && (
                        Array.from({length: placeholderCount}).map((_, index) => (
                            <ArticleListItemPlaceholder key={index}/>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
