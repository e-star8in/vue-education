<script setup>
import {onMounted, provide, ref, watch} from "vue";
import IconSun from "@/icons/IconSun.vue";
import IconLocation from "@/icons/IconLocation.vue";
import PaneRight from "@/components/PaneRight.vue";

const API_ENDPOINT = "https://api.weatherapi.com/v1";

let city = ref("Moscow")
let data = ref(null)
let error = ref(null)
let activeDay = ref(0)

provide("city", city)

watch(city, (city) => getCity(city.value))

onMounted(() => {
  getCity(city.value)
})

async function getCity(city) {
  const params = new URLSearchParams({
    q: city,
    lang: "ru",
    key: "4c1d904dc74141a6b21173310262010",
    days: 4
  })
  const res = await fetch(`${API_ENDPOINT}/forecast.json?${params.toString()}`)
  if (res.status !== 200) {
    error.value = await res.json()
    data.value = null
    return
  }

  data.value = await res.json()
  error.value = null
  console.log(data.value)
}

</script>

<template>
  <main class="main">
    <div class="detail">
      <div class="detail__place place">
        <span class="place__day-week">Вторник</span>
        <time class="place__day">20 июня 2025</time>
        <div class="place__location">
          <IconLocation/>
          <span class="location">Москва</span>
        </div>
      </div>
      <div class="detail__weather weather">
        <IconSun class="weather__icon" size="95"/>
        <p class="weather__temperature">29 <span>°C</span></p>
        <span class="weather__state">Солнечно </span>
      </div>
    </div>
    <PaneRight
        :active-day="activeDay"
        :data
        :error
        @select-index="(index) => activeDay = index"
    />
  </main>
</template>

<style lang="scss" scoped>
.main {
  font-size: 20px;
  display: grid;
  overflow: visible;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  min-width: min(944px, 95vw);
  min-height: 500px;
  grid-template-columns: 666fr 520fr;

}

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
  }

  &__day {
    font-size: 22px;
    font-weight: 500;
  }

  &__location {
    font-weight: 600;
    display: flex;
    align-items: center;
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