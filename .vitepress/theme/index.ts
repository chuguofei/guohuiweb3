import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import BlogApp, {
  BlogHome,
  BlogGroup,
  BlogNotFound,
  BlogBilibili,
} from '../vitepress/index';

const define = <T>(value: T): T => value;

// Shiki主题, 所有主题参见: https://github.com/shikijs/shiki/blob/main/docs/themes.md
export default define<Theme>({
  ...DefaultTheme,
  Layout: BlogApp,
  NotFound: BlogNotFound,
  enhanceApp: (ctx) => {
    DefaultTheme.enhanceApp(ctx);
    const { app } = ctx;
    app.component('BlogHome', BlogHome);
    app.component('BlogGroup', BlogGroup);
    app.component('BlogBilibili', BlogBilibili);
  },
});
