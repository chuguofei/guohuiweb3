<template>
  <ClientOnly>
    <div class="bilibili">
      <iframe
        :src="decodedSrc"
        width="100%"
        height="100%"
        scrolling="no"
        border="0"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
      >
      </iframe>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  src: {
    type: string;
  };
}>();

const decodedSrc = computed(() => decodeURIComponent(props.src!));
</script>
