<template>

  <div class="sendMsgBox">
    <el-input v-model="input"
              :autosize="{minRows: 11, maxRows: 11}"
              type="textarea"
              placeholder="请输入内容"
              resize="none"
              class="sel">
    </el-input>
    <el-button class="sendBtn" @click="onSend">发送</el-button>
  </div>


</template>

<script setup lang="ts">

import {ref, watch} from "vue";
import {useWebsocketStore} from "@/stores/websocketStore";
import {storeToRefs} from "pinia";
import {useChatInfo} from "@/stores/chatInfo";

const input = ref()
const chatInfoStore = useChatInfo()
const websocketStore = useWebsocketStore()
const {state, websocket} = storeToRefs(websocketStore)
const start = ref(false)

watch(state, (newVal) => {
  start.value = newVal === true;
})


function onSend() {
  if (start.value === true) {
    if (websocket.value!.readyState === WebSocket.OPEN) {
      let msg = chatInfoStore.chatId() + '-' + input.value
      websocket.value!.send(msg)

      input.value = ''
    }
  }
}

</script>

<style scoped>

.sendMsgBox {
  position: relative;
  width: 600px;
  height: 250px;
  background-color: #fffff9;
  border-top: #f7f8fa solid 3px;
}

.sendBtn {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
</style>
