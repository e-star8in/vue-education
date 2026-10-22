<script setup>
import IconSun from "@/icons/IconSun.vue";
import IconLocation from "@/icons/IconLocation.vue";
import {computed, inject} from "vue";
import {cityProvide} from "@/constants.js";
import IconRain from "@/icons/IconRain.vue";
import IconCloud from "@/icons/IconCloud.vue";

const {dayData} = defineProps({
  dayData: Object,
})
const city = inject(cityProvide)


// console.log(dayData)

const day = computed(
    () => new Date(dayData.date).toLocaleDateString("ru-RU", {weekday: "long"}))
const date = computed(
    () => new Date(dayData.date).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }))

const weatherCode = computed(() => dayData.day.condition.code)


</script>

<template>
  <div class="detail">
    <div class="detail__place place">
      <span class="place__day-week">
        {{ day }}
      </span>
      <time class="place__day">
        {{ date }}
      </time>
      <div class="place__location">
        <IconLocation/>
        <span class="location">{{ city }}</span>
      </div>
    </div>
    <div class="detail__weather weather">
      <IconSun
          v-if="weatherCode <= 1003"
          class="weather__icon"
          size="95"/>
      <IconCloud
          v-if="weatherCode >= 1006 && weatherCode < 1063"
          class="weather__icon"
          size="95"/>
      <IconRain
          v-if="weatherCode >= 1063"
          class="weather__icon"
          size="95"/>
      <p class="weather__temperature">{{ Math.round(dayData.day.avgtemp_c) }} <span>°C</span></p>
      <span class="weather__state">{{ dayData.day.condition.text }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail {
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 48px 32px 64px;
  border-radius: 25px;
  background-image: url("../detail-bg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  grid-template-columns: 1fr;
  gap: 20px;
}

.place {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__day-week {
    font-size: 38px;
    font-weight: 700;
    text-transform: capitalize;
  }

  &__day {
    font-size: 22px;
    font-weight: 500;
  }

  &__location {
    font-weight: 600;
    display: flex;
    align-items: center;
    text-transform: capitalize;
    gap: 8px;
  }
}

.weather {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__icon {
    width: 95px;
    height: 95px;
  }

  &__temperature {
    font-size: 48px;
    font-weight: 700;
    display: flex;
    align-items: center;
    margin: 0;
    gap: 8px;
  }

  &__state {
    font-size: 30px;
    font-weight: 700;
  }
}
</style>