<template>
  <div class="blog-content">
    <div class="content-title" v-text="page.title"></div>
    <div class="content-description" v-text="page.description"></div>
  </div>
  <hr />
  <Content />
</template>

<script lang="ts" setup>
import { useData } from 'vitepress';

const { page } = useData();
</script>
