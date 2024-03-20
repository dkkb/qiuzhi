import {ArticleModel} from "../model/ArticleModel.ts";
import {getFeedFavicon} from "../helpers/favicon.ts";
import "dayjs";
import dayjs from "dayjs";
import {Skeleton} from "../Components/skeleton.tsx";

interface ArticleDetailProps {
    article: ArticleModel;
}

export const ArticleDetail = ({article}: ArticleDetailProps) => {
    // Mock html content
    const pageContent = "<h1>pageContent</h1>"
    const ico = getFeedFavicon('https://www.zhihu.com/rss');
    const renderItem = (item: string) => {
        return (
            <span className="self-center h-20 leading-20 text-detail-paragraph">{item}</span>
        )
    }

    function createMarkup(html: string) {
        return {__html: html};
    }

    const renderMain = () => {
        return (
            <div
                key={article.uuid}
                className="reading-content text-detail-paragraph"
                dangerouslySetInnerHTML={createMarkup(pageContent)}
            />
        );
    }
    const renderPlaceholder = () => {
        const widths = ['w-2/3', 'w-3/4', 'w-5/6', 'w-full'];
        return (
            <div className="m-auto pt-1 pb-10 px-4 max-w-[calc(var(--reading-editable-line-width)_*_1px)]">
                <div className="pb-4">
                    <div className="mt-6 mb-5">
                        <Skeleton className="h-9"/>
                    </div>
                    <div className="text-sm grid grid-cols-[auto_auto_1fr] gap-3">
                        <Skeleton className="h-4 w-36"/>
                        <Skeleton className="h-4 w-36"/>
                    </div>
                </div>
                <div className="m-auto pt-1 mt-6 flex flex-col md:flex-row md:items-start">
                    <div className="flex-grow space-y-2">
                        {Array.from({length: 8}, (_) => (
                            <Skeleton className={`${widths[Math.floor(Math.random() * widths.length)]} h-4 rounded`}/>
                        ))}
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-4">
                        <Skeleton className="w-56 h-56 rounded-lg"/>
                    </div>
                </div>

                <div className="m-auto pt-1 mt-6 flex flex-col md:flex-row md:items-start">
                    <div className="w-full space-y-2">
                        {Array.from({length: 8}, (_) => (
                            <Skeleton className={`${widths[Math.floor(Math.random() * widths.length)]} h-4 rounded`}/>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    const renderDetail = () => {
        return (
            <div className="m-auto pt-1 pb-10 px-4 max-w-[calc(var(--reading-editable-line-width)_*_1px)]">
                <div className="pb-4 border-b border-border">
                    <div className="mt-6 mb-5 text-4xl font-bold text-detail-headline">
                        {article.title}
                    </div>
                    <div className="text-sm text-[hsl(var(--text-color))] grid grid-cols-[auto_auto_1fr] gap-3">
                        <span className="flex items-center h-5 leading-5">
                            <img src={ico} alt="" className="rounded"/>
                            {article.feed_title}
                        </span>
                        {article.author && renderItem(article.author)}
                        {renderItem(dayjs(new Date()).format("YYYY-MM-DD HH:mm"))}
                    </div>
                </div>
                <div className="m-auto pt-1 mt-6">
                    {article.image && (
                        <div className="w-full my-4 text-center">
                            <img src={article.image} alt="" className="bg-accent"/>
                        </div>
                    )}
                    {renderMain()}
                </div>
            </div>
        )
    }
    return (
        <div className="relative px-20 py-10">
            {article.uuid ? renderDetail() : renderPlaceholder()}
        </div>
    )
}