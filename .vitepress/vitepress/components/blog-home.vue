<template>
  <section class="home-posts-list">
    <a
      class="post-item"
      v-for="(post, index) in currentWikiData"
      :key="index"
      :href="post.hrefPath"
    >
      <img class="post-img" v-if="post.info.cover" :src="post.info.cover" />
      <div class="post-info">
        <div class="post-info__title">{{ post.info.title }}</div>
        <div class="post-info__description" v-if="post.info.description">
          {{ post.info.description }}
        </div>
        <!-- <div class="post-info__tags">
          <span
            class="tag-item"
            v-for="tag in post.info.tags"
            v-text="tag"
          ></span>
        </div> -->
        <div class="create-date">{{ post.info.date }}</div>
      </div>
    </a>
  </section>
  <ClientOnly>
    <div class="home-pagination">
      <el-pagination
        v-if="posts.length >= pageSize"
        small
        background
        :default-current-page="1"
        :current-page="currentPage"
        @update:current-page="handleUpdatePageNum"
        :page-size="pageSize"
        :total="posts.length"
        layout="prev, pager, next, jumper"
      />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useData, useRouter } from 'vitepress';
import { ElPagination } from 'element-plus';
import { useBrowserLocation } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import { HOME_PAGE_SIZE } from '~/utils/constant';

const currentPage = ref();

const { theme } = useData();

const posts = computed<Array<PostsTypes>>(() => theme.value.posts);

const pageSize = computed(() => HOME_PAGE_SIZE);

const currentWikiData = computed(() => {
  const startIdx = (currentPage.value - 1) * pageSize.value;
  const endIdx = startIdx + pageSize.value;
  return posts.value.slice(startIdx, endIdx);
});

const router = useRouter();
const location = useBrowserLocation();
const queryPageNumKey = 'page';
const handleUpdatePageNum = (current: number) => {
  if (currentPage.value === current) return;
  currentPage.value = current;
  const { searchParams } = new URL(window.location.href!);
  searchParams.delete(queryPageNumKey);
  searchParams.append(queryPageNumKey, String(current));
  router.go(
    `${location.value.origin}${router.route.path}?${searchParams.toString()}`
  );
};

watch(
  location,
  () => {
    if (location.value.href) {
      const { searchParams } = new URL(location.value.href);
      if (searchParams.has(queryPageNumKey)) {
        currentPage.value = Number(searchParams.get(queryPageNumKey));
      } else {
        currentPage.value = 1;
      }
    }
  },
  {
    immediate: true,
  }
);
</script>
