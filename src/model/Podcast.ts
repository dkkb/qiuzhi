import {SubscribeItem, SubscribeItemType} from "./SubscribeItem.ts";

export interface Podcast extends SubscribeItem {
    type: SubscribeItemType.PODCAST
}