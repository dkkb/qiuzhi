import {TooltipBox} from "../../Components/tooltip.tsx";
import {Icon} from "../../Components/icon.tsx";
import {FolderPlus, RefreshCw} from "lucide-react";
import {NewSubscribe} from "./NewSubscribe.tsx";
import {useState} from "react";

interface TopSideBarProps {
    lastUpdatedAt: string,
    startRefreshFeed: () => void,
    refreshing: boolean,
}

export const TopSideBar = ({lastUpdatedAt, startRefreshFeed, refreshing}: TopSideBarProps) => {
    const [showNewSubscribe, setShowNewSubscribe] = useState(false);

    return (
        <div className="flex h-[var(--app-toolbar-height)] items-center justify-end bg-[var(--background)] px-2 py-0">
            <div className="flex justify-start">
                <span className="text-sm text-gray-500 item-center">Last updated at {lastUpdatedAt}</span>
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