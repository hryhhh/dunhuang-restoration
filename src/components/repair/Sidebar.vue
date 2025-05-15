<template>
    <aside class="sidebar">
      <nav class="sidebar__nav">
        <a href="#" class="sidebar__nav-item sidebar__nav-item--active">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>首页</span>
        </a>

        <a href="#" class="sidebar__nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            <path d="M19 17.5c-1.1-0.1-2.2-0.5-3-1.2-0.8-0.6-1.9-1-3-1.2"></path>
            <path d="m14.5 7.5-2.5 2.5"></path>
            <path d="m12 10 2.5 2.5"></path>
          </svg>
          <span>修复工作台</span>
        </a>

        <a href="#" class="sidebar__nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
            <line x1="16" x2="22" y1="5" y2="5"></line>
            <line x1="19" x2="19" y1="2" y2="8"></line>
            <circle cx="9" cy="9" r="2"></circle>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
          </svg>
          <span>壁画库</span>
        </a>

        <a href="#" class="sidebar__nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
          </svg>
          <span>修复历史</span>
        </a>

        <a href="#" class="sidebar__nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <span>系统设置</span>
        </a>
      </nav>
    </aside>
  </template>

  <script setup>
  // 无需额外逻辑
  </script>

  <style lang="scss">
    @use '../../styles/main.scss' as *;

  .sidebar {
    width: 16rem;
    background-color: $color-white;
    border-right: 1px solid $color-border;
    padding: $spacing-4 0;

    &__nav {
      display: flex;
      flex-direction: column;
      gap: $spacing-1;
    }

    &__nav-item {
      display: flex;
      align-items: center;
      gap: $spacing-3;
      padding: $spacing-3 $spacing-4;
      color: $color-gray-600;
      text-decoration: none;
      transition: $transition-base;
      border-left: 3px solid transparent;

      &:hover {
        background-color: $color-gray-50;
        color: $color-blue-primary;
      }

      &--active {
        background-color: $color-blue-light;
        color: $color-blue-primary;
        border-left-color: $color-blue-primary;

        &:hover {
          background-color: $color-blue-light;
        }
      }

      svg {
        flex-shrink: 0;
      }

      span {
        font-size: $font-size-sm;
        font-weight: 500;
      }
    }
  }
  </style>
