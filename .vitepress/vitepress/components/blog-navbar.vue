<template>
  <div class="blog-header">
    <img class="logo" src="/logo.png" />
    <div class="blog-navbar">
      <a
        class="navbar-item"
        :class="{
          link: true,
          active: activeLink(item.link),
        }"
        v-for="item in navBar"
        :key="item.link"
        :href="item.link"
      >
        <p>{{ item.text }}</p>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useData, useRoute } from 'vitepress';

const { theme } = useData();

const route = useRoute();

const navBar = computed<Array<NavBar>>(() => {
  return theme.value.nav;
});

const activeLink = computed(() => {
  return function (link) {
    return route.path.startsWith(link);
  };
});
</script>
