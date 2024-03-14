import {useState} from "react";

export const useRefreshFeed = () => {
    // TODO: store
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const getFeedList = () => {
    };
    const startRefreshFeed = () => {
        console.log("start to refresh feed")
        setRefreshing(true)
    }
    return [
        getFeedList, refreshing, startRefreshFeed
    ] as const;
}