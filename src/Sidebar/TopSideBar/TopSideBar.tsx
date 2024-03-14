import {TooltipBox} from "../../Components/tooltip.tsx";
import {Icon} from "../../Components/icon.tsx";
import {FolderPlus, RefreshCw} from "lucide-react";
import {useRefreshFeed} from "../../hooks/useRefreshFeed.ts";
import {NewSubscribe} from "./NewSubscribe.tsx";
import {useEffect, useState} from "react";

interface TopSideBarProps {
    lastUpdatedAt: string
}

export const TopSideBar = ({lastUpdatedAt}: TopSideBarProps) => {
    const [showNewSubscribe, setShowNewSubscribe] = useState(false);
    const [getFeedList, refreshing, startRefreshFeed] = useRefreshFeed();

    useEffect(() => {
        console.info("init TopSideBar, fetch feed")
        getFeedList();
    }, []);

    const mockTime = '2024-04-01 00:00:00';
    return (
        <div className="flex h-[var(--app-toolbar-height)] items-center justify-end bg-[var(--background)] px-2 py-0">
            <div className="flex justify-start">
                <span className="text-sm text-gray-500 item-center">Last updated at {mockTime}</span>
            </div>
            <div className="flex justify-end">
                <NewSubscribe
                    showNewSubscribe={showNewSubscribe}
                    setShowNewSubscribe={setShowNewSubscribe}
                    trigger={
                        <TooltipBox content="Subscribe new feed">
                            <Icon><FolderPlus size={16}/></Icon>
                        </TooltipBox>
                    }
                />
                <TooltipBox content="Update">
                    <Icon onClick={startRefreshFeed}>
                        <RefreshCw size={16} className={`${refreshing ? "spinning" : ""}`}/>
                    </Icon>
                </TooltipBox>
            </div>
        </div>
    )
}