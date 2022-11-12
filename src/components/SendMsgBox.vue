<template>

  <div class="sendMsgBox">
    <el-input v-model="input"
              :autosize="{minRows: 11, maxRows: 11}"
              type="textarea"
              placeholder="请输入内容"
              resize="none"
              class="sel"
              style="outline: none"
              @change="change">
    </el-input>
    <el-button class="sendBtn">发送</el-button>
  </div>


</template>

<script setup lang="ts">

import {ref} from "vue";

const input = ref()

function change(){
  input.value = ''
}

</script>

<style scoped>

.sendMsgBox{
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
