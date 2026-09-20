<template>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts" name="App">
import { RouterView } from 'vue-router'
</script>

<style scoped lang="scss">
div{
  h1{
    color: red;
  }
}
</style>
