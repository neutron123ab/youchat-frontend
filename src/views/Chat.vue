<template>

  <div class="chatBox">
    <MsgList/>
    <ChatInfo/>
  </div>

</template>

<script setup lang="ts">

import MsgList from "@/components/MsgList.vue";
import ChatInfo from "@/components/ChatInfo.vue";
import {onBeforeMount} from "vue";
import axios from "axios";
import {useMsgList} from "@/stores/msgList";
import {storeToRefs} from "pinia";

onBeforeMount(connectWebSocket)

function connectWebSocket() {
  const msgListStore = useMsgList()
  const {msgList} = storeToRefs(msgListStore)
  let webSocket
  axios.request({
    method: 'GET',
    url: '/checkCertificate'
  }).then(function (res) {
    if ('WebSocket' in window) {
      console.log("当前浏览器支持websocket")
      webSocket = new WebSocket("ws://localhost:8088/chat");

      //收到服务器回送的消息
      webSocket.onmessage = function (ev) {
        //服务器回送消息格式，index 0：userId; 1：username; 2：msg
        let msg = ev.data.toString().split('-')
        console.log(msg[0])
      }

      //感知连接开启
      webSocket.onopen = function () {
        console.log('websocket连接已开启')
      }

      //感知连接关闭
      webSocket.onclose = function () {

      }
    } else {
      alert("当前浏览器不支持websocket")
    }

  })
}

</script>

<style scoped>

.chatBox {
  display: flex;
}

</style>
