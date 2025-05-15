<template>
  <!-- 顶部状态栏 -->
  <header class="header">
    <div class="header__left">
      <h1 class="header__title">修复记录管理</h1>
      <div class="header__breadcrumb">
        <span>首页</span>
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
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        <span>修复记录</span>
      </div>
    </div>
    <div class="header__right">
      <div class="header__search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
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
        <input type="text" placeholder="搜索用户或壁画..." />
      </div>
      <div class="header__user">
        <img src="../assets/images/03.jpg" alt="管理员头像" />
        <div class="header__user-info">
          <span class="header__user-name">管理员</span>
          <span class="header__user-role">超级管理员</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
</script>

<style lang='scss' scoped>
// 顶部状态栏
.header {
  height: $header-height;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background-color: $color-white;
  border-bottom: 1px solid $color-gray-200;

  &__left {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: 18px;
    font-weight: 600;
    color: $color-gray-900;
  }

  &__breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: $color-gray-500;

    svg {
      width: 12px;
      height: 12px;
    }
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__search {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 12px;
    height: 36px;
    background-color: $color-gray-100;
    border-radius: 18px;

    input {
      border: none;
      background: none;
      outline: none;
      width: 200px;
      color: $color-gray-800;

      &::placeholder {
        color: $color-gray-400;
      }
    }

    svg {
      color: $color-gray-400;
    }
  }

  &__user {
    display: flex;
    align-items: center;
    gap: 12px;

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  &__user-info {
    display: flex;
    flex-direction: column;
  }

  &__user-name {
    font-weight: 500;
    color: $color-gray-900;
  }

  &__user-role {
    font-size: 12px;
    color: $color-gray-500;
  }
}
</style>
