<template>

  <div class="chatBox">
    <MsgList/>
    <ChatInfo/>
  </div>

</template>

<script setup lang="ts">

import MsgList from "@/components/MsgList.vue";
import ChatInfo from "@/components/ChatInfo.vue";
</script>

<style scoped>

.chatBox {
  display: flex;
}

</style>
