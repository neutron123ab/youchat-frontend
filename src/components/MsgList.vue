<template>

  <div class="listContainer">
    <div class="title">消息列表</div>
    <el-scrollbar height="600px" class="itemContainer">
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
    </el-scrollbar>
  </div>

</template>

<script setup lang="ts">

import {reactive} from "vue";

//消息列表
const msgLists = reactive([])

</script>

<style scoped>

.listContainer {
  width: 300px;
  height: 700px;
  background-color: #f2f3f4;
  text-align: center;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
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
