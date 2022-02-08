<template>
  <router-view />
</template>
<script lang="ts" setup>
import { useMessage, useNotification, useDialog } from "naive-ui";
window.$message = useMessage();
window.$notification = useNotification();
window.$dialog = useDialog();
</script>
