<template>
  <div class="container">
    <div class="lang-container index-container">
      <div>
        {{ index + 1 }}
      </div>
    </div>
    <div class="lang-container name-container">
      <div>
        {{ name }}
      </div>
    </div>
    <div class="lang-container size-container">
      <div>
        %{{ size }}
      </div>

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
  width: 25%;
}

.index-container {
  font-size: large;
}

.name-container {
  font-weight: bold;
  text-transform: uppercase;
}

.lang-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
}

.size-container {
  margin-bottom: 10px;
}


</style>