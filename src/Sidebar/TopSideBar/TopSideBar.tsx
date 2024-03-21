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
        <div
            className="flex justify-between items-center px-4 pt-2 h-[var(--app-toolbar-height)] bg-[var(--background)]">
            <div className="flex flex-col justify-start">
                <div className="text-sm text-gray-500 mb-1 px-2">Last updated</div>
                <div className="text-sm text-gray-500 px-2">{lastUpdatedAt}</div>
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