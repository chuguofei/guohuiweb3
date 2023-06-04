type NavBar = {
  text?: string;
  link?: string;
};

type PostHeaderTypes = {
  title: string;
  description: string;
  date: string;
  cover?: string;
  tags?: Array<string>;
  // 分组使用
  group?: string;
  sort?: number;
};

type PostsTypes = {
  info: PostHeaderTypes;
  content: string;
  hrefPath: string;
};

type GroupTypes = Record<string, PostsTypes[]>;

type BlogTypes = {
  allArticle: Array<PostsTypes>;
  posts: PostsTypes[];
  group: GroupTypes;
};
