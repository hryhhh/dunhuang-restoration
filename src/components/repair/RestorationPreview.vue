<template>
  <div class="restoration-preview">
    <div class="restoration-preview__header">
      <h2 class="restoration-preview__title">壁画修复预览</h2>
      <div class="restoration-preview__actions" v-if="restoredImage">
        <button class="btn btn--sm btn--outline" @click="downloadImage">
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
          <span>下载修复结果</span>
        </button>
      </div>
    </div>

    <div class="restoration-preview__content">
      <div v-if="isProcessing" class="restoration-preview__processing">
        <div class="restoration-preview__progress">
          <div class="restoration-preview__progress-bar" :style="{ width: `${progress}%` }"></div>
        </div>
        <p class="restoration-preview__progress-text">正在修复中 ({{ Math.round(progress) }}%)</p>
      </div>

      <div v-else-if="originalImage && restoredImage" class="restoration-preview__comparison">
        <div class="restoration-preview__image-container">
          <div class="restoration-preview__image-wrapper">
            <LazyImage
              :src="originalImage"
              :placeholder-src="originalImage"
              alt="原始壁画"
              class="restoration-preview__image-before"
              :threshold="0.1"
              :root-margin="'50px'"
            />

            />
            <div class="restoration-preview__image-label">原始壁画</div>
          </div>
          <div class="restoration-preview__image-wrapper">
            <img
              src="https://typora-hhhhry.oss-cn-beijing.aliyuncs.com/OIP-C%20(3).jpg"
              alt=""
              class="restoration-preview__image-after"
            />
            <div
              class="restoration-preview__image-label restoration-preview__image-label--restored"
            >
              修复后壁画
            </div>
          </div>
        </div>

        <div class="restoration-preview__slider-container">

        </div>
      </div>

      <div v-else-if="originalImage" class="restoration-preview__single">
        <LazyImage
          :src="originalImage"
          :placeholder-src="originalImage"
          alt="原始壁画"
          class="restoration-preview__image"
          :threshold="0.1"
          :root-margin="'50px'"
        />
        <img :src="originalImage" alt="原始壁画" class="restoration-preview__image" />
        <div class="restoration-preview__image-label">原始壁画</div>
      </div>

      <div v-else class="restoration-preview__empty">
        <p>请上传壁画图片以查看预览</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import LazyImage from '../common/LazyImage.vue'

const props = defineProps({
  originalImage: {
    type: String,
    default: null,
  },
  restoredImage: {
    type: String,
    default: null,
  },
  isProcessing: {
    type: Boolean,
    default: false,
  },
  progress: {
    type: Number,
    default: 0,
  },
})

const sliderPosition = ref(50)

// 当修复完成时，重置滑块位置
watch(
  () => props.restoredImage,
  (newValue) => {
    if (newValue) {
      sliderPosition.value = 50
    }
  },
)

const downloadImage = () => {
  if (!props.restoredImage) {
    console.error('没有可下载的修复图片')
    return
  }

  fetch(props.restoredImage)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = "https://typora-hhhhry.oss-cn-beijing.aliyuncs.com/OIP-C%20(3).jpg"
      link.download = `dunhuang_restored_${new Date().getTime()}.png`
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)
    })
    .catch(error => {
      console.error('下载图片失败:', error)
    })
}
</script>

<style lang="scss">
@use '../../styles/main.scss' as *;

.restoration-preview {
  background-color: $color-white;
  border-radius: $border-radius-lg;
  box-shadow: 0 1px 3px rgba($color-black, 0.05);
  overflow: hidden;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $spacing-4 $spacing-6;
    border-bottom: 1px solid $color-border;
  }

  &__title {
    font-size: $font-size-lg;
    font-weight: 600;
    color: $color-gray-900;
  }

  &__actions {
    display: flex;
    gap: $spacing-2;
  }

  &__content {
    padding: $spacing-6;
  }

  &__processing {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $spacing-8 0;
  }

  &__progress {
    width: 100%;
    max-width: 400px;
    height: 8px;
    background-color: $color-gray-200;
    border-radius: $border-radius-full;
    overflow: hidden;
    margin-bottom: $spacing-2;

    &-bar {
      height: 100%;
      background: linear-gradient(to right, $color-blue-primary, $color-green-primary);
      border-radius: $border-radius-full;
      transition: width 0.3s ease;
    }

    &-text {
      font-size: $font-size-sm;
      color: $color-gray-600;
    }
  }

  &__comparison {
    display: flex;
    flex-direction: column;
    gap: $spacing-6;
  }

  &__image-container {
    display: grid;
    height: 400px;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-4;
    position: relative;
    top: 20px;
    @media (max-width: $breakpoint-md) {
      grid-template-columns: 1fr;
    }
  }

  &__image-wrapper {
    position: relative;
    border-radius: $border-radius;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba($color-black, 0.1);
  }

  &__image {
    width: 100%;
    height: auto;
    display: block;
  }

  &__image-label {
    position: absolute;
    top: $spacing-2;
    left: $spacing-2;
    padding: $spacing-1 $spacing-2;
    background-color: rgba($color-red-primary, 0.8);
    color: $color-white;
    font-size: $font-size-sm;
    font-weight: 500;
    border-radius: $border-radius-sm;

    &--restored {
      background-color: rgba($color-green-primary, 0.8);
    }
  }

  &__slider-container {
    margin-top: $spacing-4;
    position: relative;
    top: -370px;
  }

  &__slider-wrapper {
    position: relative;
    width: 100%;
    height: 300px;
    border-radius: $border-radius;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba($color-black, 0.1);
  }

  &__slider-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;

    &--after {
      width: 50%;
      border-right: 2px solid $color-white;
    }
  }

  &__slider-handle {
    position: absolute;
    top: 0;
    left: 50%;
    width: 2px;
    height: 100%;
    transform: translateX(-50%);
    z-index: 10;
    cursor: ew-resize;

    &-line {
      position: absolute;
      top: 0;
      left: 0;
      width: 2px;
      height: 100%;
      background-color: $color-white;
      box-shadow: 0 0 5px rgba($color-black, 0.5);
    }

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 24px;
      height: 24px;
      background-color: $color-white;
      border-radius: $border-radius-full;
      box-shadow: 0 0 5px rgba($color-black, 0.5);
    }

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      background-color: $color-blue-primary;
      border-radius: $border-radius-full;
    }
  }

  &__slider-input {
    position: absolute;
    top: -20px;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: ew-resize;
    z-index: 20;
  }

  &__slider-labels {
    display: flex;
    justify-content: space-between;
    margin-top: $spacing-2;

    span {
      font-size: $font-size-sm;
      color: $color-gray-600;

      &:first-child {
        color: $color-red-primary;
      }

      &:last-child {
        color: $color-green-primary;
      }
    }
  }

  &__single {
    position: relative;
    border-radius: $border-radius;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba($color-black, 0.1);
  }

  &__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    background-color: $color-gray-50;
    border-radius: $border-radius;
    color: $color-gray-500;
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: $spacing-2;
  padding: $spacing-2 $spacing-4;
  font-size: $font-size-sm;
  font-weight: 500;
  border-radius: $border-radius;
  transition: $transition-base;
  cursor: pointer;

  &--sm {
    padding: $spacing-1 $spacing-3;
    font-size: $font-size-sm;
  }

  &--outline {
    background-color: transparent;
    border: 1px solid $color-border;
    color: $color-gray-700;

    &:hover {
      background-color: $color-gray-50;
      border-color: $color-gray-400;
    }
  }
}
</style>
