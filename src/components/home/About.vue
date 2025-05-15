<template>
  <!-- 关于我们 -->
  <section id="about" class="about">
      <div class="container">
        <div class="about__content">
          <div class="about__info">
            <h2 class="about__title">关于我们</h2>
            <p class="about__description">
              我们是一群热爱文化遗产保护的在校大学生，通过计算机视觉和人工智能技术，尝试为敦煌壁画的数字化保护贡献自己的一份力量。
            </p>
            <p class="about__description">
              敦煌壁画修复系统是我们多年研究成果的结晶，旨在为敦煌莫高窟等珍贵文化遗产提供数字化保护解决方案，让千年壁画焕发新生。
            </p>
            <div class="about__actions">
              <button class="btn btn--secondary">了解团队</button>
              <button class="btn btn--outline btn--light">联系我们</button>
            </div>
          </div>
          <div class="about__image">
            <img src="../../assets//images/about.jpg" alt="敦煌研究院工作场景" />
          </div>
        </div>
      </div>
    </section>
</template>

<script setup>

</script>

<style lang='scss' scoped>
// 关于我们
.about {
  width: 100%;
  padding: $spacing-12 0;
  background-color: #ac896d;
  color: $color-white;

  @media (min-width: $breakpoint-md) {
    padding: $spacing-24 0;
  }

  @media (min-width: $breakpoint-lg) {
    padding: $spacing-32 0;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-10;

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: $spacing-4;
  }

  &__title {
    font-size: $font-size-3xl;
    font-weight: 700;
    line-height: 1.2;

    @media (min-width: $breakpoint-md) {
      font-size: $font-size-4xl;
    }
  }

  &__description {
    color: $color-blue-light;
    font-size: $font-size-lg;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: $spacing-4;
    margin-top: $spacing-4;

    @media (min-width: $breakpoint-sm) {
      flex-direction: row;
    }
  }

  &__image {
    img {
      width: 100%;
      height: auto;
      border-radius: $border-radius-lg;
      object-fit: cover;
      aspect-ratio: 3/2;
    }
  }
}
</style>
