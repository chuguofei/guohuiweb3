<script setup lang="ts">
import { ElImageViewer } from 'element-plus';
import { onMounted, onUnmounted, reactive, ref } from 'vue';

const show = ref(false);
const previewImageInfo = reactive<{ url: string; list: string[]; idx: number }>(
  {
    url: '',
    list: [],
    idx: 0,
  }
);
const previewImage = (e: Event) => {
  const target = e.target as HTMLElement;
  const url = target.getAttribute('src');

  const currentTarget = e.currentTarget as HTMLElement;
  if (target.tagName.toLowerCase() === 'img') {
    const imgs = currentTarget.querySelectorAll<HTMLImageElement>(
      '.content-container .main img'
    );
    const idx = Array.from(imgs).findIndex((el) => el === target);
    const urls = Array.from(imgs).map((el) => el.src);

    if (idx === -1) return;

    previewImageInfo.url = url!;
    previewImageInfo.list = urls;
    previewImageInfo.idx = idx;

    console.error(imgs);

    document.body.setAttribute('style', 'overflow: hidden;');

    show.value = true;
  }
};

const onClose = () => {
  document.body.setAttribute('style', 'overflow: inherit;');
  show.value = false;
};

onMounted(() => {
  const docDomContainer = document.querySelector('#VPContent');
  docDomContainer?.addEventListener('click', previewImage);
});

onUnmounted(() => {
  const docDomContainer = document.querySelector('#VPContent');
  docDomContainer?.removeEventListener('click', previewImage);
});
</script>

<template>
  <ElImageViewer
    :infinite="false"
    hide-on-click-modal
    teleported
    @close="onClose"
    :url-list="previewImageInfo.list"
    :initial-index="previewImageInfo.idx"
    v-if="show"
  />
</template>
