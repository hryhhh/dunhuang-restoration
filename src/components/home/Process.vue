<template>
  <!-- 修复流程 -->
  <section id="process" class="process">
        <div class="container">
          <div class="section-header">
            <div class="badge badge--green">修复流程</div>
            <h2 class="section-title">壁画修复工作流程</h2>
            <p class="section-description">
              从壁画扫描到成果展示，全流程数字化管理
            </p>
          </div>

          <div class="process__timeline">
            <div class="process__timeline-line"></div>

            <div class="process-step">
              <div class="process-step__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                  <line x1="16" x2="22" y1="5" y2="5"></line>
                  <line x1="19" x2="19" y1="2" y2="8"></line>
                  <circle cx="9" cy="9" r="2"></circle>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                </svg>
              </div>
              <div class="process-step__content">
                <h3 class="process-step__title">壁画数字化采集</h3>
                <p class="process-step__description">
                  使用高精度扫描设备对壁画进行全方位采集，确保捕捉到壁画的每一处细节，为后续修复工作奠定基础。
                </p>
              </div>
            </div>

            <div class="process-step">
              <div class="process-step__icon process-step__icon--blue">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
              <div class="process-step__content">
                <h3 class="process-step__title">损伤分析与评估</h3>
                <p class="process-step__description">
                  AI系统自动分析壁画损伤情况，识别褪色、裂缝、脱落等不同类型的损伤，并生成详细的损伤报告。
                </p>
              </div>
            </div>

            <div class="process-step">
              <div class="process-step__icon process-step__icon--green">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  <path d="M19 17.5c-1.1-0.1-2.2-0.5-3-1.2-0.8-0.6-1.9-1-3-1.2"></path>
                  <path d="m14.5 7.5-2.5 2.5"></path>
                  <path d="m12 10 2.5 2.5"></path>
                </svg>
              </div>
              <div class="process-step__content">
                <h3 class="process-step__title">AI智能修复</h3>
                <p class="process-step__description">
                  基于深度学习的修复算法自动进行壁画修复，同时支持专家介入进行人工调整，确保修复效果的艺术性与准确性。
                </p>
              </div>
            </div>

            <div class="process-step">
              <div class="process-step__icon process-step__icon--red">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m2 2 20 20"></path>
                  <path d="M6.28 6.28C3.4 9.16 3.4 13.78 6.28 16.66C9.16 19.54 13.78 19.54 16.66 16.66"></path>
                  <path d="M9.14 9.14c-.87.87-.87 2.28 0 3.15.87.86 2.28.86 3.15 0"></path>
                </svg>
              </div>
              <div class="process-step__content">
                <h3 class="process-step__title">成果展示与应用</h3>
                <p class="process-step__description">
                  修复成果可用于文物展示、学术研究、数字博物馆等多种场景，为北齐文化的传承与推广提供新的可能。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
</template>

<script setup>

</script>

<style lang='scss' scoped>

// 修复流程
.process {
  width: 100%;
  padding: $spacing-12 0;
  background-image: linear-gradient(to top, rgba(#808080, 0.5), rgba(#F0FFF0, 0.9));

  @media (min-width: $breakpoint-md) {
    padding: $spacing-24 0;
  }

  @media (min-width: $breakpoint-lg) {
    padding: $spacing-32 0;
  }

  &__timeline {
    position: relative;
    max-width: 800px;
    margin: $spacing-16 auto 0;

    &-line {
      position: absolute;
      left: 16px;
      top: 0;
      bottom: 0;
      width: 1px;
      background-color: $color-history-timeline;
      display: none;

      @media (min-width: $breakpoint-md) {
        display: block;
      }
    }
  }
}

.process-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: $spacing-16;
  position: relative;

  @media (min-width: $breakpoint-md) {
    flex-direction: row;
    gap: $spacing-8;
    align-items: flex-start;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8rem;
    height: 8rem;
    background-color: $color-ochre-light;
    border-radius: $border-radius-full;
    color: $color-ochre-primary;
    flex-shrink: 0;
    z-index: 10;
    margin-bottom: $spacing-4;

    @media (min-width: $breakpoint-md) {
      margin-bottom: 0;
    }

    &--blue {
      background-color: $color-blue-light;
      color: $color-blue-primary;
    }

    &--green {
      background-color: $color-green-light;
      color: $color-green-primary;
    }

    &--red {
      background-color: $color-red-light;
      color: $color-red-primary;
    }
  }

  &__content {
    @media (min-width: $breakpoint-md) {
      padding-top: $spacing-10;
    }
  }

  &__title {
    font-size: $font-size-xl;
    font-weight: 700;
    margin-bottom: $spacing-2;
    text-align: center;
    color: $color-blue-primary;

    @media (min-width: $breakpoint-md) {
      text-align: left;
    }
  }

  &__description {
    color: $color-gray-600;
    text-align: center;

    @media (min-width: $breakpoint-md) {
      text-align: left;
    }
  }
}
</style>
