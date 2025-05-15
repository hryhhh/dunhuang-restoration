<template>
<!-- 页脚 -->
<footer class="footer">
      <div class="container">
        <div class="footer__content">
          <p class="footer__copyright">© 2025 敦煌壁画修复系统. 版权所有.</p>
          <nav class="footer__nav">
            <a href="/terms" class="footer__link">使用条款</a>
            <a href="/privacy" class="footer__link">隐私政策</a>
            <a href="/contact" class="footer__link">联系我们</a>
          </nav>
        </div>
      </div>
    </footer>
</template>

<script setup>

</script>

<style lang='scss' scoped>


// 页脚
.footer {
  width: 50%;
  margin: auto;
  padding: $spacing-6 0;
  border-top: 1px solid $color-gray-200;

  @media (min-width: $breakpoint-md) {
    padding: $spacing-10 0;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-4;

    @media (min-width: $breakpoint-md) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__copyright {
    font-size: $font-size-sm;
    color: $color-gray-500;
    text-align: center;

    @media (min-width: $breakpoint-md) {
      text-align: left;
    }
  }

  &__nav {
    display: flex;
    gap: $spacing-4;

    @media (min-width: $breakpoint-sm) {
      gap: $spacing-6;
    }
  }

  &__link {
    font-size: $font-size-sm;
    color: $color-gray-700;
    text-decoration: none;
    transition: $transition-base;

    &:hover {
      text-decoration: underline;
      text-underline-offset: 4px;
    }
  }
}
</style>
