<script setup>
import {onMounted, provide, ref, watch} from "vue";
import PaneRight from "@/components/PaneRight.vue";
import {cityProvide, API_ENDPOINT} from "@/constants.js";
import PaneLeft from "@/components/PaneLeft.vue";


let city = ref("Moscow")
let data = ref(null)
let error = ref(null)
let activeDay = ref(0)

provide(cityProvide, city)

watch(city, () => getCity(city.value))

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
}

</script>

<template>
  <main class="main">
    <PaneLeft
        v-if="data"
        :dayData="data.forecast.forecastday[activeDay]"
    />

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
</style>