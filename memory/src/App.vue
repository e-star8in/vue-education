<script setup>
import BaseButton from "@/components/BaseButton.vue";
import Header from "@/components/Header.vue";
import Card from "@/components/Card.vue";
import {onMounted, ref} from "vue";

const API_ENDPOINT = "http://localhost:8080/api";

let data = ref([])
let error = ref(null)
const score = ref(0)

function getRandomUnique(count = 3, min = 0, max = 9) {
  const range = max - min + 1
  if (count > range) throw new Error('count больше диапазона')
  const set = new Set()
  while (set.size < count) {
    set.add(Math.floor(Math.random() * range) + min)
  }
  return [...set]
}

function rotateTranslations(cards, indexes) {
  const donors = indexes.map(i => cards[i].translation)
  indexes.forEach((idx, k) => {
    const next = (k + 1) % indexes.length
    const card = cards[idx]
    if (!card.originalTranslation) card.originalTranslation = card.translation
    card.translation = donors[next]
    card.isFake = true
  })
  return cards
}

async function getWords() {
  try {
    const res = await fetch(`${API_ENDPOINT}/random-words`)
    if (res.status !== 200) {
      error.value = await res.json()
      data.value = []
      return
    }

    data.value = await res.json()
    error.value = null

    data.value = data.value.map(item => ({
      ...item, state: 'closed', status: 'pending', isFake: false
    }))

    data.value = rotateTranslations(data.value, getRandomUnique())
  } catch (e) {
    error.value = e
    data.value = []
  }
}

const actionFlip = (item) => {
  data.value[item].state = data.value[item].state === 'closed' ? 'opened' : 'closed'
}

const actionChangeStatus = (i, status) => {

  const isFake = data.value[i].isFake
  if (status === 'success' && !isFake) {
    score.value += 10
    data.value[i].status = 'success'
  } else {
    score.value -= 4
    data.value[i].status = 'fail'
  }
  console.log(status)
}

const startGame = () => {
  getWords()
  score.value = 0
}

</script>
<template>
  <main class="main">
    <Header :score="score"/>

    <template v-if="data">
      <section class="game">
        <div class="container">
          <div v-if="error" class="game__error">
            <h2>Произошла ошибка</h2>
            <BaseButton @click="startGame">Перезапустить</BaseButton>
          </div>
          <div v-else class="game__grid">
            <Card
                v-for="(card, i) in data"
                :key="card.word"
                :number="i+1"
                :state="card.state"
                :status="card.status"
                :translation="card.translation"
                :word="card.word"
                class="game__card"
                @flip-card="actionFlip(i)"
                @change-status="actionChangeStatus(i, $event)"
            />
          </div>
        </div>
      </section>
    </template>

    <section class="action">
      <div class="container">
        <div class="action__wrapper">
          <BaseButton @click="startGame">Начать игру</BaseButton>
        </div>
      </div>
    </section>

  </main>
</template>

<style lang="scss" scoped>
.main {
  min-height: 100vh;
  padding-top: var(--header-height);
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

  &__error {
    font-size: 16px;
    font-weight: 700;
    line-height: 1.5;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
    text-transform: uppercase;
    color: var(--color-primary-muted);
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
