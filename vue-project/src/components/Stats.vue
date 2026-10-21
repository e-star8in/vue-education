<script setup>
const {label = "Не задан", stat = "Не задан"} = defineProps(
    {
      label: String,
      stat: String,
    }
)
</script>

<template>
  <li class="stats__item">
    <span class="stats__label">{{ label }}</span>
    <span class="stats__stat">{{ stat }}</span>
  </li>
</template>

<style lang="scss" scoped>
.stats {
  &__list {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    list-style: none;
    gap: 16px;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  &__label {
    font-size: 28px;
    font-weight: 700;
    line-height: 1;
    text-transform: uppercase;
    color: var(--color-primary);
  }

  &__stat {
    font-size: 28px;
    font-weight: 500;
    line-height: 1;
    color: var(--color-primary);
  }
}
</style>