<template>
  <div class="beiqi-app">
    <Header />
    <main class="main">
      <HeroFeatures />
      <Process />
      <About />
    </main>

    <!-- 成功提示示例 -->
    <div class="notification notification--success">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>壁画修复成功保存！</span>
    </div>

    <!-- 错误警告示例 -->
    <div class="notification notification--error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>操作失败，请检查网络连接</span>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/home/Header.vue'
import HeroFeatures from '@/components/home/HeroFeatures.vue'
import Process from '@/components/home/Process.vue'
import About from '@/components/home/About.vue'
import Footer from '@/components/home/Footer.vue'
</script>

<style lang="scss">
@use 'sass:color';
// 全局样式
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: $font-family-base;
  font-size: $font-size-base;
  line-height: 1.5;
  color: $color-gray-900;
  background-color: $color-white;
}

img {
  max-width: 100%;
  height: auto;
}

// 容器
.container {
  width: 82%;
  max-width: $container-max-width;
  margin: 0 auto;
  padding: 0 $container-padding;
}

// 按钮
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-2 $spacing-4;
  font-size: $font-size-sm;
  font-weight: 500;
  line-height: 1.5;
  border-radius: $border-radius;
  border: 1px solid transparent;
  cursor: pointer;
  transition: $transition-base;
  text-decoration: none;

  &--primary {
    background-color: $color-blue-primary;
    color: $color-white;

    &:hover {
      background-color: color.adjust($color-blue-primary, $lightness: -10%);
    }
  }

  &--secondary {
    background-color: $color-white;
    color: $color-blue-primary;

    &:hover {
      background-color: $color-blue-light;
    }
  }

  &--outline {
    background-color: transparent;
    border-color: $color-gray-300;
    color: $color-gray-700;

    &:hover {
      background-color: $color-gray-100;
    }
  }

  &--light {
    border-color: $color-white;
    color: $color-white;

    &:hover {
      background-color: rgba($color-white, 0.1);
    }
  }

  &--lg {
    padding: $spacing-3 $spacing-6;
    font-size: $font-size-base;
  }

  svg {
    margin-left: $spacing-2;
  }
}

// 徽章
.badge {
  display: inline-block;
  padding: $spacing-1 $spacing-3;
  font-size: $font-size-sm;
  font-weight: 500;
  background-color: $color-blue-light;
  color: $color-blue-primary;
  border-radius: $border-radius-lg;
  margin-bottom: $spacing-2;

  &--green {
    background-color: $color-green-light;
    color: $color-green-primary;
  }

  &--red {
    background-color: $color-red-light;
    color: $color-red-primary;
  }

  &--ochre {
    background-color: $color-ochre-light;
    color: $color-ochre-primary;
  }
}

// 章节标题
.section-header {
  text-align: center;
  max-width: 900px;
  margin: 0 auto $spacing-12;

  .section-title {
    font-size: $font-size-4xl;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: $spacing-2;
    color: $color-blue-primary;

    @media (min-width: $breakpoint-sm) {
      font-size: $font-size-5xl;
    }
  }

  .section-description {
    color: $color-gray-600;
    font-size: $font-size-lg;

    @media (min-width: $breakpoint-md) {
      font-size: $font-size-xl;
    }
  }
}

// 应用程序
.beiqi-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

// 主要内容
.main {
  flex: 1;
  width: 80%;
  margin: auto;
}

// 通知提示
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: $spacing-2;
  padding: $spacing-3 $spacing-4;
  border-radius: $border-radius;
  box-shadow: 0 2px 10px rgba($color-black, 0.1);
  z-index: 100;

  &--success {
    background: linear-gradient(
      to right,
      $color-success-bg,
      color.adjust($color-success-bg, $lightness: 10%)
    );
    color: $color-success-icon;

    svg {
      color: $color-success-icon;
    }
  }

  &--error {
    background: linear-gradient(
      to right,
      $color-error-bg,
      color.adjust($color-error-bg, $lightness: 5%)
    );
    color: $color-error-text;

    svg {
      color: $color-error-text;
    }
  }
}
</style>
