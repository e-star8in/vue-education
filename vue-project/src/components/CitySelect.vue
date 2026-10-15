<script setup>

import IconLocation from "../icons/IconLocation.vue";
import BaseInput from "./BaseInput.vue";
import Button from "./Button.vue";
import {ref} from "vue";

const emit = defineEmits({
  "select-city": (payload) => {
    return !!payload && typeof payload === "number"
  }
})

let isEdited = ref(false)

const select = () => {
  isEdited.value = false
  emit('select-city', 'London')
}

const edit = () => {
  isEdited.value = true
}

</script>

<template>
  <div class="general__select select">
    {{ isEdited }}
    <Button class="button button--full-width" type="button" @click="edit()">
      <IconLocation/>
      Изменить город
    </Button>

    <div class="select__wrapper">
      <BaseInput id="" name="" placeholder="Введите город"></BaseInput>
      <Button type="submit" @click="select()">Сохранить</Button>
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