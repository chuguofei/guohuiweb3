<template>
  <img class="blog-doc-cover" v-if="cover" :src="getUrl" />
</template>

<script lang="ts" setup>
import { useData } from 'vitepress';
import { computed } from 'vue';
const { frontmatter } = useData();
const cover = computed(() => frontmatter.value.cover);

const getUrl = computed(() => {
  return cover.value.startsWith('http')
    ? cover.value
    : cover.value[0] == '/'
    ? cover.value
    : `/${cover.value}`;
});
</script>

<style lang="scss" scoped>
img.blog-doc-cover.blog-doc-cover.blog-doc-cover {
  width: 100%;
  object-fit: cover;
  max-height: none;
  margin-top: 20px;
}
</style>
