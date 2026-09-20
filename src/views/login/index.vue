<template>
  <div class="login_container">
    <el-row :gutter="10">
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          ref="loginForms"
          :model="loginForm"
          :rules="rules"
        >
          <h1>hello</h1>
          <h2>欢迎来到九亿少女的梦</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              show-password
              :prefix-icon="Lock"
              v-model="loginForm.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button
              @click="login"
              :loading="loading"
              class="login_btn"
              type="primary"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
// 获取路由器
let $router = useRouter()
let $route = useRoute()
//引入用户相关的小仓库
import useUserStore from '@/store/modules/user.ts'
// 引入获取当前时间的函数
import { getTime } from '@/utils/time.ts'

//表单
let loginForms = ref()
const loading = ref(false)
const message = getTime()
let useStore = useUserStore()
const loginForm = reactive({ username: 'admin', password: '111111' })
// 登录方法
const login = async () => {
  await loginForms.value.validate()
  loading.value = true
  try {
    // 保证登录成功
    await useStore.userLogin(loginForm)
    //判断登录的时候，路由路径当中是否有query参数，如果有就往query参数跳，没有跳转到首页
    let redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/' })
    // loading.value = false
    //登录成功的提示信息
    ElNotification({
      type: 'success',
      message: '登录成功',
      title: 'HI,' + message + '好',
    })
  } catch (error) {
    // loading.value = false
    // 登录失败的提示信息
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  } finally {
    //成功与否都要关闭loading
    loading.value = false
  }
}

const validatorUsername = (rule: any, value: any, callback: any) => {
  //rule:即为校验规则对象
  //value：即为表单元素文本内容
  // 函数：如果符合条件callBack方法通过
  // 如果不符合条件callBack方法，注入错误提示信息
  if (value.length > 2) {
    callback()
  } else {
    callback(new Error('长度至少为2位'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length > 2) {
    callback()
  } else {
    callback(new Error('长度至少为2位'))
  }
}
//表单校验
const rules = {
  username: [
    // {required:true,message:'用户名不能为空',trigger:"blur"}
    { trigger: 'change', validator: validatorUsername },
  ],
  password: [
    // {required:true,message:'密码不能为空',trigger:"blur"}
    { validator: validatorPassword, trigger: 'blur' },
  ],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  // position: relative;
  .login_form {
    position: relative;
    top: 30vh;
    width: 60%;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 20px;

    h1 {
      color: #fff;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: #fff;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
