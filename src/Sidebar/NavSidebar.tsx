import {TopSideBar} from "./TopSideBar/TopSideBar.tsx";
import {Outlet} from "react-router-dom";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {FeedList} from "./Feeds/FeedList.tsx";
import {useBearStore} from "../stores";
import {useEffect} from "react";
import {useRefreshFeed} from "../hooks/useRefreshFeed.ts";
import dayjs from "dayjs";

/**
 * Control the refresh subscribe list logic:
 * 1. Refresh when start
 * 2. Refresh when click refresh button.
 * @constructor
 */
export const NavSidebar = () => {
    // TODO: 如果底下的使用了 feedStore，一个地方更新了，那么下面的监控了 feedList 会感觉到吗？
    const store = useBearStore((state) => ({
        feedList: state.feedList,
        feed: state.feed,
        getFeedList: state.getFeedList,
        setFeedList: state.setFeedList,
    }));

    const [feedList, getFeedList, refreshing, startRefreshFeed] = useRefreshFeed();

    useEffect(() => {
        console.info("init NavSidebar, fetch feed")
        getFeedList();
    }, []);

    const mockTime = dayjs(new Date()).format("YYYY-MM-DD HH:mm");

    return (
        <div className="flex flex-row h-full bg-canvas ">
            <div
                className="relative flex h-full w-1/6 max-w-[300px] select-none flex-col text-[hsl(var(--foreground))] shadow"
            >
                <div
                    className="flex h-[var(--app-toolbar-height)] items-center justify-end bg-[var(--background)] px-2 py-0">
                    <TopSideBar startRefreshFeed={startRefreshFeed} refreshing={refreshing} lastUpdatedAt={mockTime}/>
                </div>
                <DndProvider backend={HTML5Backend}>
                    <FeedList subscribeData={store.feedList}/>
                </DndProvider>
            </div>
            <Outlet/>
        </div>
    )
}