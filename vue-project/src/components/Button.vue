<script setup>

</script>

<template>
  <button class="button">
    <div>
      <slot name="icon"/>
    </div>
    <slot/>
  </button>
</template>

<style lang="scss" scoped>
.button {
  font-family: var(--font), sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 53px;
  padding: 8px 14px;
  color: var(--color-primary);
  border: none;
  border-radius: 10px;
  background: var(--gradient);
  gap: 10px;

  &:hover, &:focus {
    background: var(--gradient-inverted);
  }

  &--full-width {
    width: 100%;
  }
}
</style>