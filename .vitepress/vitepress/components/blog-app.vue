<template>
  <Layout>
    <template #layout-top> </template>
    <template #doc-before>
      <ClientOnly>
        <BlogArticleHeader />
      </ClientOnly>
      <BlogImagePreview />
    </template>
    <template #home-hero-before>
      <BlogHomeHero />
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme';
import { computed } from 'vue';
import { useData, useRoute } from 'vitepress';
import BlogImagePreview from './blog-image-preview.vue';
import BlogArticleHeader from './blog-article-header.vue';
import BlogHomeHero from './blog-home-hero.vue';
const { Layout } = DefaultTheme;

const route = useRoute();
</script>
