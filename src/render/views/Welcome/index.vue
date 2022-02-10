<template>
  <n-empty style="padding: 100px 0" description="是一个飞机">
    <template #icon>
      <n-icon>
        <AirplaneIcon />
      </n-icon>
    </template>
    <template #extra>
      <n-button size="small" @click="open()">看看别的</n-button>
    </template>
  </n-empty>
</template>
<script lang="ts" setup>
import { NEmpty, NIcon, NButton } from "naive-ui";
import { Airplane as AirplaneIcon } from "@vicons/ionicons5";
import { useImpRoute } from "@render/hooks/useRoute";
const { pushPath } = useImpRoute();
const open = () => {
  pushPath("/media-srt");
};
</script>
