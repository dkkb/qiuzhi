import clsx from "clsx";
import {ArticleList} from "../PreviewLayout/ArticleList/ArticleList.tsx";

export const ArticleContainer = () => {
    return (
        <div className={clsx("relative grid h-[100vh] flex-1 pl-0", {})}>
            <div className="bg-panel flex h-full flex-1 overflow-hidden rounded-md">
                <ArticleList/>
            </div>
        </div>
    );
};
