import {Skeleton} from "./skeleton.tsx";

export const ArticleListItemPlaceholder = () => {
    return (
        <div className="p-3 pl-6 grid grid-cols-[1fr_auto] gap-1 relative">
            <div className="space-y-1">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full m-[-2px]" />
                <div className="flex gap-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-16" />
                </div>
            </div>
            <div className="justify-self-end">
                <Skeleton className="h-16 w-16" />
            </div>
        </div>
    );
}