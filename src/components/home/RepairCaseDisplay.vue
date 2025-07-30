<template>
<!-- 修复案例展示 -->
<section id="gallery" class="gallery">
        <div class="container">
          <div class="section-header">
            <div class="badge badge--ochre">修复案例</div>
            <h2 class="section-title">壁画修复成果展示</h2>
            <p class="section-description">
              见证千年壁画的数字化重生，展现北齐艺术的永恒魅力
            </p>
          </div>

          <div class="gallery__content">
            <div class="gallery__tabs">
              <button
                class="gallery__tab"
                :class="{ 'gallery__tab--active': activeTab === 'case1' }"
                @click="activeTab = 'case1'"
              >
                飞天壁画修复
              </button>
              <button
                class="gallery__tab"
                :class="{ 'gallery__tab--active': activeTab === 'case2' }"
                @click="activeTab = 'case2'"
              >
                菩萨像修复
              </button>
              <button
                class="gallery__tab"
                :class="{ 'gallery__tab--active': activeTab === 'case3' }"
                @click="activeTab = 'case3'"
              >
                佛像壁画修复
              </button>
            </div>

            <div class="gallery__tab-content" v-if="activeTab === 'case1'">
              <div class="restoration-case">
                <div class="restoration-case__info">
                  <h3 class="restoration-case__title">第329窟飞天壁画</h3>
                  <p class="restoration-case__description">
                    该壁画创作于唐代，因年代久远出现了严重的褪色和局部脱落。通过我们的AI修复系统，成功还原了飞天形象的鲜艳色彩和精细线条。
                  </p>
                  <div class="restoration-case__legend">
                    <div class="legend-item">
                      <span class="legend-item__label">修复前</span>
                      <div class="legend-item__line legend-item__line--before"></div>
                    </div>
                    <div class="legend-item">
                      <span class="legend-item__label">修复后</span>
                      <div class="legend-item__line legend-item__line--after"></div>
                    </div>
                  </div>
                </div>
                <div class="restoration-case__image">
                  <div class="restoration-case__image-gradient"></div>
                  <div class="restoration-case__image-container">
                    <div class="restoration-case__image-before">
                      <img src="https://typora-hhhhry.oss-cn-beijing.aliyuncs.com/OIP-C%20(7).jpg" alt="修复前的飞天壁画" />
                    </div>
                    <div class="restoration-case__image-after">
                      <img src="https://typora-hhhhry.oss-cn-beijing.aliyuncs.com/OIP-C%20(3).jpg" alt="修复后的飞天壁画" />
                    </div>
                  </div>
                  <div class="restoration-case__image-divider"></div>
                </div>
              </div>
            </div>

            <div class="gallery__tab-content" v-if="activeTab === 'case2'">
              <div class="restoration-case">
                <div class="restoration-case__info">
                  <h3 class="restoration-case__title">第57窟菩萨像</h3>
                  <p class="restoration-case__description">
                    此菩萨像壁画创作于北魏时期，面部细节已经模糊不清。通过AI修复技术，成功恢复了菩萨面部的精细特征和庄严神态。
                  </p>
                  <div class="restoration-case__legend">
                    <div class="legend-item">
                      <span class="legend-item__label">修复前</span>
                      <div class="legend-item__line legend-item__line--before"></div>
                    </div>
                    <div class="legend-item">
                      <span class="legend-item__label">修复后</span>
                      <div class="legend-item__line legend-item__line--after"></div>
                    </div>
                  </div>
                </div>
                <div class="restoration-case__image">
                  <div class="restoration-case__image-gradient"></div>
                  <div class="restoration-case__image-container">
                    <div class="restoration-case__image-before">
                      <img src="https://via.placeholder.com/300x400" alt="修复前的菩萨像壁画" />
                    </div>
                    <div class="restoration-case__image-after">
                      <img src="https://via.placeholder.com/300x400" alt="修复后的菩萨像壁画" />
                    </div>
                  </div>
                  <div class="restoration-case__image-divider"></div>
                </div>
              </div>
            </div>

            <div class="gallery__tab-content" v-if="activeTab === 'case3'">
              <div class="restoration-case">
                <div class="restoration-case__info">
                  <h3 class="restoration-case__title">第158窟佛像壁画</h3>
                  <p class="restoration-case__description">
                    该佛像壁画创作于盛唐时期，壁画中部出现了大面积脱落。通过我们的修复系统，成功填补了缺失部分，恢复了壁画的完整性。
                  </p>
                  <div class="restoration-case__legend">
                    <div class="legend-item">
                      <span class="legend-item__label">修复前</span>
                      <div class="legend-item__line legend-item__line--before"></div>
                    </div>
                    <div class="legend-item">
                      <span class="legend-item__label">修复后</span>
                      <div class="legend-item__line legend-item__line--after"></div>
                    </div>
                  </div>
                </div>
                <div class="restoration-case__image">
                  <div class="restoration-case__image-gradient"></div>
                  <div class="restoration-case__image-container">
                    <div class="restoration-case__image-before">
                      <img src="https://typora-hhhhry.oss-cn-beijing.aliyuncs.com/OIP-C%20(7).jpg" alt="修复前的佛像壁画" />
                    </div>
                    <div class="restoration-case__image-after">
                      <img src="https://via.placeholder.com/300x400" alt="修复后的佛像壁画" />
                    </div>
                  </div>
                  <div class="restoration-case__image-divider"></div>
                </div>
              </div>
            </div>

            <div class="gallery__actions">
              <button class="btn btn--primary">
                查看更多案例
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('case1')
</script>

