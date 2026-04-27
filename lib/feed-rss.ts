// lib/feed-rss.ts
import { Feed } from "feed";
import { posts } from "velite-generate";

// 博客全局配置（请替换为你的实际信息）
const BLOG_GLOBAL_CONFIG = {
    title: "anxiu-info",
    description: "分享技术、读书、生活的个人思考与总结",
    siteUrl: "https://your-blog-domain.com", // 你的博客域名（线上环境）
    author: {
        name: "Anxiu",
        email: "anxiu.fyc@foxmail.com", // 可选，用于 Atom 格式
        link: "https://your-blog-domain.com/about", // 可选，作者主页
    },
    favicon: "https://your-blog-domain.com/favicon.ico", // 可选，站点图标
};

/**
 * 生成多格式订阅内容（RSS 2.0、Atom 1.0、JSON Feed 1.1）
 * @returns 包含三种格式的订阅内容对象
 */
export function generateMultiFormatRss() {
    // 1. 初始化 Feed 实例
    const feed = new Feed({
        title: BLOG_GLOBAL_CONFIG.title,
        description: BLOG_GLOBAL_CONFIG.description,
        id: BLOG_GLOBAL_CONFIG.siteUrl, // 唯一标识（通常用站点域名）
        link: BLOG_GLOBAL_CONFIG.siteUrl,
        language: "zh-CN", // 博客语言
        favicon: BLOG_GLOBAL_CONFIG.favicon,
        author: BLOG_GLOBAL_CONFIG.author,
        copyright: `© ${new Date().getFullYear()} ${BLOG_GLOBAL_CONFIG.author.name}`,
        updated: new Date(), // Feed 最后更新时间
    });

    // 2. 合并并过滤所有已发布的博客文章（按发布时间倒序）
    const allPublishedPosts = [
        ...posts.filter((post) => post.published),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // 3. 为每篇文章添加到 Feed 中
    allPublishedPosts.forEach((post) => {
        const postFullUrl = `${BLOG_GLOBAL_CONFIG.siteUrl}${post.permalink}`; // 文章完整线上 URL

        feed.addItem({
            title: post.title,
            id: postFullUrl, // 文章唯一标识（用完整 URL 避免重复）
            link: postFullUrl,
            description: post.description || post.excerpt, // 文章描述（优先用 description，无则用 excerpt）
            content: post.excerpt, // 可选，文章摘要（部分订阅器会显示）
            author: [{ name: post.author, email: BLOG_GLOBAL_CONFIG.author.email }],
            date: new Date(post.date), // 文章发布时间
            // updated: new Date(post.updated_date), // 文章更新时间
            // category: post.tags, // 文章标签（作为订阅分类）
        });
    });

    // 4. 生成三种格式的订阅内容并返回
    return {
        rss2: feed.rss2(), // RSS 2.0 格式（最主流，支持绝大多数订阅器）
        atom1: feed.atom1(), // Atom 1.0 格式（国外订阅器常用，如 Feedly 优先支持）
        json1: feed.json1(), // JSON Feed 1.1 格式（适合开发者/现代应用订阅）
    };
}