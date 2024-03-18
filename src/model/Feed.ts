export interface FeedItem {
    item_type: string;
    children: FeedItem[];
    id?: number;
    uuid: string;
    title: string;
    link: string;
    feed_url: string;
    folder_name?: string;
    folder?: string;
    logo?: string;
    description: string;
    pub_date?: Date;
    health_status: number;
    failure_reason: string;
    unread: number;
    sort?: number;
    create_date?: Date;
    update_date?: Date;
    last_sync_date?: string;
    folder_uuid?: string | null;
    is_expanded?: boolean;
}