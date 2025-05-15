<template>
  <!-- 数据统计卡片 -->
  <section class="stats">
    <div class="stats__card">
      <div class="stats__card-icon stats__card-icon--blue">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      </div>
      <div class="stats__card-content">
        <h3 class="stats__card-title">总用户数</h3>
        <p class="stats__card-value">1,248</p>
        <p class="stats__card-change stats__card-change--up">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m5 12 7-7 7 7"></path>
            <path d="M12 19V5"></path>
          </svg>
          <span>12% 较上月</span>
        </p>
      </div>
    </div>
    <div class="stats__card">
      <div class="stats__card-icon stats__card-icon--green">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
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
      <div class="stats__card-content">
        <h3 class="stats__card-title">修复总数</h3>
        <p class="stats__card-value">3,567</p>
        <p class="stats__card-change stats__card-change--up">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m5 12 7-7 7 7"></path>
            <path d="M12 19V5"></path>
          </svg>
          <span>23% 较上月</span>
        </p>
      </div>
    </div>
    <div class="stats__card">
      <div class="stats__card-icon stats__card-icon--ochre">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
          <line x1="3" x2="21" y1="9" y2="9"></line>
          <line x1="9" x2="9" y1="21" y2="9"></line>
        </svg>
      </div>
      <div class="stats__card-content">
        <h3 class="stats__card-title">本月修复</h3>
        <p class="stats__card-value">428</p>
        <p class="stats__card-change stats__card-change--up">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m5 12 7-7 7 7"></path>
            <path d="M12 19V5"></path>
          </svg>
          <span>8% 较上月</span>
        </p>
      </div>
    </div>
    <div class="stats__card">
      <div class="stats__card-icon stats__card-icon--red">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3 3v18h18"></path>
          <path d="m19 9-5 5-4-4-3 3"></path>
        </svg>
      </div>
      <div class="stats__card-content">
        <h3 class="stats__card-title">活跃用户</h3>
        <p class="stats__card-value">752</p>
        <p class="stats__card-change stats__card-change--down">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m19 12-7 7-7-7"></path>
            <path d="M12 5v14"></path>
          </svg>
          <span>3% 较上月</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style lang='scss' scoped>
// 数据统计卡片
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 24px;

  &__card {
    background-color: $color-white;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    padding: 20px;
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }

  &__card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 12px;

    &--blue {
      background-color: $color-blue-light;
      color: $color-blue-primary;
    }

    &--green {
      background-color: $color-green-light;
      color: $color-green-primary;
    }

    &--ochre {
      background-color: $color-ochre-light;
      color: $color-ochre-primary;
    }

    &--red {
      background-color: $color-red-light;
      color: $color-red-primary;
    }
  }

  &__card-content {
    flex: 1;
  }

  &__card-title {
    font-size: 14px;
    font-weight: 500;
    color: $color-gray-500;
    margin-bottom: 4px;
  }

  &__card-value {
    font-size: 24px;
    font-weight: 600;
    color: $color-gray-900;
    margin-bottom: 4px;
  }

  &__card-change {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;

    &--up {
      color: $color-green-primary;
    }

    &--down {
      color: $color-red-primary;
    }
  }
}

</style>
