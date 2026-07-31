<script setup>
import Score from "@/components/Score.vue";
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <a class="header__logo" href="/">Запомни слово</a>
        <Score :score="111" class="header__score"/>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--header-height);
  background: var(--color-bg);

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
  }

  &__logo {
    font-size: 16px;
    font-weight: 700;
    line-height: 1.5;
    text-decoration: none;
    text-transform: uppercase;
    color: var(--color-primary-muted);
  }
}
</style>