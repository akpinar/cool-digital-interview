<template>
  <div class="container">
    <div>{{ index }}</div>
    <div>{{ name }}</div>
    <div>% {{ codeSize }}</div>
  </div>
</template>

<script>
export default {
  name: "LanguageCard",
  props: {
    name: String,
    codeSize: Number,
    index: Number
  }
}
</script>

<style lang="css">
.container {
  width: 33.3%;
}


</style>