<template>

  <div class="chatBox">
    <MsgList/>
    <ChatInfo/>
  </div>

</template>

<script setup lang="ts">

import MsgList from "@/components/MsgList.vue";
import ChatInfo from "@/components/ChatInfo.vue";
import {onBeforeMount, reactive, watch} from "vue";
import axios from "axios";
import {useMsgList} from "@/stores/msgList";
import {useUserStore} from "@/stores/user";
import {useWebsocketStore} from "@/stores/websocketStore";
import {useReceivedMsgStore} from "@/stores/receivedMsg";
import {storeToRefs} from "pinia";

const receivedMsgStore = useReceivedMsgStore()
const {receivedMsg} = storeToRefs(receivedMsgStore)
const msgListStore = useMsgList()
onBeforeMount(connectWebSocket)

watch(receivedMsg, ()=>{
  getMessage()
})

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
        console.log('收到消息：' + ev.data)
        receivedMsgStore.storeMsg(ev.data)
      }

      //感知连接开启
      webSocket.onopen = function () {
        console.log('websocket连接已开启')
        const websocketStore = useWebsocketStore()
        websocketStore.storeWebsocket(webSocket)
        getMessage()
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
function getMessage() {
  msgListStore.clearMsgList()
  const userStore = useUserStore()
  let list = reactive([])
  let groupList = reactive([])

  axios.request({
    method: 'GET',
    url: '/friends',
    params: {
      userId: userStore.userId
    }
  }).then(function (res) {
    list = res.data.data

    let len = list.length
    for (let i = 0; i < len; i++) {
      axios.request({
        method: 'GET',
        url: '/singleChat/getChatMsg',
        params: {
          userFriendsId: list[i]['id']
        }
      }).then(function (res) {
        msgListStore.storeMsgList(res.data.data)
      })
    }
    axios.request({
      method: 'GET',
      url: '/group',
      params: {
        userId: userStore.userId
      }
    }).then(function (res) {
      groupList = res.data.data
      let len = groupList.length
      for (let j = 0; j < len; j++) {
        axios.request({
          method: 'GET',
          url: '/groupChat/getGroupChatMsg',
          params: {
            userGroupId: groupList[j]['id'] //TODO
          }
        }).then(function (res) {
          msgListStore.storeMsgList(res.data.data)
        })
      }
    })
  })
}

</script>

<style scoped>

.chatBox {
  display: flex;
}

</style>
