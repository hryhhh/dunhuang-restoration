<template>
  <!-- 英雄区域 -->
  <section class="hero">
    <div class="container">
      <div class="hero__content">
        <h1 class="hero__title">北齐壁画数字化修复系统</h1>
        <p class="hero__description">运用先进的人工智能技术，为千年文化瑰宝赋予新生</p>
        <div class="hero__actions">
          <button class="btn btn--primary btn--lg" @click="goToRepair">开始修复</button>
          <button class="btn btn--outline btn--light">了解更多</button>
        </div>
      </div>
    </div>
  </section>

  <!-- 功能介绍 -->
  <section id="features" class="features">
    <div class="container">
      <div class="section-header">
        <div class="badge">智能修复</div>
        <h2 class="section-title">先进的壁画修复技术</h2>
        <p class="section-description">
          我们的系统结合了传统修复工艺与现代人工智能技术，为北齐壁画的保护与传承提供全新解决方案
        </p>
      </div>

      <div class="features__grid">
        <div class="feature-card">
          <div class="feature-card__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
          <h3 class="feature-card__title">智能识别</h3>
          <p class="feature-card__subtitle">精准识别壁画损伤区域，自动分析损伤类型与程度</p>
          <p class="feature-card__description">
            运用计算机视觉技术，对壁画进行全面扫描，建立详细的损伤地图，为修复工作提供精确指导。
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-card__icon feature-card__icon--green">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              <path d="M19 17.5c-1.1-0.1-2.2-0.5-3-1.2-0.8-0.6-1.9-1-3-1.2"></path>
              <path d="m14.5 7.5-2.5 2.5"></path>
              <path d="m12 10 2.5 2.5"></path>
            </svg>
          </div>
          <h3 class="feature-card__title">AI修复</h3>
          <p class="feature-card__subtitle">基于深度学习的智能修复算法，还原壁画原貌</p>
          <p class="feature-card__description">
            系统通过学习北齐壁画的艺术风格和特征，能够智能推断缺失部分的内容，实现高度还原的修复效果。
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-card__icon feature-card__icon--red">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
          </div>
          <h3 class="feature-card__title">历史追溯</h3>
          <p class="feature-card__subtitle">记录修复全过程，支持历史版本对比与回溯</p>
          <p class="feature-card__description">
            系统自动记录每一步修复操作，支持修复前后对比，确保修复过程的可追溯性和透明度。
          </p>
        </div>
      </div>
    </div>
  </section>
  <RepairCaseDisplay />
</template>

<script setup>
import RepairCaseDisplay from './RepairCaseDisplay.vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const goToRepair = () => {
  router.push('/repair');
};
</script>

<style lang='scss' scoped>
// 英雄区域
.hero {
  position: relative;
  width: 100%;
  height: 65vh;
  padding: $spacing-12 0;
  background-size: cover;
  background-position: center;
  background-image: url('../../assets//images//background.jpg');
  background-size: cover;

  @media (min-width: $breakpoint-md) {
    padding: $spacing-24 0;
  }

  @media (min-width: $breakpoint-lg) {
    padding: $spacing-32 0;
  }



  &__content {
    position: relative;
    top: 45px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: $color-white;
    gap: $spacing-4;
  }

  &__title {
    font-size: $font-size-3xl;
    font-weight: 700;
    line-height: 1.2;

    @media (min-width: $breakpoint-sm) {
      font-size: $font-size-4xl;
    }

    @media (min-width: $breakpoint-md) {
      font-size: $font-size-5xl;
    }
  }

  &__description {
    max-width: 700px;
    color: $color-blue-light;

    @media (min-width: $breakpoint-md) {
      font-size: $font-size-xl;
    }
  }

  &__actions {
    display: flex;
    gap: $spacing-4;
    margin-top: $spacing-6;
  }
}

// 功能介绍
.features {
  width: 100%;
  padding: $spacing-12 0;
  background-image: linear-gradient(to top, rgba(#FFE4E1, 0.7), rgba(#e6997f, 0.5));


  @media (min-width: $breakpoint-md) {
    padding: $spacing-24 0;
  }

  @media (min-width: $breakpoint-lg) {
    padding: $spacing-32 0;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-6;
    max-width: 1200px;
    margin: 0 auto;

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: repeat(3, 1fr);
      gap: $spacing-12;
    }
  }
}

.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: $spacing-6;
  background-color: rgba($color-white, 0.8);
  border: 1px solid $color-original-border;
  border-radius: $border-radius-lg;
  box-shadow: 0 1px 3px rgba($color-black, 0.05);
  backdrop-filter: blur(8px);

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: $spacing-2;
    color: $color-blue-primary;

    &--green {
      color: $color-green-primary;
    }

    &--red {
      color: $color-red-primary;
    }
  }

  &__title {
    font-size: $font-size-2xl;
    font-weight: 600;
    margin-bottom: $spacing-1;
    color: $color-blue-primary;
  }

  &__subtitle {
    font-size: $font-size-sm;
    color: $color-gray-500;
    margin-bottom: $spacing-4;
  }

  &__description {
    color: $color-gray-700;
  }
}
</style>