<style lang='scss' scoped>
// 修复案例展示
.gallery {
  width: 100%;
  padding: $spacing-12 0;
  background-image: linear-gradient(to top, rgba(#E0F2FE, 0.7), rgba(#F5F5DC, 0.9));

  @media (min-width: $breakpoint-md) {
    padding: $spacing-24 0;
  }

  @media (min-width: $breakpoint-lg) {
    padding: $spacing-32 0;
  }

  &__content {
    max-width: 1000px;
    margin: 0 auto;
  }

  &__tabs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: $spacing-4;
    margin-bottom: $spacing-6;
  }

  &__tab {
    padding: $spacing-2 $spacing-4;
    font-size: $font-size-sm;
    font-weight: 500;
    background-color: $color-gray-100;
    color: $color-gray-500;
    border: none;
    border-radius: $border-radius;
    cursor: pointer;
    transition: $transition-base;

    &:hover {
      background-color: $color-gray-200;
    }

    &--active {
      background-color: $color-ochre-primary;
      color: $color-white;

      &:hover {
        background-color: $color-ochre-primary;
      }
    }
  }

  &__actions {
    display: flex;
    justify-content: center;
    margin-top: $spacing-12;
  }
}

.restoration-case {
  display: grid;
  /* grid-template-columns: 1fr; */
  /* gap: $spacing-6; */

  @media (min-width: $breakpoint-lg) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }

  &__info {
    width:70%;
    display: flex;
    flex-direction: column;
    gap: $spacing-4;
  }

  &__title {
    font-size: $font-size-2xl;
    font-weight: 700;
    color: $color-ochre-primary;
  }

  &__description {
    color: $color-gray-600;
  }

  &__legend {
    display: flex;
    align-items: center;
    gap: $spacing-4;
  }

  &__image {
    position: relative;
    aspect-ratio: 4/3;
    overflow: hidden;
    border-radius: $border-radius-lg;
    border: 1px solid $color-original-border;

    &-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to right,
        rgba($color-red-primary, 0.1),
        rgba($color-green-primary, 0.1)
      );
      z-index: 0;
    }

    &-container {
      position: absolute;
      inset: 0;
      display: flex;
    }

    &-before,
    &-after {
      position: relative;
      /* left:20px; */
      width: 100%;
      height: 100%;

      img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-divider {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 1px;
      background-color: rgba($color-white, 0.8);
      transform: translateX(-50%);
      z-index: 10;
    }
  }
}

.legend-item {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__label {
    font-size: $font-size-sm;
    font-weight: 500;
  }

  &__line {
    width: 4rem;
    height: 2px;
    margin-top: $spacing-1;

    &--before {
      background-color: $color-red-primary;
    }

    &--after {
      background-color: $color-green-primary;
    }
  }
}

</style>
