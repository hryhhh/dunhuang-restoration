<template>
  <!-- 修复记录表格 -->
  <section class="records">
    <div class="records__header">
      <h2 class="records__title">修复记录列表</h2>
      <div class="records__pagination">
        <span>显示 1-10 / 共 {{ totalRecords }} 条</span>
        <div class="records__pagination-controls">
          <button class="records__pagination-btn" :disabled="currentPage === 1">
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
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>
          <button class="records__pagination-btn" :disabled="currentPage === totalPages">
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
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="records__table-container">
      <table class="records__table">
        <thead>
          <tr>
            <th>ID</th>
            <th>用户</th>
            <th>壁画名称</th>
            <th>洞窟编号</th>
            <th>修复时间</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="record in displayedRecords"
            :key="record.id"
            @click="selectRecord(record)"
            :class="{ 'records__row--selected': selectedRecord && selectedRecord.id === record.id }"
          >
            <td>{{ record.id }}</td>
            <td>
              <div class="records__user">
                <img :src="record.user.avatar" :alt="record.user.name" />
                <div>
                  <div class="records__user-name">{{ record.user.name }}</div>
                  <div class="records__user-email">{{ record.user.email }}</div>
                </div>
              </div>
            </td>
            <td>{{ record.muralName }}</td>
            <td>{{ record.caveNumber }}</td>
            <td>{{ record.date }}</td>
            <td>
              <span class="records__status" :class="`records__status--${record.status}`">
                {{ getStatusText(record.status) }}
              </span>
            </td>
            <td>
              <div class="records__actions">
                <button class="records__action-btn" @click.stop="viewRecord(record)">
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
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
                <button class="records__action-btn" @click.stop="downloadRecord(record)">
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
                </button>
                <button class="records__action-btn" @click.stop="deleteRecord(record)">
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
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    <line x1="10" x2="10" y1="11" y2="17"></line>
                    <line x1="14" x2="14" y1="11" y2="17"></line>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang='ts'>
import { ref, computed, onMounted } from 'vue'

// 定义修复记录的类型
interface User {
  name: string
  email: string
  avatar: string
  role: string
}

export interface RepairRecord {
  id: string
  user: User
  muralName: string
  caveNumber: string
  date: string
  status: 'completed' | 'in-progress' | 'pending'
  algorithm: string
  area: string
  intensity: string
  processingTime: string
  beforeImage: string
  afterImage: string
}

// 分页
const currentPage = ref(1)
const pageSize = 10
const totalRecords = ref(0)
const totalPages = computed(() => Math.ceil(totalRecords.value / pageSize))

// 选中的记录
const selectedRecord = ref<RepairRecord | null>(null)
const selectRecord = (record: RepairRecord) => {
  selectedRecord.value = record
  sliderPosition.value = 50 // 重置滑块位置
}

// 图片对比滑块
const sliderPosition = ref(50)
const isDragging = ref(false)
const comparisonSlider = ref<HTMLElement | null>(null)

// 操作方法
const viewRecord = (record: RepairRecord) => {
  selectedRecord.value = record
  sliderPosition.value = 50
}

