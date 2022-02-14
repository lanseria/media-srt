<template>
  <n-card>
    <n-page-header v-if="showHeader" :title="pageTitle" @back="handleBack">
      <template #avatar>
        <slot name="avatar"></slot>
      </template>
      <template #extra>
        <slot name="extra"></slot>
      </template>
    </n-page-header>
    <slot></slot>
  </n-card>
</template>
<script lang="ts" setup>
import { NPageHeader, NCard } from "naive-ui";
import { computed } from "vue";
import { useImpRoute } from "@render/hooks/useRoute";
const props = defineProps({
  isBack: {
    type: Boolean,
    default: false,
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "",
  },
});
const { goBack, crtMeta } = useImpRoute();
// computed
const pageTitle = computed(() => {
  return props.title || crtMeta.value.title;
});
const handleBack = props.isBack ? goBack : undefined;
</script>
