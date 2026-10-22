<script setup>
import IconCloud from "@/icons/IconCloud.vue";
import IconSun from "@/icons/IconSun.vue";
import IconRain from "@/icons/IconRain.vue";
import {computed} from "vue";

const {weatherCode, temperature, date, isActive} = defineProps({
  weatherCode: Number,
  temperature: Number,
  date: Date,
  isActive: Boolean,
})

const iconColor = computed(() => {
  return isActive ? 'var(--color-primary-inverted)' : 'var(--color-primary)'
})
</script>

<template>
  <li :class="{active: isActive}" class="days__item day">
    <IconSun v-if="weatherCode <= 1003"
             :color="iconColor"
             class="days__icon"/>
    <IconCloud v-if="weatherCode >= 1006 && weatherCode < 1063"
               :color="iconColor"
               class="days__icon"/>
    <IconRain v-if="weatherCode >= 1063"
              :color="iconColor"
              class="days__icon"/>
    <span class="days__day-week">
      {{ date.toLocaleDateString("ru-RU", {weekday: "short"}) }}
    </span>
    <span class="days__temperature">{{ Math.round(temperature) }} °C</span>
  </li>
</template>

<style lang="scss" scoped>
.days {
  color: var(--color-primary);

  &__list {
    display: flex;
    align-items: stretch;
    margin: 0;
    padding: 0;
    list-style: none;
    gap: 2px;
  }

  &__item {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding: 12px 6px;
    color: var(--color-primary);
    border: 2px solid transparent;
    border-radius: 10px;
    background: var(--color-bg-card);

    &:hover {
      background: var(--color-bg-card-hover);
    }

    &.active {
      color: var(--color-primary-inverted);
      border-color: var(--color-primary);
      background: var(--color-primary);
    }
  }

  &__icon {
    width: 54px;
    height: 54px;
    margin-bottom: 16px;
    fill: var(--color-primary);
  }

  &__day-week {
    text-transform: capitalize;
    color: inherit;
  }

  &__temperature {
    font-weight: 700;
    color: inherit;
  }
}
</style>