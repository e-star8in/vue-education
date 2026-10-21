<script setup>
const data = defineModel({type: String, required: true, default: 'London'});
</script>

<template>
  <input v-model="data"
class="input"
placeholder="placeholder"
type="text"/>
</template>

<style lang="scss" scoped>
.input {
  font-size: 18px;
  line-height: 1;
  width: 100%;
  height: 53px;
  padding: 0 14px;
  color: var(--color-primary);
  border: none;
  border-radius: 10px;
  background: var(--color-bg-card);

  &:hover, &:focus {
    border: none;
    outline: none;
  }

  &::placeholder {
    color: var(--color-placeholder);
  }
}
</style>