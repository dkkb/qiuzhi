import {StateCreator} from "zustand";
import {FeedItem} from "../model/Feed.ts";
import {SubscribeItem} from "../model/SubscribeItem.ts";
import {Folder} from "../model/Folder.ts";

export interface FeedStore {
    feed: FeedItem | null,
    feedList: SubscribeItem[],
    setFeedList: (item: FeedItem) => void;
    getFeedList: () => void;
}

export const useFeedStore: StateCreator<FeedStore> = (set, get) => ({
    feed: null,
    feedList: [],
    setFeedList: (item: FeedItem) => {
        set({
            feed: item
        })
    },

    getFeedList: () => {
        const a = {
            data: [
                {title: 'IT桔子', feed_url: 'https://www.itjuzi.com/api/telegraph.xml'},
                {
                    folder_name: 'Read',
                    children: [
                        {title: '少数派', feed_url: 'https://sspai.com/feed'},
                    ]
                } as Folder,
                {
                    folder_name: 'Product',
                    children: [
                        {title: '人人都是产品经理', feed_url: 'https://www.woshipm.com/feed'},
                    ]
                } as Folder,
                {
                    folder_name: 'News',
                    children: [
                        {title: 'Readhub', feed_url: 'https://rsshub.app/readhub'},
                        {title: '虎嗅网', feed_url: 'https://www.huxiu.com/rss/0.xml'},
                        {title: '南方周末', feed_url: 'http://feedmaker.kindle4rss.com/feeds/nanfangzhoumo.weixin.xml'},
                        {title: '财富中文网', feed_url: 'https://rsshub.app/fortunechina'},
                        {title: '参考消息', feed_url: 'https://feedmaker.kindle4rss.com/feeds/ckxxwx.weixin.xml'},
                        {title: '哈佛商业评论', feed_url: 'https://plink.anyfeeder.com/weixin/hbrchinese'},
                        {title: '知乎每日精选', feed_url: 'https://www.zhihu.com/rss'},
                        {title: 'Hacker News Daily', feed_url: 'https://www.daemonology.net/hn-daily/index.rss'},
                        {
                            title: '一觉醒来世界发生了什么 - 即刻',
                            feed_url: 'https://rsshub.app/jike/topic/text/553870e8e4b0cafb0a1bef68'
                        },
                    ]
                } as Folder,
                {
                    folder_name: 'Tech blog',
                    children: [
                        {title: 'InfoQ CN', feed_url: 'https://www.infoq.com/cn/feed'},
                        {
                            title: 'AWS Security Blog',
                            feed_url: 'https://blogs.aws.amazon.com/security/blog/feed/recentPosts.rss'
                        },
                        {title: 'AWS Architecture Blog', feed_url: 'https://www.awsarchitectureblog.com/atom.xml'},
                        {title: 'AWS Official Blog', feed_url: 'https://aws.amazon.com/blogs/aws/feed/'},
                        {title: '美团技术团队', feed_url: 'https://tech.meituan.com/feed/'},
                        {title: 'The Netflix Tech Blog', feed_url: 'http://techblog.netflix.com/feeds/posts/default'},
                        {title: 'Dropbox Tech Blog', feed_url: 'https://tech.dropbox.com/feed/'},
                        {title: 'Facebook Engineering', feed_url: 'https://engineering.fb.com/feed/'},
                        {title: 'InfoQ', feed_url: 'https://www.infoq.com/rss/rss.action'},
                    ]
                } as Folder,
                {
                    folder_name: 'Invest',
                    children: [
                        {title: '商业深度-投中网', feed_url: 'https://rsshub.app/chinaventure/news/78'},
                        {title: '疯投圈', feed_url: 'https://crazy.capital/feed'},
                        {
                            title: '一起做投资人 - 即刻主题精选',
                            feed_url: 'https://rsshub.app/jike/topic/58412cc399a0b50010877f8e'
                        },
                        {title: '今日话题 - 雪球', feed_url: 'https://xueqiu.com/hots/topic/rss'},
                    ]
                } as Folder,
                {
                    folder_name: "AI",
                    children: [
                        {title: 'Google AI Blog', feed_url: 'https://googleaiblog.blogspot.com/atom.xml'},
                        {title: 'OpenAI Blog', feed_url: 'https://rsshub.app/openai/blog'},
                        {title: 'Andreessen Horowitz', feed_url: 'https://a16z.com/feed/'},
                        {title: 'Microsoft AI Blog', feed_url: 'https://blogs.microsoft.com/ai/feed/'},
                    ],
                } as Folder,
            ] as SubscribeItem[]
        }
        set(() => ({
            feedList: a.data || [],
        }));
    },
})