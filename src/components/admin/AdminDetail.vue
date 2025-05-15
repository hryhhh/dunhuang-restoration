<template>
  <!-- 修复详情 -->
  <section v-if="selectedRecord" class="detail">
    <div class="detail__header">
      <h2 class="detail__title">修复详情</h2>
      <button class="detail__close" @click="selectedRecord = null">
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
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
      </button>
    </div>
    <div class="detail__content">
      <div class="detail__info">
        <div class="detail__info-group">
          <h3 class="detail__info-title">基本信息</h3>
          <div class="detail__info-row">
            <span class="detail__info-label">修复ID</span>
            <span class="detail__info-value">{{ selectedRecord.id }}</span>
          </div>
          <div class="detail__info-row">
            <span class="detail__info-label">壁画名称</span>
            <span class="detail__info-value">{{ selectedRecord.muralName }}</span>
          </div>
          <div class="detail__info-row">
            <span class="detail__info-label">洞窟编号</span>
            <span class="detail__info-value">{{ selectedRecord.caveNumber }}</span>
          </div>
          <div class="detail__info-row">
            <span class="detail__info-label">修复时间</span>
            <span class="detail__info-value">{{ selectedRecord.date }}</span>
          </div>
          <div class="detail__info-row">
            <span class="detail__info-label">修复状态</span>
            <span class="detail__info-value">
              <span class="records__status" :class="`records__status--${selectedRecord.status}`">
                {{ getStatusText(selectedRecord.status) }}
              </span>
            </span>
          </div>
        </div>
        <div class="detail__info-group">
          <h3 class="detail__info-title">用户信息</h3>
          <div class="detail__user">
            <img :src="selectedRecord.user.avatar" :alt="selectedRecord.user.name" />
            <div>
              <div class="detail__user-name">{{ selectedRecord.user.name }}</div>
              <div class="detail__user-email">{{ selectedRecord.user.email }}</div>
              <div class="detail__user-role">{{ selectedRecord.user.role }}</div>
            </div>
          </div>
        </div>
        <div class="detail__info-group">
          <h3 class="detail__info-title">修复参数</h3>
          <div class="detail__info-row">
            <span class="detail__info-label">修复算法</span>
            <span class="detail__info-value">{{ selectedRecord.algorithm }}</span>
          </div>
          <div class="detail__info-row">
            <span class="detail__info-label">修复区域</span>
            <span class="detail__info-value">{{ selectedRecord.area }}</span>
          </div>
          <div class="detail__info-row">
            <span class="detail__info-label">修复强度</span>
            <span class="detail__info-value">{{ selectedRecord.intensity }}</span>
          </div>
          <div class="detail__info-row">
            <span class="detail__info-label">处理时长</span>
            <span class="detail__info-value">{{ selectedRecord.processingTime }}</span>
          </div>
        </div>
      </div>
      <div class="detail__comparison">
        <h3 class="detail__comparison-title">修复前后对比</h3>
        <div class="detail__comparison-container">
          <div class="detail__comparison-slider" ref="comparisonSlider">
            <div class="detail__comparison-before" :style="{ width: sliderPosition + '%' }">
              <img :src="selectedRecord.beforeImage" alt="修复前" />
              <span class="detail__comparison-label">修复前</span>
            </div>
            <div class="detail__comparison-after">
              <img :src="selectedRecord.afterImage" alt="修复后" />
              <span class="detail__comparison-label">修复后</span>
            </div>
            <div
              class="detail__comparison-handle"
              :style="{ left: sliderPosition + '%' }"
              @mousedown="startDrag"
              @touchstart="startDrag"
            >
              <div class="detail__comparison-handle-line"></div>
            </div>
          </div>
        </div>
        <div class="detail__comparison-controls">
          <button class="btn btn--outline btn--sm" @click="sliderPosition = 0">仅显示修复前</button>
          <button class="btn btn--outline btn--sm" @click="sliderPosition = 50">对比显示</button>
          <button class="btn btn--outline btn--sm" @click="sliderPosition = 100">
            仅显示修复后
          </button>
        </div>
      </div>
    </div>
    <div class="detail__footer">
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
        <span>导出报告</span>
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
        <span>编辑记录</span>
      </button>
    </div>
  </section>
</template>

