import {FeedItem} from "./Feed.ts";
import {Podcast} from "./Podcast.ts";
import {SubscribeItem} from "./SubscribeItem.ts";

export interface Folder extends SubscribeItem{
    folder_uuid?: string | null;
    folder_name: string;
    children: FeedItem[] | Podcast[]
}
