<template>
  <div class="container">
    <div class="index-container">
      {{ index + 1 }}
    </div>
    <div class="name-container">
      {{ name }}
    </div>
    <div class="size-container">
      % {{ size }}
    </div>

  </div>
</template>

<script>
export default {
  name: "LanguageCard",
  props: {
    name: String,
    size: String,
    index: Number
  }
}
</script>

<style lang="css">
.container {
}

.index-container {
  font-weight: bold;
  font-size: large;
}

.name-container {
  text-transform: uppercase;
}


</style>