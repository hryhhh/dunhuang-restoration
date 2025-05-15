<template>
  <div class="admin-dashboard">

    <AdminSidebar />

    <!-- 主内容区域 -->
    <main class="main-content">
      <AdminHeader />
      <AdminToolBar />
      <AdminStats />
      <AdminRecords />
      <AdminDetail />

    </main>
  </div>
</template>

<script setup>

import AdminHeader from '@/components/admin/AdminHeader.vue'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import AdminToolBar from '@/components/admin/AdminToolBar.vue'
import AdminRecords from '@/components/admin/AdminRecords.vue'
import AdminDetail from '@/components/admin/AdminDetail.vue'
import AdminStats from '@/components/admin/AdminStats.vue'

</script>

<style lang="scss">
@use '../styles/main.scss' as *;
@use 'sass:color';

// 管理员仪表盘布局
.admin-dashboard {
  display: flex;
  min-height: 100vh;
}


// 主内容区域
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

// 响应式调整
@media (max-width: 1200px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .detail__content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    z-index: 100;
    height: 100vh;
    transform: translateX(-100%);

    &--collapsed {
      transform: translateX(0);
    }
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .toolbar {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .records__table {
    th:nth-child(4),
    td:nth-child(4),
    th:nth-child(5),
    td:nth-child(5) {
      display: none;
    }
  }
}
</style>
