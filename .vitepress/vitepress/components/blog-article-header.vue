<template>
  <div class="article-warpper">
    <div class="article-title">{{ frontmatter.title }}</div>

    <div class="article-info">
      <span class="article-block">
        <el-icon><Clock /></el-icon>
        <span class="article-block__value">
          {{ formatShowDate(frontmatter.date) }}
        </span>
      </span>
    </div>

    <div v-if="frontmatter.tags" class="article-tags">
      <span
        class="article-tag"
        v-for="tag in frontmatter.tags"
        v-text="tag"
      ></span>
    </div>

    <BlogCover />
  </div>
</template>

<script lang="ts" setup>
import { useData } from 'vitepress';
import { ElIcon } from 'element-plus';
import { Clock } from '@element-plus/icons-vue';
import { formatShowDate } from '../utils/index';
import BlogCover from './blog-cover.vue';

const { frontmatter } = useData();
</script>
