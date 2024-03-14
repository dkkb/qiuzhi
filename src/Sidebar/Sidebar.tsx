import {TopSideBar} from "./TopSideBar/TopSideBar.tsx";
import {Outlet} from "react-router-dom";

export const Sidebar = () => {
    return (
        <div className="flex flex-row h-full bg-canvas ">
            <div
                className="relative flex h-full w-1/6 max-w-[300px] select-none flex-col text-[hsl(var(--foreground))] shadow"
            >
                <div
                    className="flex h-[var(--app-toolbar-height)] items-center justify-end bg-[var(--background)] px-2 py-0">
                    <TopSideBar lastUpdatedAt={"lastUpdatedAt"}/>
                </div>
            </div>
            <Outlet/>
        </div>
    )
}