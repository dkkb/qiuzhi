import React, {FC} from "react";
import {useNavigate} from "react-router-dom";
import clsx from "clsx";
import {getFeedFavicon} from "../../helpers/favicon.ts";
import {useBearStore} from "../../stores";
import {SubscribeItem as SubscribeItemModel, SubscribeItemType} from "../../model/SubscribeItem.ts";
import {FolderIcon, FolderMinusIcon, FolderOpenIcon} from "lucide-react";
import {Folder} from "../../model/Folder.ts";
import {RouteConfig} from "../../RootConfig.ts";

export interface CardProps {
    uuid: any;
    text: string;
    index: number;
    feed: SubscribeItemModel;
    className?: String;
    children?: any;
    arrow?: React.ReactNode;
    isActive: Boolean;
    isExpanded: Boolean;
    level?: number;
    toggleFolder: (uuid: string) => void;
}

export const ItemView: FC<CardProps> = ({uuid, text, feed, index, isExpanded, toggleFolder, ...props}) => {
    const {isActive, level} = props;
    const navigate = useNavigate();
    const store = useBearStore((state) => ({
        feed: state.feed,
        setFeed: state.setFeed,
        getFeedList: state.getFeedList,
        setFeedContextMenuTarget: (feed) => {
        },
        feedContextMenuTarget: () => {
        },
        feedContextMenuStatus: () => {
        },
    }));

    const handleToggle = () => {
        // if (feed.item_type === "folder") {
        //     toggleFolder(uuid);
        // }
    };

    const {unread = 0, url, logo} = feed;
    const ico = logo || getFeedFavicon(url);

    return (
        <>
            <div
                className={clsx("sidebar-item", {
                    "sidebar-item--active": isActive,
                    "shadow-[inset_0_0_0_2px_var(--color-primary)]":
                        store.feedContextMenuStatus &&
                        store.feedContextMenuTarget &&
                        store.feedContextMenuTarget.uuid === feed.id,
                    "pl-11": level === 2,
                })}
                onContextMenu={() => {
                    store.setFeedContextMenuTarget(feed);
                }}
                key={feed.title}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation();
                    // store.setFeed(feed);
                    navigate(
                        `${RouteConfig.LOCAL_FEED.replace(/:feedId/, feed.id)}?url=${feed.url}&type=${feed.type}`
                    );
                }}
            >
                {feed.type === SubscribeItemType.FOLDER ?
                    <div>
                        {isActive ? (
                            <FolderOpenIcon className="w-4 h-4 mr-2"/>
                        ) : (feed as Folder).children ? (
                            <FolderMinusIcon className="w-4 h-4 mr-2"/>
                        ) : (
                            <FolderIcon className="w-4 h-4 mr-2"/>
                        )}
                    </div> :
                    <img
                        src={ico}
                        className={clsx("h-4 w-4 rounded")}
                        alt={feed.title}
                    />
                }
                <span
                    className={clsx("shrink grow basis-[0%] overflow-hidden text-ellipsis whitespace-nowrap text-sm")}>
                    {feed.title}
                </span>
                {unread > 0 && (
                    <span className={clsx("-mr-1 h-4 min-w-[1rem] text-center text-[10px] leading-4")}>{unread}</span>
                )}
            </div>
            {props.children}
        </>
    );
};
