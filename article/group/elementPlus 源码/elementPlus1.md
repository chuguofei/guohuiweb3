---
title: elementPlus 源码解析 第一章
description: elementPlus 源码解析 第一章elementPlus 源码解析 第一章elementPlus 源码解析 第一章
date: 2022-07-02
cover: maxresdefault.jpg

tags:
  - elementPlus
  - 源码
  - 标签
  - Vue
  - Typescript

group: elementPlus 源码解析
---

# 快速入门

## 前言

```javascript
const a = 123;

function fun() {
  return 123;
}
console.log(123);
console.log(123);
console.log(123);
console.log(123);
```

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

**C：** 在 Java Web 的日常开发中，风靡中日韩的持久层框架 MyBatis ，想必你不会陌生。如果你不认识它，那么本篇目前不适合你，请先学习 [《MyBatis 快速入门》](/courses/mybatis/index.html) 后再过来。

MyBatis 框架，作为一款非常优秀的 **半自动的持久层 ORM 框架** 。它支持自定义 SQL、动态 SQL、存储过程以及高级映射， **免除了几乎所有的 JDBC 代码以及设置参数和获取结果集的工作** 。

它的确很好，但是你也再看看下方代码。在 MyBatis 中，不同实体的基础数据操作几乎属于套模板一样。尤其是在项目搭建初期，要写一大堆的基础 CRUD。随着开发工作量及工作时间上升，这就又成了天下程序员苦之久矣的事儿。

```java
public interface UserMapper {
    // 增加
    int insert(User user);
    // 修改
    int update(User user);
    // 删除
    int deleteById(@Param("id") Long id);
    // 根据ID查询
    User selectById(@Param("id") Long id);
    // 根据条件查询总记录数
    Integer selectCount(Map<String, Object> params);
    // 根据条件查询列表
    List<User> selectByMap(Map<String, Object> params);
}
```

![图片](https://img.cdn.sugarat.top/mdImg/MTYyMzY0MjU5MjE3Mg==%E6%97%B6%E5%85%89%E6%81%8B%E4%BA%BA.png)

## 视频

:::bilibili

//player.bilibili.com/player.html?aid=438495541&bvid=BV1YL411o74w&cid=1051542741&page=1

:::
