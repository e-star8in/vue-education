<script setup>

import IconLocation from "../icons/IconLocation.vue";
import BaseInput from "./BaseInput.vue";
import Button from "./Button.vue";

const emit = defineEmits({
  "select-city": (payload) => {
    return !!payload && typeof payload === "number"
  }
})

const select = () => {
  emit('select-city', 'London')
}

</script>

<template>
  <div class="general__select select">
    <Button class="button button--full-width" type="button" @click="select()">
      <IconLocation/>
      Изменить город
    </Button>

    <div class="select__wrapper">
      <BaseInput id="" name="" placeholder="Введите город"></BaseInput>
      <Button type="submit">Сохранить</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.select {

  &__wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}
</style>