// 模拟数据
const mockRecords: RepairRecord[] = [
  {
    id: 'R-2025-0001',
    user: {
      name: '张文化',
      email: 'zhang@example.com',
      avatar: 'https://via.placeholder.com/40',
      role: '高级修复师',
    },
    muralName: '飞天菩萨像',
    caveNumber: '莫高窟第445窟',
    date: '2025-05-12 14:23',
    status: 'completed',
    algorithm: 'DeepRestoration v3.2',
    area: '中部区域',
    intensity: '中等',
    processingTime: '45分钟',
    beforeImage: 'https://via.placeholder.com/800x600',
    afterImage: 'https://via.placeholder.com/800x600',
  },
  {
    id: 'R-2025-0002',
    user: {
      name: '李研究',
      email: 'li@example.com',
      avatar: 'https://via.placeholder.com/40',
      role: '研究员',
    },
    muralName: '千手观音像',
    caveNumber: '莫高窟第57窟',
    date: '2025-05-11 09:45',
    status: 'completed',
    algorithm: 'ColorEnhance v2.1',
    area: '全图',
    intensity: '低',
    processingTime: '32分钟',
    beforeImage: 'https://via.placeholder.com/800x600',
    afterImage: 'https://via.placeholder.com/800x600',
  },
  {
    id: 'R-2025-0003',
    user: {
      name: '王保护',
      email: 'wang@example.com',
      avatar: 'https://via.placeholder.com/40',
      role: '文物保护专家',
    },
    muralName: '佛陀说法图',
    caveNumber: '莫高窟第158窟',
    date: '2025-05-10 16:12',
    status: 'in-progress',
    algorithm: 'TextureRestore v1.5',
    area: '右侧区域',
    intensity: '高',
    processingTime: '进行中',
    beforeImage: 'https://via.placeholder.com/800x600',
    afterImage: 'https://via.placeholder.com/800x600',
  },
  {
    id: 'R-2025-0004',
    user: {
      name: '赵数字',
      email: 'zhao@example.com',
      avatar: 'https://via.placeholder.com/40',
      role: '数字艺术师',
    },
    muralName: '九色鹿本生图',
    caveNumber: '莫高窟第257窟',
    date: '2025-05-09 11:30',
    status: 'completed',
    algorithm: 'DeepRestoration v3.2',
    area: '中央区域',
    intensity: '中等',
    processingTime: '58分钟',
    beforeImage: 'https://via.placeholder.com/800x600',
    afterImage: 'https://via.placeholder.com/800x600',
  },
  {
    id: 'R-2025-0005',
    user: {
      name: '钱历史',
      email: 'qian@example.com',
      avatar: 'https://via.placeholder.com/40',
      role: '历史学家',
    },
    muralName: '维摩诘经变',
    caveNumber: '莫高窟第45窟',
    date: '2025-05-08 14:50',
    status: 'pending',
    algorithm: '待选择',
    area: '待确定',
    intensity: '待确定',
    processingTime: '未开始',
    beforeImage: 'https://via.placeholder.com/800x600',
    afterImage: 'https://via.placeholder.com/800x600',
  },
  {
    id: 'R-2025-0006',
    user: {
      name: '孙技术',
      email: 'sun@example.com',
      avatar: 'https://via.placeholder.com/40',
      role: '技术主管',
    },
    muralName: '药师经变',
    caveNumber: '莫高窟第85窟',
    date: '2025-05-07 10:15',
    status: 'completed',
    algorithm: 'ColorEnhance v2.1',
    area: '全图',
    intensity: '中等',
    processingTime: '40分钟',
    beforeImage: 'https://via.placeholder.com/800x600',
    afterImage: 'https://via.placeholder.com/800x600',
  },
  {
    id: 'R-2025-0007',
    user: {
      name: '周专家',
      email: 'zhou@example.com',
      avatar: 'https://via.placeholder.com/40',
      role: '色彩专家',
    },
    muralName: '涅槃变相',
    caveNumber: '莫高窟第158窟',
    date: '2025-05-06 15:40',
    status: 'completed',
    algorithm: 'TextureRestore v1.5',
    area: '下部区域',
    intensity: '高',
    processingTime: '65分钟',
    beforeImage: 'https://via.placeholder.com/800x600',
    afterImage: 'https://via.placeholder.com/800x600',
  },
  {
    id: 'R-2025-0008',
    user: {
      name: '吴修复',
      email: 'wu@example.com',
      avatar: 'https://via.placeholder.com/40',
      role: '初级修复师',
    },
    muralName: '弥勒经变',
    caveNumber: '莫高窟第76窟',
    date: '2025-05-05 09:20',
    status: 'in-progress',
    algorithm: 'DeepRestoration v3.2',
    area: '左侧区域',
    intensity: '低',
    processingTime: '进行中',
    beforeImage: 'https://via.placeholder.com/800x600',
    afterImage: 'https://via.placeholder.com/800x600',
  },
  {
    id: 'R-2025-0009',
    user: {
      name: '郑学者',
      email: 'zheng@example.com',
      avatar: 'https://via.placeholder.com/40',
      role: '学术研究员',
    },
    muralName: '观无量寿经变',
    caveNumber: '莫高窟第445窟',
    date: '2025-05-04 13:10',
    status: 'completed',
    algorithm: 'ColorEnhance v2.1',
    area: '全图',
    intensity: '中等',
    processingTime: '52分钟',
    beforeImage: '',
    afterImage: '',
  },
  {
    id: 'R-2025-0010',
    user: {
      name: '冯艺术',
      email: 'feng@example.com',
      avatar: '',
      role: '艺术顾问',
    },
    muralName: '天王力士像',
    caveNumber: '莫高窟第57窟',
    date: '2025-05-03 16:30',
    status: 'pending',
    algorithm: '待选择',
    area: '待确定',
    intensity: '待确定',
    processingTime: '未开始',
    beforeImage: '',
    afterImage: '',
  },
]

