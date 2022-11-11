<template>

  <div class="loginFormBox">
    <div class="title">YouChat</div>
    <el-form
        :label-position="'right'"
        label-width="100px"
        :model="formData"
        style="max-width: 460px"
        hide-required-asterisk
    >
      <el-form-item label="用户名" prop="username"
                    :rules="[{required: true, message: '请输入用户名', trigger: ['blur','change']}]">
        <el-input placeholder="请输入用户名" v-model="formData.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password"
                    :rules="[{required: true, message: '请输入密码', trigger: ['blur','change']}]">
        <el-input placeholder="请输入密码" show-password v-model="formData.password"/>
      </el-form-item>
      <el-form-item v-if="show" label="确认密码" prop="password"
                    :rules="[{validator: checkPassword, trigger: ['blur','change']}]">
        <el-input placeholder="请再次输入密码" show-password v-model="checkPass"/>
      </el-form-item>
      <el-button type="primary" v-show="!show" @click="login">登录</el-button>
      <el-button v-show="show" @click="back">返回</el-button>
      <el-button type="success" @click="signup">注册</el-button>
    </el-form>
  </div>

</template>

<script setup lang="ts">

import {reactive, ref} from "vue";
import axios from "axios";
import {JSEncrypt} from "jsencrypt";
import {useTokenStore} from "@/stores/token";
import router from "@/router";
import {useUserStore} from "@/stores/user";

const show = ref(false)
const checkPass = ref('')
const formData = reactive({
  username: '',
  password: ''
})

const checkPassword = () => {
  if (checkPass.value === '') {
    return new Error('请再次输入密码')
  } else if (checkPass.value !== formData.password) {
    return new Error('两次输入的密码不一致')
  }
}

//注册
function signup() {
  if (show.value === false) {
    show.value = true
    return
  }
  if (show.value === true) {
    //获取加密公钥
    axios.request({
      method: 'GET',
      url: '/getPublicKey'
    }).then(function (res) {
      let publicKey = res.data.data
      let encrypt = new JSEncrypt()
      encrypt.setPublicKey(publicKey)
      let encodedPass = encrypt.encrypt(formData.password)

      //注册用户
      axios.request({
        method: 'POST',
        url: '/login/signup',
        data: {
          username: formData.username,
          password: encodedPass
        }
      }).then(function (res) {
        console.log(res.data.data)
      })
    })
  }
}

//登录
function login() {
  axios.request({
    method: 'POST',
    url: '/login',
    data: {
      ...formData
    }
  }).then(function (res) {
    const store = useTokenStore()
    store.storeJwt(res.data.data)

    const userStore = useUserStore()
    userStore.storeUserInfo(null, formData.username)
    router.push('/chat')
  })
}

function back() {
  show.value = false
}

</script>

<style scoped>

.loginFormBox {
  width: 300px;
  height: 240px;
  background-color: #f2f3f4;
  margin-left: auto;
  margin-right: auto;
  margin-top: 200px;
  align-items: center;
  text-align: center;
}

.title {
  font-size: 30px;
}

</style>
