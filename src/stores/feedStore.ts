import {StateCreator} from "zustand";
import {FeedItem} from "../model/Feed.ts";
import {SubscribeItem, SubscribeItemType} from "../model/SubscribeItem.ts";
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
                { id: "c9b8a929", title: 'IT桔子', url: 'https://www.itjuzi.com/api/telegraph.xml' },
                {
                    id: "d7d6f7c4",
                    type: SubscribeItemType.FOLDER,
                    folder_name: 'Read',
                    children: [
                        { id: "f0b9e7d8", title: '少数派', url: 'https://sspai.com/feed' },
                    ]
                } as Folder,
                {
                    id: "b2d6c5d5",
                    type: SubscribeItemType.FOLDER,
                    folder_name: 'Product',
                    children: [
                        { id: "7b4a5e7e", title: '人人都是产品经理', url: 'https://www.woshipm.com/feed' },
                    ]
                } as Folder,
                {
                    id: "6c90fb87",
                    type: SubscribeItemType.FOLDER,
                    folder_name: 'News',
                    children: [
                        { id: "0bd2cb9e", title: 'Readhub', url: 'https://rsshub.app/readhub' },
                        { id: "d9f87856", title: '虎嗅网', url: 'https://www.huxiu.com/rss/0.xml' },
                        { id: "c4f38b87", title: '南方周末', url: 'http://feedmaker.kindle4rss.com/feeds/nanfangzhoumo.weixin.xml' },
                        { id: "6f7b3d97", title: '财富中文网', url: 'https://rsshub.app/fortunechina' },
                        { id: "9ef9a76e", title: '参考消息', url: 'https://feedmaker.kindle4rss.com/feeds/ckxxwx.weixin.xml' },
                        { id: "dde3c49f", title: '哈佛商业评论', url: 'https://plink.anyfeeder.com/weixin/hbrchinese' },
                        { id: "5a8ec4b9", title: '知乎每日精选', url: 'https://www.zhihu.com/rss' },
                        { id: "a483ae6a", title: 'Hacker News Daily', url: 'https://www.daemonology.net/hn-daily/index.rss' },
                        {
                            id: "c9a3ed03",
                            title: '一觉醒来世界发生了什么 - 即刻',
                            url: 'https://rsshub.app/jike/topic/text/553870e8e4b0cafb0a1bef68'
                        },
                    ]
                } as Folder,
                {
                    id: "d5ef3865",
                    type: SubscribeItemType.FOLDER,
                    folder_name: 'Tech blog',
                    children: [
                        { id: "f2fcca98", title: 'InfoQ CN', url: 'https://www.infoq.com/cn/feed' },
                        {
                            id: "98f02306",
                            title: 'AWS Security Blog',
                            url: 'https://blogs.aws.amazon.com/security/blog/feed/recentPosts.rss'
                        },
                        { id: "94940858", title: 'AWS Architecture Blog', url: 'https://www.awsarchitectureblog.com/atom.xml' },
                        { id: "f2462889", title: 'AWS Official Blog', url: 'https://aws.amazon.com/blogs/aws/feed/' },
                        { id: "dcce0ae2", title: '美团技术团队', url: 'https://tech.meituan.com/feed/' },
                        { id: "0885039c", title: 'The Netflix Tech Blog', url: 'http://techblog.netflix.com/feeds/posts/default' },
                        { id: "b0ae7d7f", title: 'Dropbox Tech Blog', url: 'https://tech.dropbox.com/feed/' },
                        { id: "9325c5ee", title: 'Facebook Engineering', url: 'https://engineering.fb.com/feed/' },
                        { id: "8dc3bf95", title: 'InfoQ', url: 'https://www.infoq.com/rss/rss.action' },
                    ]
                } as Folder,
                {
                    id: "e616cdae",
                    type: SubscribeItemType.FOLDER,
                    folder_name: 'Invest',
                    children: [
                        { id: "fbe92cbf", title: '商业深度-投中网', url: 'https://rsshub.app/chinaventure/news/78' },
                        { id: "c58ada40", title: '疯投圈', url: 'https://crazy.capital/feed' },
                        {
                            id: "36dbee98",
                            title: '一起做投资人 - 即刻主题精选',
                            url: 'https://rsshub.app/jike/topic/58412cc399a0b50010877f8e'
                        },
                        { id: "00b56bf8", title: '今日话题 - 雪球', url: 'https://xueqiu.com/hots/topic/rss' },
                    ]
                } as Folder,
                {
                    id: "a72b6c1d",
                    type: SubscribeItemType.FOLDER,
                    folder_name: "AI",
                    children: [
                        { id: "f9e2d3b8", title: 'Google AI Blog', url: 'https://googleaiblog.blogspot.com/atom.xml' },
                        { id: "e7c4a5f6", title: 'OpenAI Blog', url: 'https://rsshub.app/openai/blog' },
                        { id: "b8d9f2e1", title: 'Andreessen Horowitz', url: 'https://a16z.com/feed/' },
                        { id: "c6a3b7d4", title: 'Microsoft AI Blog', url: 'https://blogs.microsoft.com/ai/feed/' },
                    ],
                } as Folder,
            ] as SubscribeItem[]
        }
        set(() => ({
            feedList: a.data || [],
        }));
    },
})