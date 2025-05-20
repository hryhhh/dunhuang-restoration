<template>
    <header class="header">

        <div class="header__content">
          <div class="header__logo">
            <a href="/" class="logo">
              <img src="../../assets/images/logo.jpg" width="50" height="50" alt="敦煌壁画修复系统" />
              <span>敦煌壁画修复系统</span>
            </a>
          </div>

          <div class="header__actions">
            <div class="header__user">
              <span class="header__user-name">admin</span>
              <div class="header__user-avatar">
                <img src="../../assets/images/04.jpg" alt="用户头像" />
              </div>
            </div>

            <button class="btn btn--icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>

            <button class="btn btn--icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
        </div>

    </header>
  </template>

  <script setup>


  </script>

  <style lang="scss">
  @use '../../styles/main.scss' as *;

  .header {
    background-color: $color-white;
    border-bottom: 1px solid $color-border;
    box-shadow: 0 1px 3px rgba($color-black, 0.05);

    &__content {
      
      margin:0 20px;
      display: flex;
      height: 4rem;
      align-items: center;
      justify-content: space-between;
    }

    &__logo {
      display: flex;
      align-items: center;
    }

    &__actions {
      display: flex;
      align-items: center;
      gap: $spacing-4;
    }

    &__user {
      display: flex;
      align-items: center;
      gap: $spacing-2;

      &-name {
        font-size: $font-size-sm;
        font-weight: 500;
        color: $color-gray-700;
      }

      &-avatar {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: $border-radius-full;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
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

  .btn--icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $border-radius-full;
    background-color: transparent;
    border: none;
    color: $color-gray-500;
    cursor: pointer;
    transition: $transition-base;

    &:hover {
      background-color: $color-gray-100;
      color: $color-blue-primary;
    }
  }
  </style>
