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
import LanguageService from "../../service/language.service";

export default {
  name: "MainPage",
  data() {
    return {
      username: '',
      repos: [],
      array: []
    }
  },
  methods: {
    async getUsersRepos() {
      let langs = []
      let repos = await new RepoService().getUserRepos(this.username)

      for (let i = 0; i < repos.data.length; i++) {
        let reposLanguages = await new LanguageService().getReposLanguages(this.username, repos.data[i].name)
        for (const [key, value] of Object.entries(reposLanguages.data)) {
          let lang = {
            name: key,
            codeSize: value
          }
          langs.push(lang)
        }
        var langsGroup = langs.reduce(function (r, a) {
          r[a.name] = r[a.name] || [];
          r[a.name].push(a);
          return r;
        }, Object.create(null));
      }
      console.log("result", langsGroup)
    },
  }
}
</script>

<style scoped>

</style>