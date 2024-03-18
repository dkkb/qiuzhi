import clsx from "clsx";
import {ArticleList} from "../PreviewLayout/ArticleList/ArticleList.tsx";
import {Snail} from "lucide-react";
import {ArticleDetail} from "./ArticleDetail.tsx";
import {motion, AnimatePresence} from "framer-motion";
import {useBearStore} from "../stores";
import {ScrollBox, ScrollBoxRefObject} from "../Components/ScrollBox.tsx";
import {useRef} from "react";
import {Separator} from "../Components/separator.tsx";
import {ReadingOptions} from "./ReadingOptions.tsx";

export const ArticleContainer = () => {
    const isEmpty = false;
    const store = useBearStore((state) => ({
        feed: state.feed,
        article: state.article,
    }));

    const emptyPlaceholder = () => {
        return (
            <div
                className="top-1/2 flex-col gap-1 text-muted-foreground flex items-center justify-center h-full w-full">
                <Snail size={34} strokeWidth={1}/>
                <p>Yay, no matching items.</p>
            </div>
        )
    }
    const renderPlaceholder = () => {
        return (
            <div className="py-10 text-xl">
                <p>Let's read something</p>
            </div>
        );
    };

    const scrollBoxRef = useRef<ScrollBoxRefObject>(null);

    const a = () => {
        return (
            <div className="flex-1">
                <div
                    className={
                        "h-[var(--app-toolbar-height)] flex items-center justify-end px-2 space-x-0.5 border-b relative z-10"
                    }
                >
                    <Separator orientation={"vertical"} className={"h-4 mx-2"}/>
                    <span>
                        <Separator orientation="vertical" className="h-4 mx-2"/>
                    </span>
                    <ReadingOptions/>
                    <Separator orientation="vertical" className="h-4 mx-2"/>

                </div>
                <AnimatePresence>
                    <motion.article
                        key={store.article?.uuid || "view"}
                        initial={{y: 20, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        exit={{y: -20, opacity: 0}}
                        transition={{duration: 0.2}}
                        className="overflow-hidden"
                    >
                        <ScrollBox className="h-[calc(100vh_-_var(--app-toolbar-height))]" ref={scrollBoxRef}>
                            <div
                                className="font-[var(--reading-font-body)] min-h-full m-auto sm:px-5 sm:max-w-xl lg:px-10 lg:max-w-5xl">
                                {" "}
                                {store.article ? <ArticleDetail/> : renderPlaceholder()}
                            </div>
                        </ScrollBox>
                    </motion.article>
                </AnimatePresence>
            </div>
        )
    }

    return (
        <div className={clsx("relative grid h-[100vh] flex-1 pl-0", {})}>
            <div className="bg-panel flex h-full flex-1 overflow-hidden rounded-md">
                <ArticleList/>
                {isEmpty ? emptyPlaceholder() : a()}
            </div>
        </div>
    );
};
