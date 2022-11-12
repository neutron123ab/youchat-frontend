<template>

  <div class="chatInfoContainer">
    <el-scrollbar height="400px" ref="scrollRef">
      <div v-for="item in chatInfoStore.chatInfo" :key="item" class="scrollbar-demo-item">
        <div v-if="item.userId === userStore.userId">
          <div class="self1">{{ item.username }}</div>
          <div class="self">{{ item.content }}&nbsp;&nbsp;&nbsp;</div>
        </div>
        <div v-else-if="item.userId !== userStore.userId">
          <div class="others1">{{ item.username }}&nbsp;&nbsp;&nbsp;</div>
          <div class="others">{{ item.content }}</div>
        </div>
      </div>
    </el-scrollbar>
    <SendMsgBox/>
  </div>

</template>

<script setup lang="ts">

import SendMsgBox from "@/components/SendMsgBox.vue";
import {useChatInfo} from "@/stores/chatInfo";
import {useUserStore} from "@/stores/user";
import {ref, watch} from "vue";
import {storeToRefs} from "pinia";

const chatInfoStore = useChatInfo()
const {chatInfo, amount} = storeToRefs(chatInfoStore)

const userStore = useUserStore()

const scrollRef = ref()

watch(chatInfo.value, () => {
  if (scrollRef.value) {
    let h = 70 * amount.value
    scrollRef.value.setScrollTop(h)
  }
}, {deep: true, flush: "post"})


</script>

<style scoped>

.chatInfoContainer {
  width: 600px;
  height: 450px;
  background-color: #fffff0;
}

.scrollbar-demo-item {
  /*display: flex;*/
  align-items: center;
  /*justify-content: center;*/
  line-height: 50px;
  height: 50px;
  margin: 10px;
  /*text-align: center;*/
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.self {
  float: right;
  /*margin-right: 10px;*/
}

.self1 {
  float: right;
  margin-right: 10px;
  font-size: 22px;
  font-weight: bold;
}

.others {
  float: left;
  /*margin-left: 10px;*/
}

.others1 {
  float: left;
  margin-left: 10px;
  font-size: 22px;
  font-weight: bold;
}

</style>
