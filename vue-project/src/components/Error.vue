<script setup>
const props = defineProps({error: String})
</script>

<template>
  <div v-if="props.error" class="error">{{ props.error }}</div>
</template>

<style lang="scss" scoped>
.error {
  position: absolute;
  top: 0;
  left: 50%;
  width: 80%;
  padding: 15px;
  transform: translateX(-50%);
  text-align: center;
  border-radius: 0 0 25px 25px;
  background: var(--color-bg-error);
}
</style>