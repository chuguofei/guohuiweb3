import { HeadConfig } from 'vitepress';

export const htmlHead: HeadConfig[] = [
  [
    'link',
    {
      rel: 'icon',
      type: 'image/png',
      href: '/logo.png',
    },
  ],
  [
    'meta',
    {
      name: 'author',
      content: 'GuoHui',
    },
  ],
  [
    'meta',
    {
      property: 'og:title',
      content: 'Home',
    },
  ],
  [
    'meta',
    {
      property: 'og:description',
      content: 'Home of GuoHui',
    },
  ],
  [
    'script',
    {},
    `
        var _hmt = _hmt || [];
        ;(function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?bc1da6f3c88d52c477793e03f9c8049f";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();
      `,
  ],
];
