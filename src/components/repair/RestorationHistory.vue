<template>
    <div class="restoration-history">
      <div class="restoration-history__header">
        <h2 class="restoration-history__title">修复历史</h2>
      </div>

      <div class="restoration-history__content">
        <div v-if="historyItems.length > 0" class="restoration-history__list">
          <div
            v-for="(item, index) in historyItems"
            :key="index"
            class="history-item"
            @click="loadHistoryItem(item)"
          >
            <div class="history-item__image">
              <img :src="item.restoredImage" alt="修复历史" />
            </div>
            <div class="history-item__info">
              <h3 class="history-item__title">{{ item.title }}</h3>
              <p class="history-item__date">{{ item.date }}</p>
            </div>
          </div>
        </div>

        <div v-else class="restoration-history__empty">
          <p>暂无修复历史记录</p>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue';

  const emit = defineEmits(['load-history']);

  // 模拟历史数据
  const historyItems = ref([
    {
      id: 1,
      title: '飞天壁画',
      date: '2025-05-10',
      originalImage: 'https://typora-hhhhry.oss-cn-beijing.aliyuncs.com/OIP-C%20(7).jpg',
      restoredImage: 'https://typora-hhhhry.oss-cn-beijing.aliyuncs.com/OIP-C%20(7).jpg'
    },
    {
      id: 2,
      title: '菩萨像',
      date: '2025-05-08',
      originalImage: 'https://typora-hhhhry.oss-cn-beijing.aliyuncs.com/OIP-C%20(7).jpg',
      restoredImage: 'https://typora-hhhhry.oss-cn-beijing.aliyuncs.com/rc-upload-1628405839799-18.jpg'
    },
    {
      id: 3,
      title: '佛像壁画',
      date: '2025-05-05',
      originalImage: '../assets/03.jpg',
      restoredImage: 'https://typora-hhhhry.oss-cn-beijing.aliyuncs.com/OIP-C%20(10).jpg'
    }
  ]);

  const loadHistoryItem = (item) => {
    emit('load-history', item);
  };
  </script>

  <style lang="scss">
  @use '../../styles/main.scss' as *;

  .restoration-history {
    background-color: $color-white;
    border-radius: $border-radius-lg;
    box-shadow: 0 1px 3px rgba($color-black, 0.05);
    overflow: hidden;

    &__header {
      padding: $spacing-4 $spacing-6;
      border-bottom: 1px solid $color-border;
    }

    &__title {
      font-size: $font-size-lg;
      font-weight: 600;
      color: $color-gray-900;
    }

    &__content {
      padding: $spacing-4;
    }

    &__empty {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100px;
      color: $color-gray-500;
      font-size: $font-size-sm;
    }
  }

  .history-item {
    display: flex;
    align-items: center;
    gap: $spacing-3;
    padding: $spacing-2;
    border-radius: $border-radius;
    cursor: pointer;
    transition: $transition-base;

    &:hover {
      background-color: $color-gray-50;
    }

    &:not(:last-child) {
      margin-bottom: $spacing-2;
    }

    &__image {
      width: 60px;
      height: 60px;
      border-radius: $border-radius;
      overflow: hidden;
      flex-shrink: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__info {
      flex: 1;
      min-width: 0;
    }

    &__title {
      font-size: $font-size-sm;
      font-weight: 500;
      color: $color-gray-900;
      margin-bottom: $spacing-1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__date {
      font-size: $font-size-xs;
      color: $color-gray-500;
    }
  }
  </style>
