import {Skeleton} from "./skeleton.tsx";

export const ArticleListItemPlaceholder = () => {
    return (
        <div className="p-3 pl-6 grid gap-1 relative">
            <Skeleton className="h-5 w-full"/>
            <div>
                <Skeleton className="h-3 w-full"/>
            </div>
            <div>
                <Skeleton className="h-3 w-full m-[-2px]"/>
            </div>
            <div>
                <Skeleton className="h-3 w-32"/>
            </div>
        </div>
    )
}