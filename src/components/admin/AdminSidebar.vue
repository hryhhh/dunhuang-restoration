<template>
  <!-- 侧边导航栏 -->
  <aside class="sidebar" :class="{ 'sidebar--collapsed': sidebarCollapsed }">
    <div class="sidebar__header">
      <div class="sidebar__logo">
        <img src="../../assets/images/logo.jpg" alt="敦煌壁画修复系统" />
        <span v-if="!sidebarCollapsed">敦煌壁画修复系统</span>
      </div>
      <button class="sidebar__toggle" @click="toggleSidebar">
        <svg
          xmlns="../assets/images/03.jpg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path v-if="sidebarCollapsed" d="m9 18 6-6-6-6"></path>
          <path v-else d="m15 18-6-6 6-6"></path>
        </svg>
      </button>
    </div>
    <nav class="sidebar__nav">
      <a href="#" class="sidebar__nav-item sidebar__nav-item--active">
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
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
          <line x1="3" x2="21" y1="9" y2="9"></line>
          <line x1="9" x2="9" y1="21" y2="9"></line>
        </svg>
        <span v-if="!sidebarCollapsed">仪表盘</span>
      </a>
      <a href="#" class="sidebar__nav-item">
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
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        <span v-if="!sidebarCollapsed">用户管理</span>
      </a>
      <a href="#" class="sidebar__nav-item">
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
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
          <line x1="16" x2="22" y1="5" y2="5"></line>
          <line x1="19" x2="19" y1="2" y2="8"></line>
          <circle cx="9" cy="9" r="2"></circle>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
        </svg>
        <span v-if="!sidebarCollapsed">壁画库</span>
      </a>
      <a href="#" class="sidebar__nav-item">
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
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          <path d="M19 17.5c-1.1-0.1-2.2-0.5-3-1.2-0.8-0.6-1.9-1-3-1.2"></path>
          <path d="m14.5 7.5-2.5 2.5"></path>
          <path d="m12 10 2.5 2.5"></path>
        </svg>
        <span v-if="!sidebarCollapsed">修复记录</span>
      </a>
      <a href="#" class="sidebar__nav-item">
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
          <path d="M3 3v18h18"></path>
          <path d="m19 9-5 5-4-4-3 3"></path>
        </svg>
        <span v-if="!sidebarCollapsed">数据统计</span>
      </a>
      <a href="#" class="sidebar__nav-item">
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
          <path
            d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
          ></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
        <span v-if="!sidebarCollapsed">系统设置</span>
      </a>
    </nav>
    <div class="sidebar__footer">
      <a href="#" class="sidebar__nav-item">
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
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        <span v-if="!sidebarCollapsed">退出登录</span>
      </a>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 侧边栏状态
const sidebarCollapsed = ref(false);
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};
</script>

<style lang='scss' scoped>
// 侧边栏
.sidebar {
  width: $sidebar-width;
  background-color: $color-white;
  border-right: 1px solid $color-gray-200;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;

  &--collapsed {
    width: $sidebar-collapsed-width;
  }

  &__header {
    height: $header-height;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    border-bottom: 1px solid $color-gray-200;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 600;
    color: $color-blue-primary;

    img {
      width: 32px;
      height: 32px;
      border-radius: 4px;
    }
  }

  &__toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: none;
    border: none;
    color: $color-gray-500;
    cursor: pointer;

    &:hover {
      color: $color-gray-700;
    }
  }

  &__nav {
    flex: 1;
    padding: 16px 0;
    overflow-y: auto;
  }

  &__nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    color: $color-gray-600;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      background-color: $color-gray-100;
      color: $color-gray-900;
    }

    &--active {
      background-color: $color-blue-light;
      color: $color-blue-primary;
      font-weight: 500;

      &:hover {
        background-color: $color-blue-light;
        color: $color-blue-primary;
      }
    }
  }

  &__footer {
    padding: 16px 0;
    border-top: 1px solid $color-gray-200;
  }
}

</style>
