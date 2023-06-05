import type { Router, Theme, EnhanceAppContext } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import BlogApp, {
  BlogHome,
  BlogGroup,
  BlogNotFound,
  BlogBilibili,
} from '../vitepress/index';

const define = <T>(value: T): T => value;

const inBrowser = typeof window !== 'undefined';

// Shiki主题, 所有主题参见: https://github.com/shikijs/shiki/blob/main/docs/themes.md
export default define<Theme>({
  ...DefaultTheme,
  Layout: BlogApp,
  NotFound: BlogNotFound,
  enhanceApp: (ctx: EnhanceAppContext) => {
    DefaultTheme.enhanceApp(ctx);
    const { app, router } = ctx;
    app.component('BlogHome', BlogHome);
    app.component('BlogGroup', BlogGroup);
    app.component('BlogBilibili', BlogBilibili);

    if (inBrowser) {
      router.onBeforeRouteChange = (to) => {
        if (typeof window._hmt != 'undefined') {
          window._hmt.push(['_trackPageview', to]);
        }
      };
    }
  },
});
