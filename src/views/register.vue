<template>
  <!-- 注册表单 -->
  <div class="auth-form">
    <h2 class="auth-form__title">创建账号</h2>
    <p class="auth-form__subtitle">注册一个新账号以使用敦煌壁画修复系统</p>

    <el-form ref="registerRef" :model="registerForm" :rules="registerRules" class="auth-form" label-position="left" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username" type="text" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerForm.email" type="text" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="registerForm.password"
          type="password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
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
</template>

<script setup lang="ts">
import { ElMessage, ElForm } from 'element-plus'
import type { FormRules } from 'element-plus'
import { ref } from 'vue'
import Cookies from 'js-cookie'
import { useRouter, useRoute } from 'vue-router'

// 引入定义的 props
defineProps({
  activeTab: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:active-tab'])

// 注册表单数据
const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreement: false,
})

// 注册表单验证规则
const registerRules: FormRules = {
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
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}


// 注册处理
const handleRegister = async () => {

  const registerRef = ref<InstanceType<typeof ElForm>>();
  try {
    // 验证表单
    const valid = await new Promise((resolve, reject) => {
      registerRef.value?.validate((valid) => {

        resolve(true);
      });
    });
    if (!valid) return;
    console.log('注册表单提交:', registerForm.value)
    ElMessage.success('注册成功！');
    emit('update:active-tab', 'login')
  } catch (error) {
    console.error('注册失败:', error);
    ElMessage.error('注册失败，请稍后重试');
  }

}
</script>

<style lang="scss" scoped>
/* @use '../styles/main.scss' as *; */
@use 'sass:color';

:deep(.el-form-item.is-required) > .el-form-item__label::before {
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
  text-align: left;  // 改为左对齐
  white-space: nowrap;
}

:deep(.el-form-item__content) {
  flex: 1;
  margin-left: -20px !important;
}


.auth-form-container .el-form {
  width: 100%;
}
.auth-form-container .el-form-item {
  margin-bottom: 14px;
}
.auth-form-container .el-input__wrapper {
  border-radius: 8px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.auth-form-container .el-input__wrapper:hover,
.auth-form-container .el-input__wrapper.is-focus {
  box-shadow: 0 0 0 1px $color-blue-primary;
}

.auth-form-container .el-input {
  height: 42px;
  font-size: 1rem;
  width: 100%;
}
.auth-form-container .el-button {
  width: 100%;
  height: 44px;
  font-size: 1.05rem;
  border-radius: 8px;
  background: $color-blue-primary;
  color: #fff;
  font-weight: 500;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  border: none;
}

.auth-form-container .el-button:hover {
  background: linear-gradient(90deg, #e0c3fc 20%, #508ecd 80%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(80, 142, 205, 0.3);
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
  width: 100%;
  padding: $spacing-6;


  &__title {
    font-size: $font-size-xl;
    font-weight: 600;
    color: $color-gray-900;
    margin-bottom: $spacing-2;
    margin-left: 20px;
  }

  &__subtitle {
    color: $color-gray-500;
    margin-bottom: $spacing-6;
    margin-left: 20px;
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
  font-weight: 600;
  color: $color-gray-700;
  margin-bottom: $spacing-2;
  letter-spacing: 0.3px;
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
  margin: 20px 0 20px -5px;
  padding: 8px;
  background-color: rgba($color-blue-light, 0.05);
  border-radius: 6px;
  transition: background-color 0.2s ease;

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
