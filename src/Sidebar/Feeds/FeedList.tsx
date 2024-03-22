import {clsx} from "clsx";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger
} from "../../Components/context-menu.tsx";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {SubscribeItem} from "./FeedItem.tsx";
import {SubscribeItem as SubscribeItemModel, SubscribeItemType} from "../../model/SubscribeItem.ts";
import {Folder} from "../../model/Folder.ts";
import {CheckCheck} from "lucide-react";

export const FeedList = ({subscribeData}: { subscribeData: SubscribeItemModel[] }) => {
    const handleContextMenuChange = (status: boolean) => {
    }
    const markAllRead = () => {
    };

    const renderList = () => {
        const renderFeed = (feed: SubscribeItemModel, index: number, level = 1) => {
            // const isActive = store?.feed?.uuid === feed.uuid;
            return (
                <SubscribeItem
                    key={feed.id}
                    index={index}
                    uuid={feed.id}
                    text={feed.title}
                    level={level}
                    feed={{...feed}}
                    isActive={false}
                    toggleFolder={() => {
                    }}
                    onDrop={() => {
                    }}
                >
                    {feed.type === SubscribeItemType.FOLDER && (feed as Folder).children.map((child, idx) => {
                        return renderFeed(child, idx, 2);
                    })}
                </SubscribeItem>
            );
        };
        return subscribeData.map((feed, i) => renderFeed(feed, i));
    };

    return (
        <>
            <div
                className={clsx("height-[calc(100% - var(--app-toolbar-height))] flex-1 overflow-y-auto pb-2 pr-1")}>
                <h2 className="mb-2 mt-4 px-6 text-lg font-semibold tracking-tight">Collections</h2>
                <h2 className="mb-2 mt-4 px-6 text-lg font-semibold tracking-tight">Feeds</h2>
                <ContextMenu onOpenChange={handleContextMenuChange}>
                    <ContextMenuTrigger>
                        <DndProvider backend={HTML5Backend}>
                            <div className="">{renderList()}</div>
                        </DndProvider>
                    </ContextMenuTrigger>
                    <ContextMenuContent key={"0"}>
                        <ContextMenuItem onClick={markAllRead}>
                            <CheckCheck size={14} className="mr-2"/> Mark all as read
                        </ContextMenuItem>
                        <ContextMenuSeparator/>
                    </ContextMenuContent>
                </ContextMenu>
            </div>
        </>
    )
}