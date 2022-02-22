<template>
  <div id="wave-timeline"></div>
  <div id="waveform"></div>
</template>
<script lang="ts" setup>
import { RegionParams } from "wavesurfer.js/src/plugin/regions";
import { onMounted, watchEffect, computed } from "vue";
import { useTransfyStore } from "@render/store/modules/transfy";
import { useThemeVars } from "naive-ui";
const transfyStore = useTransfyStore();
const themeVars = useThemeVars();
const regions = computed(() => {
  return transfyStore.subtitles.map((m) => {
    return {
      id: m.id,
      start: m.StartMs / 1000,
      end: m.EndMs / 1000,
      loop: false,
      drag: false,
      resize: false,
      color: "hsla(400, 100%, 30%, 0.1)",
    } as unknown as RegionParams;
  });
});
onMounted(() => {
  watchEffect(() => {
    transfyStore.wavesurfer.setProgressColor(themeVars.value.infoColor);
    transfyStore.wavesurfer.setWaveColor(themeVars.value.primaryColor);
    if (transfyStore.wavesurferReady && transfyStore.subtitles.length) {
      transfyStore.wavesurfer.clearRegions();
      regions.value.forEach((opt) => {
        transfyStore.wavesurfer.addRegion(opt);
      });
    }
  });
});
transfyStore.$subscribe((mutation, state) => {
  if (!state.wavesurferLoading && state.videoLoaded && !state.wavesurferReady) {
    console.log("wavesurfer loading");
    transfyStore.$patch({
      wavesurferLoading: true,
    });
  }
});
</script>
<style lang="css">
#waveform {
  position: relative;
  opacity: 0.5;
}
#waveform > wave > wave > canvas {
  top: 50% !important;
}
#waveform > wave > canvas {
  top: 50% !important;
}
#waveform > wave::-webkit-scrollbar {
  display: none;
}
</style>
