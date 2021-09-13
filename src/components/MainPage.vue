<template>
  <div>
    <div>
      <input type="input"
             v-model="username"
             placeholder="Kullanıcı Adı"/>
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
      array: [],
      totalCodeSize: 0,
      key: '',
      index: 0
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
            size: value
          }
          langs.push(lang)
        }
        var langsGroup = langs.reduce(function (r, a) {
          r[a.name] = r[a.name] || [];
          r[a.name].push(a);
          return r;
        }, Object.create(null));
      }
      for (const [name, lang] of Object.entries(langsGroup)) {
        this.key = name
        for (const [index, code] of Object.entries(lang)) {
          this.index = index
          this.totalCodeSize = this.totalCodeSize + code.size
        }
      }
      Object.keys(langsGroup).map((key) => {
        let codeSum = 0
        for (let j = 0; j < langsGroup[key].length; j++) {
          codeSum += langsGroup[key][j].codeSize
        }
        this.array.push({'name': key, 'codeSize': codeSum})
      })
      for (let k = 0; k < this.array.length; k++) {
        this.array[k].codeSize = ((100 * this.array[k].codeSize) / this.totalCodeSize).toFixed(5)
      }
    },
  }
}
</script>

<style scoped>

</style>