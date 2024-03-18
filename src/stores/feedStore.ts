import {StateCreator} from "zustand";
import {FeedItem} from "../model/Feed.ts";

export interface FeedStore {
    feed: FeedItem | null,
    setFeedList: (list: FeedItem[]) => void;
    getFeedList: () => any;
}

export const useFeedStore: StateCreator<FeedStore> = (set, get) => ({
    feed: null,
    setFeedList: () => {
    },

    getFeedList: () => {
    },
})