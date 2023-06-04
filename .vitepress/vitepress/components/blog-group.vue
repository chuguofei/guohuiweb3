<template>
  <div class="group-list">
    <div class="blog-group" v-for="(item, groupName) in group">
      <div class="section-group-title">{{ groupName }}</div>
      <div class="section-list">
        <a
          class="section-item"
          :href="withBase(group.hrefPath)"
          v-for="(group, index) in item"
        >
          <span class="sequence" v-text="index + 1"></span>

          <div class="section-item__img_warpper">
            <div class="description" v-text="group.info.description"></div>
            <img
              class="section-item__img"
              v-if="group.info.cover"
              :src="group.info.cover"
              :alt="group.info.description"
            />
          </div>

          <p class="title">
            {{ group.info.title }}
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useData, withBase } from 'vitepress';
import { computed } from 'vue';

const { theme } = useData();

const group = computed<GroupTypes>(() => theme.value.group);
</script>
