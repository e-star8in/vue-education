<script setup>
import BaseButton from "@/components/BaseButton.vue";
import Header from "@/components/Header.vue";
import Card from "@/components/Card.vue";
import {ref} from "vue";

const flip = ref(true)

const actionFlip = () => {
}

</script>
<template>
  <main class="main">
    <Header/>

    <section class="game">
      <div class="container">
        <div class="game__grid">

          <Card :flip="flip" class="game__card" @flip-card="actionFlip"/>
          <Card :flip="flip" class="game__card" @flip-card="actionFlip"/>
          <Card :flip="flip" class="game__card" @flip-card="actionFlip"/>
          <Card :flip="flip" class="game__card" @flip-card="actionFlip"/>
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
