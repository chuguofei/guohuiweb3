const getNarBar = () => {
  return [
    {
      text: '🏡 首页',
      link: '/',
    },
    {
      text: '集合列表',
      link: '/group',
    },
    {
      text: '🔥 RSS',
      link: 'http://guohuiweb3.cn/feed.xml',
    },
  ] as NavBar;
};

export const nav = getNarBar();
