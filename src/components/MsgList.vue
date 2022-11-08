<template>

  <div class="listContainer">
    <el-scrollbar height="600px" class="itemContainer">
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
    </el-scrollbar>
  </div>

</template>

<script setup lang="ts">

</script>

<style scoped>

.listContainer{
  width: 300px;
  height: 700px;
  background-color: #f2f3f4;
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
  margin-top: 40px;
}


</style>
