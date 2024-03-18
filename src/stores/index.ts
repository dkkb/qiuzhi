import {create} from 'zustand';
import {subscribeWithSelector} from "zustand/middleware";
import {FeedStore, useFeedStore} from "./feedStore.ts";
import {ArticleStore, createArticleStore} from "./articleStore.ts";

export const useBearStore = create<FeedStore & ArticleStore>()(
    subscribeWithSelector((set, get, _) => {
        return {
            ...useFeedStore(set, get, _),
            ...createArticleStore(set, get, _),
        }
    })
)
