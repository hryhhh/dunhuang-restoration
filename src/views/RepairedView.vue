<template>
  <div class="restoration-app">
    <Header />
    <div class="restoration-app__content">
      <Sidebar />
      <main class="restoration-app__main">
        <div class="container">
          <h1 class="page-title">壁画修复工作台</h1>

          <div class="restoration-workspace">
            <div class="restoration-workspace__main">
              <ImageUploader @image-uploaded="handleImageUploaded" />
              <RestorationPreview
                v-if="originalImage || restoredImage"
                :originalImage="originalImage"
                :restoredImage="restoredImage"
                :isProcessing="isProcessing"
                :progress="progress"
              />
            </div>
            <div class="restoration-workspace__sidebar">
              <RestorationSettings
                v-if="originalImage"
                :disabled="isProcessing"
                @start-restoration="startRestoration"
              />
              <RestorationHistory @load-history="loadHistoryItem" />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from '@/components/repair/Header.vue';
import Sidebar from '@/components/repair/Sidebar.vue';
import ImageUploader from '@/components/repair/ImageUploader.vue';
import RestorationPreview from '@/components/repair/RestorationPreview.vue';
import RestorationSettings from '@/components/repair/RestorationSettings.vue';
import RestorationHistory from '@/components/repair/RestorationHistory.vue';


const originalImage = ref(null);
const restoredImage = ref(null);
const isProcessing = ref(false);
const progress = ref(0);

const handleImageUploaded = (imageData) => {
  originalImage.value = imageData;
  restoredImage.value = null;
  progress.value = 0;
};

const startRestoration = async (settings) => {
  if (!originalImage.value) return;

  isProcessing.value = true;
  progress.value = 0;

  try {
    // 模拟进度更新
    const progressInterval = setInterval(() => {
      progress.value += Math.random() * 10;
      if (progress.value >= 100) {
        progress.value = 100;
        clearInterval(progressInterval);
      }
    }, 500);

    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 5000));

    // 清除进度更新
    clearInterval(progressInterval);
    progress.value = 100;

    // 模拟获取修复后的图片
    // 实际应用中，这里应该是从后端API获取修复后的图片
    restoredImage.value = originalImage.value;

    // 添加到历史记录
    // 实际应用中，这可能是由后端处理的
  } catch (error) {
    console.error('修复过程出错:', error);
  } finally {
    isProcessing.value = false;
  }
};

const loadHistoryItem = (historyItem) => {
  originalImage.value = historyItem.originalImage;
  restoredImage.value = historyItem.restoredImage;
};
</script>

<style lang="scss">
@use '../styles/main.scss' as *;

.restoration-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: $color-background;

  &__content {
    display: flex;
    flex: 1;
  }

  &__main {
    flex: 1;
    padding: $spacing-6 0;
    overflow-y: auto;
  }
}

.page-title {
  font-size: $font-size-3xl;
  font-weight: 700;
  color: $color-blue-primary;
  margin-bottom: $spacing-6;
}

.restoration-workspace {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-6;

  @media (min-width: $breakpoint-lg) {
    grid-template-columns: 2fr 1fr;
  }

  &__main {
    display: flex;
    flex-direction: column;
    gap: $spacing-6;
  }

  &__sidebar {
    display: flex;
    flex-direction: column;
    gap: $spacing-6;
  }
}
</style>
