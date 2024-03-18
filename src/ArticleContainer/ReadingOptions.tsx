import {TooltipBox} from "../Components/tooltip.tsx";
import {Icon} from "../Components/icon.tsx";
import {Popover, PopoverTrigger} from "../Components/popover.tsx";
import {ExternalLink, Link, Paintbrush} from "lucide-react";

export const ReadingOptions = () => {
    const openInBrowser = () => {
    };
    const handleCopyLink = () => {
    }

    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <TooltipBox content="Customize style">
                        <Icon>
                            <Paintbrush size={16}/>
                        </Icon>
                    </TooltipBox>
                </PopoverTrigger>
            </Popover>
            <TooltipBox content="Open in browser">
                <Icon onClick={() => openInBrowser()}>
                    <ExternalLink size={16}/>
                </Icon>
            </TooltipBox>
            <TooltipBox content="Copy link">
                <Icon onClick={handleCopyLink}>
                    <Link size={16}/>
                </Icon>
            </TooltipBox>
        </>
    )
}