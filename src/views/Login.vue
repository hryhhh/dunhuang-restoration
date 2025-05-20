<template>
  <div class="auth-container">
    <!-- 背景装饰 -->
    <div class="auth-background">
      <div class="auth-background__image"></div>
      <div class="auth-background__overlay"></div>

      <!-- 装饰性云纹 -->
      <div class="auth-decoration">
        <div class="auth-decoration__cloud auth-decoration__cloud--1"></div>
        <div class="auth-decoration__cloud auth-decoration__cloud--2"></div>
        <div class="auth-decoration__cloud auth-decoration__cloud--3"></div>
        <div class="auth-decoration__cloud auth-decoration__cloud--4"></div>
      </div>
    </div>

    <div class="auth-content">
      <div class="auth-logo">
        <h1 class="auth-logo__title">敦煌壁画修复系统</h1>
      </div>

      <!-- 表单容器 -->
      <div class="auth-form-container">
        <!-- 表单切换标签 -->
        <div class="auth-tabs">
          <button class="auth-tabs__tab" :class="{ 'auth-tabs__tab--active': activeTab === 'login' }"
            @click="activeTab = 'login'">
            登录
          </button>
          <button class="auth-tabs__tab" :class="{ 'auth-tabs__tab--active': activeTab === 'register' }"
            @click="activeTab = 'register'">
            注册
          </button>
        </div>

        <!-- 登录表单 -->
        <div v-if="activeTab === 'login'" class="auth-form">
          <h2 class="auth-form__title">欢迎回来</h2>
          <p class="auth-form__subtitle">请登录您的账号以继续使用系统</p>
          <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="auth-form">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="loginForm.email" type="text" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"
                @keyup.enter="handleLogin"></el-input>
            </el-form-item>
            <el-checkbox v-model="loginForm.rememberMe">记住密码</el-checkbox>
            <el-button type="primary" @click.prevent="handleLogin">
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form>
        </div>

        <!-- 注册表单 -->

        <register v-if="activeTab === 'register'" v-model:active-tab="activeTab" />
      </div>
    </div>

    <!-- 底部信息 -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from '../components/home/Footer.vue'
import { ref } from 'vue'
import Cookies from 'js-cookie'
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '../store/modules/user'
import { encrypt } from '@/utils/encrypt'
import { ElMessage, ElForm } from 'element-plus'
import type { FormRules } from 'element-plus'
import register from './register.vue'

// 当前激活的标签
const activeTab = ref('login')
const loading = ref(false)
const redirect: any = ref(null)

// 定义 loginRef
const loginRef = ref<InstanceType<typeof ElForm>>()

// // 是否显示密码
// const showPassword = ref(false)
// const showConfirmPassword = ref(false)

// 引入路由
const router = useRouter()
// 从路由参数中获取重定向路径
const route = useRoute()
redirect.value = route.query.redirect || '/'

// 使用 userStore
const userStore = useUserStore()

// 登录表单数据
const loginForm = ref({
  email: '153754997@qq.com',
  password: '123456789',
  rememberMe: false,
})

// 登录表单验证规则
const loginRules: FormRules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] },
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}


// 登录处理
const handleLogin = async () => {
  try {
    const valid = await new Promise<boolean>((resolve) => {
      loginRef.value?.validate((valid: boolean) => {
        resolve(valid)
      })
    })

    if (!valid) return

    loading.value = true

    // 处理记住密码逻辑
    if (loginForm.value.rememberMe) {
      Cookies.set('email', loginForm.value.email, { expires: 30 })
      Cookies.set('password', encrypt(loginForm.value.password), { expires: 30 })
      Cookies.set('rememberMe', loginForm.value.rememberMe.toString(), { expires: 30 })
    } else {
      // 否则移除
      Cookies.remove('email')
      Cookies.remove('password')
      Cookies.remove('rememberMe')
    }

    // 调用action的登录方法
    const res = await userStore.login(loginForm.value) as any
    const role = res?.data?.role || ''
    const redirectPath = route.query.redirect || '/'

    // 根据用户角色决定重定向目标
    if (role === 'admin') {
      router.push('/admin')

    } else {
      router.push({
        path:typeof route.query.redirect === 'string'?route.query.redirect:'/'
      }) // 执行跳转逻辑
      ElMessage.success('登录成功')
    }
  } catch (error) {
      console.error('登录失败:', error)
      ElMessage.error('登录失败，请检查邮箱和密码')
    } finally {
      loading.value = false
    }

  }
