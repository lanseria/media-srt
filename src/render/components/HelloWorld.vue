<template>
  <h1>{{ title }}</h1>

  <textarea cols="60" rows="10" v-model="log" disabled />
  <div style="margin-top: 20px">
    <n-input
      style="width: 200px"
      v-model:value="msg"
      placeholder="send msg to main process"
    ></n-input>
    <n-button style="margin-left: 20px" @click="sendMsg">Send</n-button>
  </div>
</template>

<script setup lang="ts">
import { EVENTS } from "@common/events";
import { sendMsgToMainProcess } from "@render/api";
import { useIpc } from "@render/plugins/ipc";
import { ref } from "vue";
import { NInput, NButton } from "naive-ui";
defineProps({
  title: {
    type: String,
    default: "Vite + Electron & Esbuild",
  },
});

const log = ref("");
const msg = ref("");

const sendMsg = async () => {
  try {
    console.log(msg.value);
    log.value += `[render]: ${msg.value} \n`;
    const { data } = await sendMsgToMainProcess(msg.value);
    log.value += `[main]: ${data}  \n`;
  } catch (error) {
    console.error(error);
  }
};

const ipc = useIpc();

ipc.on(EVENTS.REPLY_MSG, (msg: string) => {
  log.value += `[main]: ${msg}  \n`;
});
</script>

<style></style>
