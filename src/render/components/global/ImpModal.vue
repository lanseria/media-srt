<template>
  <n-modal
    preset="card"
    :style="bodyStyle"
    :title="title"
    v-model:show="showModal"
    :on-after-leave="handleLeave"
  >
    <template #header-extra>
      <slot name="header-extra"></slot>
    </template>
    <slot></slot>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </n-modal>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { NModal } from "naive-ui";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    default: 600,
  },
});
const emit = defineEmits(["leave"]);
const showModal = ref(false);
const handleLeave = () => {
  emit("leave");
};
const bodyStyle = {
  width: `${props.width}px`,
};
defineExpose({
  showModal,
});
</script>
