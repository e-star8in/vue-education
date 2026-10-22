<script setup>

import Stats from "@/components/Stats.vue";
import CitySelect from "@/components/CitySelect.vue";
import DayCard from "@/components/DayCard.vue";
import Error from "@/components/Error.vue";
import {computed} from "vue";

const {data, error, activeDay} = defineProps({
  data: Object, error: Object, activeDay: Number
})

const emit = defineEmits(["select-index", "select-city"])

const errorMap = new Map([[1006, "Указанный город не найден"]])

const errorDisplay = computed(() => {
  return error && errorMap.get(error.error.code)
})

const statData = computed(() => {
  const convertWind = (wind) => {
    return Math.floor(wind / 3.6)
  }
  return [
    {
      label: "Влажность",
      stat: data.current.humidity + " %",
    }, {
      label: "Облачность",
      stat: data.current.cloud + " %",
    }, {
      label: "Ветер",
      stat: convertWind(data.current.wind_kph) + " м/c",
    }
  ]
})


</script>

<template>
  <div class="general">
    <Error v-if="error" :error="errorDisplay"/>
    <template v-if="!!data">
      <div class="general__stats stats">
        <ul class="stats__list">
          <Stats v-for="item in statData" :key="item.label" v-bind="item"/>
        </ul>
      </div>
      <div class="general__days days">
        <ul class="days__list">
          <DayCard
              v-for="(item,index) in data.forecast.forecastday"
              :key="item.date"
              :date="new Date(item.date)"
              :is-active="activeDay === index"
              :temperature="item.day.avgtemp_c"
              :weather-code="item.day.condition.code"
              @click="emit('select-index', index)"
          />
        </ul>
      </div>
    </template>
    <CitySelect/>
  </div>
</template>

<style lang="scss" scoped>
.general {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 460px;
  margin: 22px 0;
  padding: 60px 50px;
  border-radius: 0 25px 25px 0;
  background: var(--color-bg-main);

  &__days {
    margin-top: 80px;
  }

  &__select {
    margin-top: 70px;
  }
}

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

  &__value {
    font-size: 28px;
    font-weight: 500;
    line-height: 1;
    color: var(--color-primary);
  }
}

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
    transition: border-color 0.3s ease-in-out;
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
    color: inherit;

  }

  &__temperature {
    font-weight: 700;
    color: inherit;
  }
}
</style>