<script setup>

import IconLocation from "../icons/IconLocation.vue";
import BaseInput from "./BaseInput.vue";
import Button from "./Button.vue";
import {inject, ref} from "vue";


const city = inject("city")
const inputValue = ref(city.value)

let isEdited = ref(false)

const select = () => {
  isEdited.value = false
  city.value = inputValue.value
}

const edit = () => {
  isEdited.value = true
}

</script>

<template>
  <div class="general__select select">
    <div v-if="isEdited" class="select__wrapper">
      <BaseInput
          id=""
          v-model="inputValue"
          v-focus
          name=""
          placeholder="Введите город"
          @keyup.enter="select()"
      ></BaseInput>
      <Button type="submit" @click="select()">Сохранить</Button>
    </div>
    <Button
        v-else
        class="button button--full-width"
        type="button"
        @click="edit()">
      <IconLocation/>
      Изменить город
    </Button>
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