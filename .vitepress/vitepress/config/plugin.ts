import MarkdownIt from 'markdown-it';
import mdContainer from 'markdown-it-container';
import consola from 'consola';
import chalk from 'chalk';

export const mdPlugin = (md: MarkdownIt) => {
  md.use(mdContainer, 'bilibili', {
    validate(params) {
      return !!params.trim().match(/^bilibili\s*(.*)$/);
    },

    render(tokens, idx) {
      if (tokens[idx].nesting === 1) {
        const sourceFileToken = tokens[idx + 2];

        const bilibiliSrc = sourceFileToken.children?.[1].content ?? '';

        return `<BlogBilibili src="${encodeURIComponent(bilibiliSrc)}">`;
      } else {
        return '</BlogBilibili>';
      }
    },
  });
};
