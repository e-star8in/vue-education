<script setup>
import {computed} from "vue";

import IconSuccess from "@/icons/IconSuccess.vue";
import IconError from "@/icons/IconError.vue";
import ErrorButton from "@/components/ErrorButton.vue";
import SuccessButton from "@/components/SuccessButton.vue";

const props = defineProps({
  number: {type: Number, default: 1},
  word: {type: String, default: ''},
  translation: {type: String, default: ''},
  state: {
    type: String,
    default: 'closed',
    validator: v => ['closed', 'opened'].includes(v),
  },
  status: {
    type: String,
    default: 'pending',
    validator: v => ['success', 'fail', 'pending'].includes(v),
  },
})
const emit = defineEmits(['flip-card', 'change-status'])
const formattedNumber = computed(() => String(props.number).padStart(2, '0'))

function flipCard() {
  emit('flip-card', props.state)
}

function changeStatus() {
  emit('change-status', props.status)
}

</script>

<template>
  <div class="card">
    <div class="card__wrapper">
      <div class="card__number">
        <span>{{ formattedNumber }}</span>
      </div>
      <div class="card__result">
        <IconSuccess v-if="status === 'success'"/>
        <IconError v-else-if="status === 'fail'"/>
        <template v-else></template>
      </div>
      <div class="card__label">{{ props.word }}</div>
      <div class="card__action">
        <div v-if="state === 'opened'" class="card__status" @click="changeStatus">
          <button v-if="status !== 'pending'" class="card__flip card__flip--end">Завершено</button>
          <template v-else>
            <ErrorButton/>
            <SuccessButton/>
          </template>
        </div>
        <button v-else class="card__flip" @click="flipCard">
          Перевернуть
        </button>

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: min(90vh, 375px);
  padding: 20px;
  border-radius: 16px;
  background-color: var(--color-primary-inverted);
  box-shadow: 0 0 16px 0 #0000001A;

  &:hover {
    box-shadow: 10px 10px 10px 0 #0000000D;
  }

  &__wrapper {
    position: absolute;
    z-index: 0;
    content: '';
    border: 1px solid var(--color-accent-muted);
    border-radius: 16px;
    inset: 28px 19px;
  }

  &__number {
    font-size: 14px;
    line-height: 1;
    position: absolute;
    top: 0;
    left: 16px;
    padding: 4px;
    transform: translateY(-50%);
    color: var(--color-primary);
    background-color: var(--color-primary-inverted);
  }

  &__result {
    position: absolute;
    top: 0;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    transform: translate(-50%, -50%);
    background-color: var(--color-primary-inverted);

    svg {
      width: 36px;
      height: 36px;
      padding: 2px;
    }
  }

  &__label {
    font-size: 18px;
    line-height: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-transform: lowercase;
    color: var(--color-primary);
  }

  &__action {
    position: absolute;
    bottom: 0;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 6px;
    cursor: pointer;
    transform: translate(-50%, 50%);
    color: var(--color-primary);
    background-color: var(--color-primary-inverted);
  }

  &__flip {
    font-size: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-transform: uppercase;
    border: none;
    outline: none;
    background-color: var(--color-primary-inverted);
    gap: 8px;

    &--end {
      cursor: default;
    }
  }

  &__status {
    display: flex;
    align-items: center;
    cursor: default;
    gap: 32px;
  }
}
</style>