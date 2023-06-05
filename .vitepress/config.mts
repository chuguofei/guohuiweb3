import type { UserConfig } from 'vitepress';
import { nav, getPostsData } from './vitepress/config';
import { mdPlugin } from './vitepress/config/plugin';
import { buildBlogRSS } from './theme/rss';
import consola from 'consola';
import chalk from 'chalk';
import { htmlHead } from './vitepress/utils/head';

// https://vitepress.dev/reference/site-config
export const config: () => Promise<UserConfig> = async () => {
  const { allArticle, posts, group } = await getPostsData();

  return {
    title: 'GuoHuiWEB3',
    description: 'GuoHui站点',
    ignoreDeadLinks: true,
    head: htmlHead,
    lastUpdated: false,
    themeConfig: {
      logo: 'logo.png',
      search: {
        provider: 'local',
      },
      outline: {
        level: [2, 6],
        label: '目录',
      },
      footer: {
        message:
          '<a target="_blank" href="https://theme.sugarat.top/">京ICP备2023013710号</a>',
        copyright: 'Powered by guohuiweb3 | © Copyright © 2019-2023 ',
      },
      nav,
      posts,
      group,
    },
    markdown: {
      config: (md) => mdPlugin(md),
    },
    buildEnd: () => {
      buildBlogRSS(allArticle);
    },
  };
};

export default config();
