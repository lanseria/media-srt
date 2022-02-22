<template>
  <div class="subtitle-media-wrap">{{ subtitlesText }}</div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useTransfyStore } from "@render/store/modules/transfy";
const transfyStore = useTransfyStore();
const subtitlesText = computed(() => {
  const idx = transfyStore.subtitles.findIndex(
    (m) => m.id === transfyStore.waveId
  );
  if (idx >= 0) {
    return transfyStore.subtitles[idx].FinalSentence;
  } else {
    return "";
  }
});
</script>
<style lang="css" scoped>
.subtitle-media-wrap {
  position: absolute;
  transform: translate3d(-50%, -50%, 0px);
  left: 50%;
  bottom: 25%;
}
</style>
