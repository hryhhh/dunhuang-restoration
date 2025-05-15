<template>
  <!-- 筛选工具栏 -->
  <section class="toolbar">
    <div class="toolbar__filters">
      <div class="toolbar__filter">
        <label for="date-range">时间范围</label>
        <select id="date-range" v-model="filters.dateRange">
          <option value="today">今天</option>
          <option value="week">本周</option>
          <option value="month">本月</option>
          <option value="quarter">本季度</option>
          <option value="year">今年</option>
          <option value="all">全部</option>
        </select>
      </div>
      <div class="toolbar__filter">
        <label for="cave-number">洞窟编号</label>
        <select id="cave-number" v-model="filters.caveNumber">
          <option value="all">全部</option>
          <option value="57">莫高窟第57窟</option>
          <option value="158">莫高窟第158窟</option>
          <option value="445">莫高窟第445窟</option>
        </select>
      </div>
      <div class="toolbar__filter">
        <label for="status">修复状态</label>
        <select id="status" v-model="filters.status">
          <option value="all">全部</option>
          <option value="completed">已完成</option>
          <option value="in-progress">进行中</option>
          <option value="pending">待处理</option>
        </select>
      </div>
    </div>
    <div class="toolbar__actions">
      <button class="btn btn--outline">
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
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        <span>导出数据</span>
      </button>
      <button class="btn btn--primary">
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
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
        <span>生成报告</span>
      </button>
    </div>
  </section>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue';
// 筛选条件
const filters = ref({
  dateRange: 'month',
  caveNumber: 'all',
  status: 'all'
});

</script>

<style lang='scss' scoped>
// 工具栏
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px 24px;

  &__filters {
    display: flex;
    gap: 16px;
  }

  &__filter {
    display: flex;
    flex-direction: column;
    gap: 4px;

    label {
      font-size: 12px;
      font-weight: 500;
      color: $color-gray-500;
    }

    select {
      padding: 8px 12px;
      border: 1px solid $color-gray-300;
      border-radius: $border-radius;
      background-color: $color-white;
      color: $color-gray-800;
      font-size: 14px;
      outline: none;
      min-width: 120px;

      &:focus {
        border-color: $color-blue-primary;
      }
    }
  }

  &__actions {
    display: flex;
    gap: 12px;
  }
}

</style>