// 显示的记录
const displayedRecords = computed<RepairRecord[]>(() => {
  return mockRecords
})

// 初始化
onMounted(() => {
  totalRecords.value = mockRecords.length
})

const downloadRecord = (record: RepairRecord) => {
  console.log('下载记录', record.id)
  // 实际应用中这里会触发下载操作
}

const deleteRecord = (record: RepairRecord) => {
  if (confirm(`确定要删除 ID 为 ${record.id} 的修复记录吗？`)) {
    console.log('删除记录', record.id)
    // 实际应用中这里会调用删除API
  }
}

// 获取状态文本
const getStatusText = (status: 'completed' | 'in-progress' | 'pending') => {
  const statusMap: Record<'completed' | 'in-progress' | 'pending', string> = {
    completed: '已完成',
    'in-progress': '进行中',
    pending: '待处理',
  }
  return statusMap[status] || status
}
</script>

<style lang='scss' scoped>
// 记录表格
.records {
  padding: 0 24px 24px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    color: $color-gray-900;
  }

  &__pagination {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 12px;
    color: $color-gray-500;
  }

  &__pagination-controls {
    display: flex;
    gap: 8px;
  }

  &__pagination-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: 1px solid $color-gray-300;
    border-radius: $border-radius;
    background-color: $color-white;
    color: $color-gray-700;
    cursor: pointer;

    &:hover:not(:disabled) {
      background-color: $color-gray-100;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__table-container {
    background-color: $color-white;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    overflow: auto;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid $color-gray-200;
    }

    th {
      font-weight: 500;
      color: $color-gray-600;
      background-color: $color-gray-50;
    }

    tr {
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: $color-gray-50;
      }
    }
  }

  &__row--selected {
    background-color: $color-blue-light !important;
  }

  &__user {
    display: flex;
    align-items: center;
    gap: 12px;

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  &__user-name {
    font-weight: 500;
    color: $color-gray-900;
  }

  &__user-email {
    font-size: 12px;
    color: $color-gray-500;
  }

  &__status {
    display: inline-flex;
    align-items: center;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;

    &--completed {
      background-color: rgba($color-status-completed, 0.1);
      color: $color-status-completed;
    }

    &--in-progress {
      background-color: rgba($color-status-in-progress, 0.1);
      color: $color-status-in-progress;
    }

    &--pending {
      background-color: rgba($color-status-pending, 0.1);
      color: $color-status-pending;
    }
  }

  &__actions {
    display: flex;
    gap: 8px;
  }

  &__action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: $border-radius;
    border: none;
    background-color: transparent;
    color: $color-gray-500;
    cursor: pointer;

    &:hover {
      background-color: $color-gray-100;
      color: $color-gray-700;
    }
  }
}
</style>
