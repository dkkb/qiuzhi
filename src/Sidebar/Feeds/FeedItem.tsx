import {FC, memo, useRef, useState} from "react";
import {useDrag, useDrop} from "react-dnd";
import type {Identifier, XYCoord} from "dnd-core";
import clsx from "clsx";
import {ItemView} from "./ItemView";
import {FeedItem} from "../../model/Feed.ts";
import {SubscribeItem as SubscribeItemModel, SubscribeItemType} from "../../model/SubscribeItem.ts";

export const ItemTypes = {
    CARD: 'card',
    BOX: 'box',
}

export interface DragItem extends FeedItem {
    index: number;
}

export interface CardProps {
    uuid: string;
    text: string;
    index: number;
    feed: SubscribeItemModel;
    className?: String;
    children?: any;
    arrow?: React.ReactNode;
    isActive: Boolean;
    level?: number;
    toggleFolder: (uuid: string) => void;
    onDrop: (item: any, dropResult: any, position: string | null) => void;
}

export const SubscribeItem: FC<CardProps> = memo(
    ({
         uuid,
         text,
         feed,
         index,
         level,
         isActive,
         toggleFolder,
         ...props
     }) => {
        const ref = useRef<HTMLDivElement>(null);
        const [insertTileIndicator, setInsertTileIndicator] = useState<
            string | null
        >(null);
        const [{handlerId, isOver}, drop] = useDrop<
            DragItem,
            FeedItem,
            { handlerId: Identifier | null; isOver: boolean }
        >({
            accept: [ItemTypes.CARD, ItemTypes.BOX],
            drop: (item: FeedItem, monitor) => {
                if (monitor.didDrop()) {
                    return;
                }
                if (item.id === feed.uuid) {
                    return;
                }
                props.onDrop(item, feed, insertTileIndicator);
                return feed;
            },
            collect(monitor) {
                return {
                    isOver: monitor.isOver({shallow: true}),
                    handlerId: monitor.getHandlerId(),
                };
            },
            hover(item: DragItem & Partial<FeedItem>, monitor) {
                if (!ref.current) {
                    return;
                }
                if (item.id === feed.uuid) {
                    return;
                }
                if (item.id === feed.folder_uuid) {
                    return;
                }
                const hoverBoundingRect = ref.current?.getBoundingClientRect();
                const hoverMiddleY =
                    (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                const clientOffset = monitor.getClientOffset();
                const hoverClientY =
                    (clientOffset as XYCoord).y - hoverBoundingRect.top;

                const bottom = hoverClientY > hoverMiddleY + 5;
                const top = hoverClientY < hoverMiddleY - 5;

                let insertCaretDirection = "";

                if (bottom) {
                    insertCaretDirection = "bottom";
                } else if (top) {
                    insertCaretDirection = "top";
                } else {
                    // if (item.type === SubscribeItemType.FOLDER && feed.type === SubscribeItemType.FOLDER) {
                    //     return;
                    // }
                    insertCaretDirection = "middle";
                }

                if (isOver && insertCaretDirection) {
                    setInsertTileIndicator(insertCaretDirection);
                } else {
                    setInsertTileIndicator(null);
                }
            },
        });

        const [{isDragging}, drag] = useDrag({
            type: ItemTypes.CARD,//feed.type === SubscribeItemType.CHANNEL ? ItemTypes.CARD : ItemTypes.BOX,
            item: () => {
                return {index, ...feed};
            },
            collect: (monitor: any) => ({
                isDragging: monitor.isDragging(),
            }),
            end(_) {
            },
        });

        const opacity = isDragging ? 0.5 : 1;

        drag(drop(ref));
        return (
            <div
                ref={ref}
                style={{opacity}}
                className={clsx("relative rounded-md border border-transparent", {
                    [`indicator-middle`]: isOver && insertTileIndicator === "middle",
                    [`indicator-top`]: isOver && insertTileIndicator === "top",
                    [`indicator-bottom`]: isOver && insertTileIndicator === "bottom",
                })}
                data-handler-uuid={handlerId}
            >
                <ItemView
                    index={index}
                    uuid={feed.uuid}
                    level={level}
                    text={feed.title}
                    feed={{...feed}}
                    isActive={isActive}
                    isExpanded={feed.type === SubscribeItemType.FOLDER || false}
                    toggleFolder={toggleFolder}
                >
                    {props.children && (
                        <div
                            className={clsx(
                                "grid grid-rows-[0fr] grid-cols-[100%] overflow-hidden transition-all",
                                {
                                    "grid-rows-[1fr]": feed.type === SubscribeItemType.FOLDER,
                                },
                            )}
                        >
                            <div className="min-h-0 ">{props.children}</div>
                        </div>
                    )}
                </ItemView>
            </div>
        );
    },
);
