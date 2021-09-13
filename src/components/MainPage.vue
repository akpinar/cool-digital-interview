<template>
  <div>
    <div>
      <input type="input"
             v-model="username" placeholder="Kullanıcı Adı"/>
    </div>
    <div>
      <button class="search-button"
              @click="getUsersRepos">Ara
      </button>
    </div>
  </div>
</template>

<script>
import RepoService from "../../service/repo.service";

export default {
  name: "MainPage",
  data() {
    return {
      username: '',
      repos: [],
    }
  },
  methods: {
    async getUsersRepos() {
      let response = await new RepoService().getUserRepos(this.username)
      this.repos = response.data
    },
  }
}
</script>

<style scoped>

</style>