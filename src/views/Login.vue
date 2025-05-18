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
          <button
            class="auth-tabs__tab"
            :class="{ 'auth-tabs__tab--active': activeTab === 'login' }"
            @click="activeTab = 'login'"
          >
            登录
          </button>
          <button
            class="auth-tabs__tab"
            :class="{ 'auth-tabs__tab--active': activeTab === 'register' }"
            @click="activeTab = 'register'"
          >
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
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                @keyup.enter="handleLogin"
              ></el-input>
            </el-form-item>
            <el-checkbox :model="loginForm.rememberMe">记住密码</el-checkbox>
            <el-button type="primary" @click.prevent="handleLogin">
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form>
        </div>

        <!-- 注册表单 -->
        <div v-if="activeTab === 'register'" class="auth-form">
          <h2 class="auth-form__title">创建账号</h2>
          <p class="auth-form__subtitle">注册一个新账号以使用敦煌壁画修复系统</p>

          <el-form ref="registerRef" :model="registerForm" :rules="registerRules" class="auth-form">
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="registerForm.username"
                type="text"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="registerForm.email"
                type="text"
                placeholder="请输入邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password">
              <el-input
                v-model="registerForm.confirmPassword"
                type="password"
                placeholder="请再次输入密码"
                @keyup.enter="handleRegister"
              ></el-input>
            </el-form-item>
            <!-- 勾选同意协议 -->
            <label class="form-checkbox">
              <input type="checkbox" v-model="registerForm.agreement" required />
              <span class="form-checkbox__mark"></span>
              <span
                >我已阅读并同意 <a href="#" class="form-link">服务条款</a> 和
                <a href="#" class="form-link">隐私政策</a></span
              >
            </label>

            <el-button @click="handleRegister">注册</el-button>
          </el-form>
        </div>
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
import { useRouter } from 'vue-router'
import  useUserStore  from '../store/modules/user'
import { encrypt } from '@/utils/encrypt'

// 当前激活的标签
const activeTab = ref('login')
const loading = ref(false)
// const redirect: any = ref(null)

// // 是否显示密码
// const showPassword = ref(false)
// const showConfirmPassword = ref(false)

// 引入路由
const router = useRouter()

// 使用 userStore
const userStore = useUserStore()

// 登录表单数据
const loginForm = ref({
  email: '153754997@qq.com',
  password: '123456789',
  rememberMe: false,
})

// 注册表单数据
const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreement: false,
})

// 登录表单验证规则
const loginRules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] },
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

// 注册表单验证规则
const registerRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 16, message: '用户名长度为2-16位', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度为6-20位', trigger: 'blur' },
  ],
}

// 登录处理
function handleLogin() {
  const loginRef = ref()
  loginRef.value?.validate((valid: boolean) => {
    if (valid) {
      loading.value = true
      // 勾选了需要记住密码设置在 cookie 中设置记住邮箱和密码
      if (loginForm.value.rememberMe) {
        Cookies.set('email', loginForm.value.email, { expires: 30 })
        // Cookies.set('password', encrypt(loginForm.value.password), { expires: 30 })
        Cookies.set('rememberMe', loginForm.value.rememberMe.toString(), { expires: 30 })
      } else {
        // 否则移除
        Cookies.remove('email')
        Cookies.remove('password')
        Cookies.remove('rememberMe')
      }
      // 调用action的登录方法
      userStore
        .login(loginForm.value)
        .then((res: any) => {
          // 假设登录成功后返回用户角色
          const role = res.data.role
          if (role === 'admin') {
            router.push('/admin')
          } else {
            router.push('/repair')
          }
          loading.value = false
        })
        .catch((error: any) => {
          console.error('登录失败:', error)
          loading.value = false
        })
    }
  })
}

// 注册处理
const handleRegister = () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert('两次输入的密码不一致！')
    return
  }

  console.log('注册表单提交:', registerForm.value)
  // 这里添加注册逻辑
  alert('注册成功！')
  // 注册成功后切换到登录页
  activeTab.value = 'login'
}
</script>

<style lang="scss" scoped>
@use '../styles/main.scss' as *;
@use 'sass:color';

:deep(.el-form-item.is-required) > .el-form-item__label::before {
  display: none !important;
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
    background: linear-gradient(
      135deg,
      rgba($color-ochre-light, 0.9),
      rgba($color-blue-light, 0.9)
    );
  }
}

// 内容区域
.auth-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $spacing-6;

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

// 表单组
.form-group {
  margin-bottom: $spacing-4;
}

// 表单标签
.form-label {
  display: block;
  font-size: $font-size-sm;
  font-weight: 500;
  color: $color-gray-700;
  margin-bottom: $spacing-2;
}

// 表单输入包装器
.form-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
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

    &:checked + .form-checkbox__mark {
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

// 表单链接
.form-link {
  font-size: $font-size-sm;
  color: $color-blue-primary;
  text-decoration: none;
  transition: $transition-base;

  &:hover {
    text-decoration: underline;
  }
}

// 表单按钮
.form-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: $spacing-3 $spacing-4;
  font-size: $font-size-base;
  font-weight: 500;
  color: $color-white;
  background-color: $color-blue-primary;
  border: none;
  border-radius: $border-radius;
  transition: $transition-base;
  gap: $spacing-2;

  &:hover {
    background-color: color.adjust($color-blue-primary, $lightness: -10%);
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(3px);
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
