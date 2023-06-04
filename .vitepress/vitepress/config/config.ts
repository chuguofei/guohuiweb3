import path from 'path';
import glob from 'fast-glob';
import matter from 'gray-matter';
import fs from 'fs';
import dayjs from 'dayjs';
import consola from 'consola';
import chalk from 'chalk';
import { ARTICE_ENTER } from '../utils/constant';

const log = consola.log;

const getPostsData: () => Promise<BlogTypes> = async () => {
  let postsAll: BlogTypes = await new Promise((resolve) => {
    const paths = glob.sync([`${ARTICE_ENTER}/**/**.md`], {
      ignore: ['node_modules', 'README.md'],
      cwd: path.resolve(__dirname, '..', '..', '..'),
      absolute: false,
      onlyFiles: true,
    });
    const result: Array<PostsTypes> = postTransforms(paths);
    const groupAll = getGroupArticle(result);
    resolve({ allArticle: result, posts: result, group: groupAll });
  });
  return postsAll;
};

function postTransforms(paths) {
  const result = paths.map((path) => {
    const fileContent = fs.readFileSync(path, 'utf-8');
    const { data, content } = matter(fileContent);
    data.date = dayjs(data.date).format('YYYY-MM-DD');
    return {
      info: data,
      content,
      hrefPath: `/${path.replace('.md', '.html')}`,
    };
  });
  return result.sort((a, b) =>
    new Date(a.info.date) < new Date(b.info.date) ? 1 : -1
  );
}

// 合集文章
function getGroupArticle(posts: Array<PostsTypes>) {
  const groupResult = {};
  try {
    const groups = posts
      .filter((post) => post.info.group)
      .sort((a, b) => ((a.info.sort ?? 0) > (b.info!.sort ?? 0) ? 1 : -1));
    groups.forEach((post) => {
      const { group } = post.info;
      if (Reflect.get(groupResult, group!)) {
        groupResult[group!].push(post);
      } else {
        groupResult[group!] = [post];
      }
    });
  } catch {
    log(chalk.red(`缺少group标志！！！`));
  }
  return groupResult;
}

export { getPostsData };
