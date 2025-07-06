<template>
  <div
    class="lazy-image"
    ref="containerRef"
    :class="{
      'lazy-image--loaded': isLoaded,
      'lazy-image--error': isError
    }"
  >
  <!-- 骨架屏(加载前) -->
    <div v-if="!isVisible" class="lazy-image__skeleton">
      <div class="lazy-image__placeholder-shimmer"></div>
    </div>
    <!-- 低质量占位符(进入视口但原图未加载完时显示) -->
    <img
      v-if="isVisible && !isLoaded && placeholderSrc"
      :src="placeholderSrc"
      :alt="alt"
      class="lazy-image__placeholder"
    />
    <!-- 高质量原图 -->
    <img
      v-if="isVisible"
      :src="src"
      :alt="alt"
      @load="onImageLoaded"
      @error="onImageError"
      :class="{ 'lazy-image__img--visible': isLoaded }"
      class="lazy-image__img"
    />
    <!-- 加载失败占位 -->
    <div v-if="isError" class="lazy-image__error">
      <p>图片加载失败</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface Props {
  src: string;//高质量图片地址
  placeholderSrc?: string;//低质量占位图地址
  alt?: string;//图片描述
  threshold?: number; // 触发懒加载的阈值
  rootMargin?: string; // 交叉观察器的根元素边距
}

const props = withDefaults(defineProps<Props>(), {// 设置默认值
  alt: '',
  threshold: 0.1,
  rootMargin: '50px'
})

const containerRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)//是否进入视口
const isLoaded = ref(false)//原图是否加载完成
const isError = ref(false)

// 计算属性
const src = computed(() => props.src)

// 处理图片加载成功
const onImageLoaded = () => {
  isLoaded.value = true
}

// 处理图片加载错误
const onImageError = () => {
  isError.value = true
}

// 初始化交叉观察器IntersectionObserver
let observer: IntersectionObserver | null = null

onMounted(() => {
  // 创建交叉观察器实例
  observer = new IntersectionObserver(
    (entries) => {
      // 如果元素进入视口
      if (entries[0].isIntersecting) {
        isVisible.value = true
        // 停止观察该元素
        if (observer && containerRef.value) {
          observer.unobserve(containerRef.value)
        }
      }
    },
    {
      threshold: props.threshold,
      rootMargin: props.rootMargin
    }
  )

  // 开始观察目标元素
  if (containerRef.value) {
    observer.observe(containerRef.value)
  }
})

onUnmounted(() => {
  // 组件销毁时，断开观察器连接
  if (observer && containerRef.value) {
    observer.unobserve(containerRef.value)
    observer.disconnect()
  }
})
</script>

<style lang='scss' scoped>
.lazy-image {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;

  &__skeleton {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
  }

  &__placeholder-shimmer {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  &__placeholder,
  &__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__placeholder {
    filter: blur(10px);
    transform: scale(1.05);
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }

  &__img {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    &--visible {
      opacity: 1;
    }
  }

  &--loaded .lazy-image__placeholder {
    opacity: 0;
  }

  &__error {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8d7da;
    color: #721c24;
    font-size: 14px;
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
