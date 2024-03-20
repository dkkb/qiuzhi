import {SubscribeItem, SubscribeItemType} from "./SubscribeItem.ts";

export interface FeedItem extends SubscribeItem {
    item_type?: string;
    uuid?: string;
    feed_url: string;
    logo?: string;
    description?: string;
    pub_date?: Date;
    health_status?: number;
    failure_reason?: string;
    unread?: number;
    sort?: number;
    create_date?: Date;
    update_date?: Date;
    last_sync_date?: string;
    is_expanded?: boolean;
    type: SubscribeItemType.FEED
}
