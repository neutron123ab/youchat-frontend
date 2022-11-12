<template>

  <div class="listContainer">
    <div class="title">消息列表</div>
    <div class="title" style="color: red">当前用户：{{userStore.username}}</div>
    <el-scrollbar height="600px" class="itemContainer">
      <el-button v-for="item in msgList" :key="item" @click="setChatInfo(item)" class="scrollbar-demo-item">

        <div v-if="item[0].hasOwnProperty('userFriendsId')">
          <div v-if="item[0]['userId'] === userStore.userId">{{item[0]['friendsName']}}</div>
          <div v-else-if="item[0]['friendsId'] === userStore.userId">{{item[0]['username']}}</div>
          <div>{{item[0]['sendTime']}}</div>
          <div>{{item[0]['content']}}</div>
        </div>
        <div v-else-if="item[0].hasOwnProperty('userGroupId')">
          <div>群聊：{{item[0]['groupName']}}</div>
          <div>{{item[0]['sendTime']}}</div>
          <div>{{item[0]['content']}}</div>
        </div>

      </el-button>
    </el-scrollbar>
  </div>

</template>

<script setup lang="ts">

import {storeToRefs} from "pinia";
import {useMsgList} from "@/stores/msgList";
import {useUserStore} from "@/stores/user";
import {useChatInfo} from "@/stores/chatInfo";
import {watch} from "vue";

const msgListStore = useMsgList()
//消息列表
const {msgList} = storeToRefs(msgListStore)

const userStore = useUserStore()

watch(msgList, ()=>{

})

function setChatInfo(item: any) {
  const store = useChatInfo()
  store.storeChatInfo(item)
}


</script>

<style scoped>

.listContainer {
  width: 185px;
  height: 700px;
  background-color: #f2f3f4;
  text-align: center;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.itemContainer {
  margin-top: 20px;
}

.title {
  font-size: 20px;
}




.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}

</style>