</script>

<style lang="scss" scoped>
/* @use '../styles/main.scss' as *; */
@use 'sass:color';

:deep(.el-form-item.is-required)>.el-form-item__label::before {
  display: none !important;
}

// 调整表单项布局为水平方向
:deep(.el-form-item) {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  font-size: 0.95rem;
  color: $color-gray-700;
  padding-right: 12px;
  text-align: left; // 改为左对齐
  white-space: nowrap;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: $color-blue-primary;
  border-color: $color-blue-primary;
  color: $color-blue-primary;
}

// 覆盖 el-checkbox 选中时标签文字颜色
:deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: $color-blue-primary;
}

// 认证页面容器
.auth-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

// 背景
.auth-background {
  position: absolute;
  inset: 0;
  z-index: -1;

  &__image {
    position: absolute;
    inset: 0;
    background-image: url('');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.2;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg,
        rgba($color-ochre-light, 0.9),
        rgba($color-blue-light, 0.9));
  }
}

// 内容区域
.auth-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* padding: $spacing-6; */

  @media (min-width: $breakpoint-md) {
    padding: $spacing-12;
  }
}

// title
.auth-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: $spacing-6;

  &__title {
    font-size: $font-size-2xl;
    font-weight: 700;
    color: $color-blue-primary;
    text-align: center;

    @media (min-width: $breakpoint-md) {
      font-size: $font-size-3xl;
    }
  }
}

// 表单容器
.auth-form-container {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  padding: 40px 32px 32px 32px;
  width: 500px;
  max-width: 95vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-form-container .el-form {
  width: 100%;
}

.auth-form-container .el-form-item {
  margin-bottom: 20px;
}

.auth-form-container .el-input {
  height: 38px;
  font-size: 1rem;
  width: 100%;
}

.auth-form-container .el-button {
  width: 100%;
  margin-top: 15px;
  height: 38px;
  font-size: 1rem;
  border-radius: 8px;
  background: $color-blue-primary;
  color: #fff;
  font-weight: 500;
  transition: background 0.2s;
}

.auth-form-container .el-button:hover {
  background: linear-gradient(90deg, #e0c3fc 20%, #508ecd 80%);
}

// 表单切换标签
.auth-tabs {
  display: flex;
  border-bottom: 1px solid $color-gray-200;

  &__tab {
    flex: 1;
    padding: $spacing-4 $spacing-16;
    text-align: center;
    font-size: $font-size-lg;
    font-weight: 500;
    color: $color-gray-500;
    background-color: transparent;
    border: none;
    transition: $transition-base;

    &:hover {
      color: $color-blue-primary;
    }

    &--active {
      color: $color-blue-primary;
      box-shadow: inset 0 -2px 0 $color-blue-primary;
    }
  }
}

// 表单
.auth-form {
  padding: $spacing-6;

  &__title {
    font-size: $font-size-xl;
    font-weight: 600;
    color: $color-gray-900;
    margin-bottom: $spacing-2;
  }

  &__subtitle {
    color: $color-gray-500;
    margin-bottom: $spacing-6;
  }
}

// 表单复选框
.form-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: $font-size-sm;
  color: $color-gray-600;
  margin: 15px 0;

  input {
    position: absolute;
    opacity: 0;

    &:checked+.form-checkbox__mark {
      background-color: $color-blue-primary;
      border-color: $color-blue-primary;

      &::after {
        opacity: 1;
      }
    }
  }

  &__mark {
    position: relative;
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-right: $spacing-2;
    border: 2px solid $color-gray-300;
    border-radius: $border-radius-sm;
    transition: $transition-base;

    &::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 6px;
      width: 4px;
      height: 8px;
      border: solid $color-white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      opacity: 0;
      transition: $transition-base;
    }
  }
}

// 动画
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-20px) rotate(5deg);
  }

  100% {
    transform: translateY(0) rotate(0deg);
  }
}
</style>
