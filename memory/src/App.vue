<script setup>
import BaseButton from "@/components/BaseButton.vue";
import Header from "@/components/Header.vue";
import Card from "@/components/Card.vue";
import {onMounted, ref} from "vue";

const API_ENDPOINT = "http://localhost:8080/api";

let data = ref([])
let error = ref(null)
const score = ref(0)

async function getWords() {
  const res = await fetch(`${API_ENDPOINT}/random-words`)
  if (res.status !== 200) {
    error.value = await res.json()
    data.value = null
    return
  }

  data.value = await res.json()
  error.value = null
  console.log(data.value)
}

onMounted(() => {
  getWords()
})
const actionFlip = () => {
}

</script>
<template>
  <main class="main">
    <Header :score="score"/>

    <section class="game">
      <div class="container">
        <div class="game__grid">
          <Card
              v-for="(card, i) in data"
              :key="card.word"
              :number="i+1"
              :state="card.state"
              :status="card.status"
              :translation="card.translation"
              :word="card.word"
              class="game__card"
              @flip-card="actionFlip"
          />
        </div>
      </div>
    </section>

    <section class="action">
      <div class="container">
        <div class="action__wrapper">
          <BaseButton>Начать игру</BaseButton>
        </div>
      </div>
    </section>

  </main>
</template>

<style lang="scss" scoped>
.main {
  min-height: 100vh;
  margin-top: var(--header-height);
  padding-bottom: 65px;
  background: var(--color-bg);
}

.game {
  margin-bottom: 100px;

  &__grid {
    display: grid;
    align-items: start;
    justify-content: flex-start;
    justify-items: stretch;
    grid-auto-rows: 1fr;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 66px 48px;
  }
}

.action {
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
