<template>
    <div
      class="image-uploader"
      :class="{ 'image-uploader--dragging': isDragging }"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <input
        type="file"
        ref="fileInput"
        class="image-uploader__input"
        accept="image/*"
        @change="handleFileChange"
      />

      <div class="image-uploader__content">
        <div class="image-uploader__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
            <line x1="16" x2="22" y1="5" y2="5"></line>
            <line x1="19" x2="19" y1="2" y2="8"></line>
            <circle cx="9" cy="9" r="2"></circle>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
          </svg>
        </div>
        <h3 class="image-uploader__title">上传壁画图片</h3>
        <p class="image-uploader__description">
          拖放图片到此处，或
          <button class="image-uploader__button" @click="triggerFileInput">
            点击上传
          </button>
        </p>
        <p class="image-uploader__hint">
          支持 JPG、PNG 格式，最大 20MB
        </p>
      </div>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue';

  const emit = defineEmits(['image-uploaded']);
  const fileInput = ref(null);
  const isDragging = ref(false);

  const triggerFileInput = () => {
    fileInput.value.click();
  };

  const handleDragOver = (event) => {
    isDragging.value = true;
  };

  const handleDragLeave = (event) => {
    isDragging.value = false;
  };

  const handleDrop = (event) => {
    isDragging.value = false;
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file) => {
    // 检查文件类型
    if (!file.type.match('image.*')) {
      alert('请上传图片文件');
      return;
    }

    // 检查文件大小
    if (file.size > 20 * 1024 * 1024) {
      alert('文件大小不能超过20MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      emit('image-uploaded', e.target.result);
    };
    reader.readAsDataURL(file);
  };
  </script>

  <style lang="scss">
  @use '../../styles/main.scss' as *;

  .image-uploader {
    width: 100%;
    border: 2px dashed $color-border;
    border-radius: $border-radius-lg;
    padding: $spacing-8;
    transition: $transition-base;
    background-color: $color-white;

    &--dragging {
      border-color: $color-blue-primary;
      background-color: $color-blue-light;
    }

    &__input {
      display: none;
    }

    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 5rem;
      height: 5rem;
      background-color: $color-blue-light;
      border-radius: $border-radius-full;
      color: $color-blue-primary;
      margin-bottom: $spacing-4;
    }

    &__title {
      font-size: $font-size-xl;
      font-weight: 600;
      color: $color-gray-900;
      margin-bottom: $spacing-2;
    }

    &__description {
      color: $color-gray-600;
      margin-bottom: $spacing-2;
    }

    &__button {
      background: none;
      border: none;
      color: $color-blue-primary;
      font-weight: 500;
      cursor: pointer;
      transition: $transition-base;

      &:hover {
        text-decoration: underline;
      }
    }

    &__hint {
      font-size: $font-size-sm;
      color: $color-gray-500;
    }
  }
  </style>
