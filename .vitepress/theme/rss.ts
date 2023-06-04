import { dirname } from 'path';
import path from 'path';
import fs from 'fs-extra';
import MarkdownIt from 'markdown-it';
import type { FeedOptions, Item } from 'feed';
import { Feed } from 'feed';

const DOMAIN = 'http://guohuiweb3.cn';
const AUTHOR = {
  name: 'GuoHui',
  email: '1633295391@qq.com',
  link: DOMAIN,
};
const OPTIONS: FeedOptions = {
  title: 'GuiHui',
  description: "GuiHui' Blog",
  id: `${DOMAIN}/`,
  link: `${DOMAIN}/`,
  copyright: 'MIT License',
  feedLinks: {
    json: DOMAIN + '/feed/feed.json',
    atom: DOMAIN + '/feed/feed.atom',
    rss: DOMAIN + '/feed/feed.xml',
  },
  author: AUTHOR,
  image: `${DOMAIN}/logo.png`,
  favicon: `${DOMAIN}/logo.png`,
};

const markdown = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
});

export function buildBlogRSS(allArticle: Array<PostsTypes>): any {
  const posts = generateRSS(allArticle);
  writeFeed('feed', posts);
}

function generateRSS(allArticle: Array<PostsTypes>): Item[] {
  const copyData = JSON.parse(JSON.stringify(allArticle));
  const posts: Item[] = copyData.map((data) => {
    const { info, hrefPath, content } = data;
    const articleDate = info.date;
    if (data.info.date) {
      delete data.info.date;
    }
    const html = markdown.render(content).replace('src="/', `src="${DOMAIN}/`);
    const mapResult = {
      ...info,
      date: new Date(articleDate),
      content: html,
      author: [AUTHOR],
      link: `${DOMAIN}/${hrefPath}`,
    };
    return mapResult;
  }) as Item[];

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return posts;
}

async function writeFeed(name: string, items: Item[]) {
  const feed = new Feed(OPTIONS);
  items.forEach((item) => feed.addItem(item));

  await fs.writeFile(`./.vitepress/dist/${name}.xml`, feed.rss2(), 'utf-8');
  await fs.writeFile(`./.vitepress/dist/${name}.atom`, feed.atom1(), 'utf-8');
  await fs.writeFile(`./.vitepress/dist/${name}.json`, feed.json1(), 'utf-8');
}
