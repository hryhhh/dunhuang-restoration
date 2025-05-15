<template>
  <header class="header">
      <div class="container">
        <div class="header__content">
          <div class="header__logo">
            <a href="/" class="logo">
              <img src="../../assets/images/logo.jpg" width="50" height="50" alt="" />
              <span>敦煌壁画修复系统</span>
            </a>
            </div>
            <nav class="header__nav">
              <a href="#features" class="nav-link">功能介绍</a>
              <a href="#gallery" class="nav-link">修复案例</a>
              <a href="#process" class="nav-link">修复流程</a>
              <a href="#about" class="nav-link">关于我们</a>
            </nav>

          <div class="header__actions">
            <button class="btn btn--outline" @click="goToClick">登录</button>
            <button class="btn btn--primary">注册</button>
          </div>
        </div>
      </div>
    </header>

</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goToClick = () => {
  router.push({ name: 'login' }); 
};

</script>

<style lang='scss' scoped>
// 头部
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  border-bottom: 1px solid $color-gray-200;
  background-color: rgba($color-white, 0.95);
  backdrop-filter: blur(8px);

  &__content {
    display: flex;
    height: 4rem;
    align-items: center;
    justify-content: space-between;
  }

  &__logo {
    display: flex;
    gap: $spacing-6;
    align-items: center;
  }

  &__nav {
    display: none;
    gap: $spacing-6;

    @media (min-width: $breakpoint-md) {
      display: flex;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $spacing-2;
  }
}

.logo {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  text-decoration: none;

  img {
    border-radius: $border-radius;
  }

  span {
    font-weight: 700;
    color: $color-blue-primary;
  }
}

.nav-link {
    color: rgba(#2A5C8E, 0.8);
    text-decoration: none;
    font-weight: 500;
    padding: 5px 10px;
    border-radius: 4px;
    transition: all 0.3s ease;
    position: relative;
}

.nav-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 50%;
    transition: all 0.3s ease;
    transform: translateX(-50%);
}

.nav-link:hover {
    color: rgba(#619bd4, 1);
}

.nav-link:hover::after {
    width: 100%;
}

</style>
