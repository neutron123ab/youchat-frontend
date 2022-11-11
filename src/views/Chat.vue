<template>

  <div class="chatBox">
    <MsgList/>
    <ChatInfo/>
  </div>

</template>

<script setup lang="ts">

import MsgList from "@/components/MsgList.vue";
import ChatInfo from "@/components/ChatInfo.vue";
import {onBeforeMount, reactive} from "vue";
import axios from "axios";
import {useMsgList} from "@/stores/msgList";
//import {storeToRefs} from "pinia";
import {useTokenStore} from "@/stores/token";
import {useUserStore} from "@/stores/user";

const demo = reactive([{1:'1',2:'2'}, [{1:'1', 2:'3'},{3:'4',4:'5'}]])

const msgListStore = useMsgList()
//const {msgList} = storeToRefs(msgListStore)
onBeforeMount(connectWebSocket)

function connectWebSocket() {

  let webSocket: WebSocket
  axios.request({
    method: 'GET',
    url: '/checkCertificate'
  }).then(function (res) {
    if ('WebSocket' in window) {
      webSocket = new WebSocket("ws://localhost:8088/chat");

      //收到服务器回送的消息
      webSocket.onmessage = function (ev) {
        //服务器回送消息格式，index 0：userId; 1：username; 2：msg
        //let msg = ev.data.toString().split('-')
        console.log(ev.data+"========")
      }

      //感知连接开启
      webSocket.onopen = function () {
        console.log('websocket连接已开启')
        getMessage()
        // console.log('-----------')
        // console.log(msgListStore.msgList)
        // console.log('-----------')
      }

      //感知连接关闭
      webSocket.onclose = function () {
        console.log('websocket连接已关闭')
      }
    } else {
      alert("当前浏览器不支持websocket")
    }

  })

  //获得用户id
  const userStore = useUserStore()
  axios.request({
    method: 'GET',
    url: '/login/getUserInfo',
    params: {
      username: userStore.username
    }
  }).then(function (resp) {
    const userStore = useUserStore()
    userStore.storeUserInfo(resp.data.data, userStore.username)
  })

}

//获取消息列表的数据
function getMessage(){
  console.log('123123123')
  msgListStore.clearMsgList()
  console.log('123123123')
  axios.request({
    method: 'GET',
    url: '/singleChat/getChatMsg',
    params: {
      userFriendsId: 1
    }
  }).then(function (res){
    console.log("storeMsg")
    msgListStore.storeMsgList(res.data.data)
    console.log(res.data.data)
  })

  axios.request({
    method: 'GET',
    url: '/groupChat/getGroupChatMsg',
    params: {
      userGroupId: 1
    }
  }).then(function (res) {
    console.log("storeMsg")
    msgListStore.storeMsgList(res.data.data)
    console.log(res.data.data)
  })
}

</script>

<style scoped>

.chatBox {
  display: flex;
}

</style>
