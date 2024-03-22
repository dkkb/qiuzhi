export enum SubscribeItemType {
    FOLDER,
    FEED,
    PODCAST
}

export interface SubscribeItem {
    id: string;
    title: string;
    url: string;
    logo?: string;
    description?: string;
    unread?: number;
    type: SubscribeItemType;
    create_date?: Date;
    update_date?: Date;
    last_sync_date?: string;
}