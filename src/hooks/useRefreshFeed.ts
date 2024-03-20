import {useState} from "react";
import {useBearStore} from "../stores";

export const useRefreshFeed = () => {
    const store = useBearStore((state) => ({
        feedList: state.feedList,
        getFeedList: state.getFeedList,
    }));
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const getFeedList = () => {
        console.log("useRefreshFeed.getFeedList")
        return store.getFeedList()
    };
    const startRefreshFeed = () => {
        console.log("start to refresh feed")
        setRefreshing(true)
    }
    return [
        store.feedList, getFeedList, refreshing, startRefreshFeed
    ] as const;
}