<script setup lang='ts'>
import { ref, onUnmounted } from 'vue'
import type { RepairRecord } from './AdminRecords.vue'

// 图片对比滑块
const sliderPosition = ref(50)
const isDragging = ref(false)
const comparisonSlider = ref<HTMLElement | null>(null)
const selectedRecord = ref<RepairRecord | null>(null)

const getStatusText = (status: RepairRecord['status']): string => {
  switch (status) {
    case 'completed':
      return '已完成'
    case 'in-progress':
      return '进行中'
    case 'pending':
      return '待处理'
    default:
      return ''
  }
}

const startDrag = (e: MouseEvent | TouchEvent): void => {
  e.preventDefault()
  isDragging.value = true
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('touchmove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchend', stopDrag)
}

const onDrag = (e: MouseEvent | TouchEvent): void => {
  if (!isDragging.value || !comparisonSlider.value) return

  const sliderRect = comparisonSlider.value.getBoundingClientRect()
  const sliderWidth = sliderRect.width

  // 获取鼠标或触摸位置
  const clientX = e instanceof MouseEvent ? e.clientX : e.touches?.[0].clientX

  if (clientX === undefined) return

  // 计算相对位置
  let position = ((clientX - sliderRect.left) / sliderWidth) * 100

  // 限制在0-100范围内
  position = Math.max(0, Math.min(100, position))

  sliderPosition.value = position
}

const stopDrag = (): void => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchend', stopDrag)
}

// 清理事件监听器
onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchend', stopDrag)
})
</script>

<style lang='scss' scoped>
// 详情面板
.detail {
  margin: 0 24px 24px;
  background-color: $color-white;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  overflow: hidden;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    border-bottom: 1px solid $color-gray-200;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    color: $color-gray-900;
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background-color: transparent;
    color: $color-gray-500;
    cursor: pointer;

    &:hover {
      background-color: $color-gray-100;
      color: $color-gray-700;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 24px;
    padding: 24px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__info-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__info-title {
    font-size: 14px;
    font-weight: 600;
    color: $color-gray-900;
    padding-bottom: 8px;
    border-bottom: 1px solid $color-gray-200;
  }

  &__info-row {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }

  &__info-label {
    color: $color-gray-500;
  }

  &__info-value {
    font-weight: 500;
    color: $color-gray-900;
  }

  &__user {
    display: flex;
    gap: 12px;

    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  &__user-name {
    font-weight: 600;
    color: $color-gray-900;
  }

  &__user-email {
    font-size: 13px;
    color: $color-gray-500;
  }

  &__user-role {
    font-size: 12px;
    color: $color-blue-primary;
    margin-top: 4px;
  }

  &__comparison {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__comparison-title {
    font-size: 14px;
    font-weight: 600;
    color: $color-gray-900;
    margin-bottom: 8px;
  }

  &__comparison-container {
    position: relative;
    width: 100%;
    height: 400px;
    border-radius: $border-radius;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &__comparison-slider {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &__comparison-before,
  &__comparison-after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__comparison-before {
    z-index: 2;
  }

  &__comparison-after {
    z-index: 1;
  }

  &__comparison-handle {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: $color-white;
    z-index: 3;
    cursor: ew-resize;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: $color-white;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }

    &-line {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 16px;
      height: 2px;
      background-color: $color-gray-500;

      &::before,
      &::after {
        content: '';
        position: absolute;
        width: 6px;
        height: 2px;
        background-color: $color-gray-500;
      }

      &::before {
        left: -2px;
        top: -3px;
        transform: rotate(45deg);
      }

      &::after {
        left: -2px;
        bottom: -3px;
        transform: rotate(-45deg);
      }
    }
  }

  &__comparison-label {
    position: absolute;
    top: 16px;
    padding: 4px 8px;
    background-color: rgba($color-black, 0.6);
    color: $color-white;
    font-size: 12px;
    font-weight: 500;
    border-radius: 4px;
  }

  &__comparison-before &__comparison-label {
    left: 16px;
  }

  &__comparison-after &__comparison-label {
    right: 16px;
  }

  &__comparison-controls {
    display: flex;
    justify-content: center;
    gap: 12px;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 16px 24px;
    border-top: 1px solid $color-gray-200;
  }
}
</style>
