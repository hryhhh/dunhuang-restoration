<template>
    <div class="restoration-settings">
      <div class="restoration-settings__header">
        <h2 class="restoration-settings__title">修复设置</h2>
      </div>

      <div class="restoration-settings__content">
        <div class="form-group">
          <label class="form-label">修复模式</label>
          <div class="radio-group">
            <label class="radio">
              <input type="radio" v-model="settings.mode" value="auto" :disabled="disabled" />
              <span class="radio__mark"></span>
              <span class="radio__label">自动修复</span>
            </label>
            <label class="radio">
              <input type="radio" v-model="settings.mode" value="manual" :disabled="disabled" />
              <span class="radio__mark"></span>
              <span class="radio__label">手动调整</span>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">修复强度</label>
          <div class="slider">
            <input
              type="range"
              min="1"
              max="10"
              v-model="settings.intensity"
              class="slider__input"
              :disabled="disabled"
            />
            <div class="slider__value">{{ settings.intensity }}</div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">色彩还原</label>
          <div class="toggle">
            <input
              type="checkbox"
              id="colorRestoration"
              v-model="settings.colorRestoration"
              :disabled="disabled"
            />
            <label for="colorRestoration" class="toggle__label"></label>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">纹理增强</label>
          <div class="toggle">
            <input
              type="checkbox"
              id="textureEnhancement"
              v-model="settings.textureEnhancement"
              :disabled="disabled"
            />
            <label for="textureEnhancement" class="toggle__label"></label>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">修复算法</label>
          <select
            v-model="settings.algorithm"
            class="select"
            :disabled="disabled"
          >
            <option value="ai">AI深度学习</option>
            <option value="traditional">传统算法</option>
            <option value="hybrid">混合算法</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">备注</label>
          <textarea
            v-model="settings.notes"
            class="textarea"
            placeholder="输入修复备注信息..."
            :disabled="disabled"
          ></textarea>
        </div>

        <button
          class="btn btn--primary btn--block"
          @click="startRestoration"
          :disabled="disabled"
        >
          开始修复
        </button>
      </div>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue';

  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false
    }
  });

  const emit = defineEmits(['start-restoration']);

  const settings = ref({
    mode: 'auto',
    intensity: 5,
    colorRestoration: true,
    textureEnhancement: true,
    algorithm: 'ai',
    notes: ''
  });

  const startRestoration = () => {
    emit('start-restoration', settings.value);
  };
  </script>

  <style lang="scss">
    @use '../../styles/main.scss' as *;
    @use 'sass:color';

  .restoration-settings {
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
      padding: $spacing-6;
    }
  }

  .form-group {
    margin-bottom: $spacing-4;

    &:last-of-type {
      margin-bottom: $spacing-6;
    }
  }

  .form-label {
    display: block;
    font-size: $font-size-sm;
    font-weight: 500;
    color: $color-gray-700;
    margin-bottom: $spacing-2;
  }

  .radio-group {
    display: flex;
    gap: $spacing-4;
  }

  .radio {
    display: flex;
    align-items: center;
    cursor: pointer;

    input {
      position: absolute;
      opacity: 0;

      &:checked + .radio__mark {
        border-color: $color-blue-primary;

        &::after {
          transform: scale(1);
        }
      }

      &:disabled + .radio__mark {
        border-color: $color-gray-300;
        background-color: $color-gray-100;
      }

      &:disabled ~ .radio__label {
        color: $color-gray-400;
      }
    }

    &__mark {
      position: relative;
      display: inline-block;
      width: 18px;
      height: 18px;
      border: 2px solid $color-gray-400;
      border-radius: $border-radius-full;
      margin-right: $spacing-2;
      transition: $transition-base;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        width: 10px;
        height: 10px;
        background-color: $color-blue-primary;
        border-radius: $border-radius-full;
        transition: transform 0.2s ease;
      }
    }

    &__label {
      font-size: $font-size-sm;
      color: $color-gray-700;
    }
  }

  .slider {
    display: flex;
    align-items: center;
    gap: $spacing-4;

    &__input {
      flex: 1;
      height: 6px;
      background-color: $color-gray-200;
      border-radius: $border-radius-full;
      appearance: none;
      outline: none;

      &::-webkit-slider-thumb {
        appearance: none;
        width: 16px;
        height: 16px;
        background-color: $color-blue-primary;
        border-radius: $border-radius-full;
        cursor: pointer;
      }

      &:disabled {
        opacity: 0.5;
      }
    }

    &__value {
      width: 24px;
      text-align: center;
      font-size: $font-size-sm;
      font-weight: 500;
      color: $color-gray-700;
    }
  }

  .toggle {
    position: relative;
    display: inline-block;

    input {
      position: absolute;
      opacity: 0;

      &:checked + .toggle__label {
        background-color: $color-blue-primary;

        &::after {
          transform: translateX(18px);
        }
      }

      &:disabled + .toggle__label {
        background-color: $color-gray-300;
        cursor: not-allowed;
      }
    }

    &__label {
      display: block;
      width: 40px;
      height: 22px;
      background-color: $color-gray-300;
      border-radius: $border-radius-full;
      cursor: pointer;
      transition: $transition-base;

      &::after {
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        width: 16px;
        height: 16px;
        background-color: $color-white;
        border-radius: $border-radius-full;
        transition: transform 0.2s ease;
      }
    }
  }

  .select {
    width: 100%;
    padding: $spacing-2 $spacing-3;
    font-size: $font-size-sm;
    color: $color-gray-700;
    background-color: $color-white;
    border: 1px solid $color-border;
    border-radius: $border-radius;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 8px center;

    &:disabled {
      background-color: $color-gray-100;
      color: $color-gray-400;
      cursor: not-allowed;
    }
  }

  .textarea {
    width: 100%;
    padding: $spacing-2 $spacing-3;
    font-size: $font-size-sm;
    color: $color-gray-700;
    background-color: $color-white;
    border: 1px solid $color-border;
    border-radius: $border-radius;
    resize: vertical;
    min-height: 80px;

    &:disabled {
      background-color: $color-gray-100;
      color: $color-gray-400;
      cursor: not-allowed;
    }
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: $spacing-2 $spacing-4;
    font-size: $font-size-sm;
    font-weight: 500;
    border-radius: $border-radius;
    border: none;
    transition: $transition-base;
    cursor: pointer;

    &--primary {
      background-color: $color-blue-primary;
      color: $color-white;

      &:hover:not(:disabled) {
        background-color: color.adjust($color-blue-primary, $lightness:-10%);
      }
    }

    &--block {
      width: 100%;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  </style>
