<script setup>
import IconHeart from "@/icons/IconHeart.vue";

const props = defineProps({score: {type: Number, default: 100}})
</script>

<template>
  <div class="score">
    <span>{{ props.score }}</span>
    <IconHeart/>
  </div>
</template>

<style lang="scss" scoped>
.score {
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  color: var(--color-accent);
  border-radius: 50rem;
  background-color: var(--color-accent-muted);
  box-shadow: 0 0 4px 0 #00000026;
}
</style>