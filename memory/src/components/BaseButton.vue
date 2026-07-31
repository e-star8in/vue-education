<script setup>

</script>

<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.button {
  font-size: 24px;
  line-height: 1.5;
  min-width: 335px;
  padding: 16px 10px;
  cursor: pointer;
  color: var(--color-primary-inverted);
  border: none;
  border-radius: 50rem;
  outline: none;
  background-color: var(--color-accent);

  &:hover {
    background-color: var(--color-accent-hover);
  }
}
</style>