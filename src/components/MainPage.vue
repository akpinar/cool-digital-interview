<template>
  <div>
    <div class="top-container">
      <div class="input-container">
        <input class="search-input" type="input"
               v-model="username" placeholder="Kullanıcı Adı"/>
      </div>
      <div class="button-container">
        <button class="search-button"
                @click="getUsersRepos">Ara
        </button>
      </div>
    </div>
    <div v-if="langsRate.length" class="bottom-container">
      <div class="card">
        <div class="info-container">
          <div class="image-info-container">
            <div>
              <img class="profile-image" width="150" height="150" :src="userInfo.avatar_url">
            </div>
            <div class="user-info-container">
              <label>{{ userInfo.name }}</label>
              <small>@{{ userInfo.login }}</small>
            </div>
          </div>
          <div class="repo-info-container">
            <div>{{ userInfo.public_repos }} repo(s)</div>
            <div>{{ totalCodeSize }}</div>
          </div>
        </div>
        <hr>
        <div class="card-container">
          <div v-for="(lang,index) in langsRate" :key="index" class="card-deneme" style="display: table-cell;">
            <language-card :name="lang.name" :size="lang.size" :index="index"></language-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RepoService from "../../service/repo.service";
import LanguageService from "../../service/language.service";
import LanguageCard from "./LanguageCard";
import UserService from "../../service/user.service";

export default {
  name: "MainPage",
  components: {LanguageCard},
  data() {
    return {
      username: '',
      repos: [],
      langsRate: [],
      totalCodeSize: 0,
      key: '',
      index: 0,
      userInfo: {},
      langs: []
    }
  },
  methods: {
    async getUserInfo() {
      let info = await new UserService().getUserInfo(this.username)
      this.userInfo = info.data
    },
    async getReposLanguages() {
      for (let i = 0; i < this.repos.length; i++) {
        let reposLanguages = await new LanguageService().getReposLanguages(this.username, this.repos[i].name)
        for (const [key, value] of Object.entries(reposLanguages.data)) {
          let lang = {
            name: key,
            size: value
          }
          this.langs.push(lang)
        }
        await this.groupByLanguageName()

      }

    },
    async groupByLanguageName() {
      var langsGroup = this.langs.reduce(function (r, a) {
        r[a.name] = r[a.name] || [];
        r[a.name].push(a);
        return r;
      }, Object.create(null));
      await this.totalCodeSizeSum(langsGroup)
    },
    async totalCodeSizeSum(langsGroup) {
      for (const [name, lang] of Object.entries(langsGroup)) {
        this.key = name
        for (const [index, code] of Object.entries(lang)) {
          this.index = index
          this.totalCodeSize = this.totalCodeSize + code.size
        }
      }
      await this.totalCodeSizeSumByLangName(langsGroup)
    },
    async calculateRateByLanguage() {
      for (let k = 0; k < this.langsRate.length; k++) {
        this.langsRate[k].size = ((100 * this.langsRate[k].size) / this.totalCodeSize).toFixed(5)
      }
    },
    async sortingLargestToSmallest() {
      var temp = 0;
      for (var i = 0; i < this.langsRate.length; i++) {
        for (var j = i; j < this.langsRate.length; j++) {
          if (this.langsRate[j].size > this.langsRate[i].size) {
            temp = this.langsRate[j];
            this.langsRate[j] = this.langsRate[i];
            this.langsRate[i] = temp;
          }
        }
      }
    },
    async totalCodeSizeSumByLangName(langsGroup) {
      Object.keys(langsGroup).map((key) => {
        let codeSum = 0
        for (let j = 0; j < langsGroup[key].length; j++) {
          codeSum += langsGroup[key][j].size
        }
        this.langsRate.push({'name': key, 'size': codeSum})
      })
      await this.sortingLargestToSmallest()
    },
    async getUsersRepos() {
      this.langsRate = []
      let repos = await new RepoService().getUserRepos(this.username)
      this.repos = repos.data
      await this.getUserInfo()
      await this.getReposLanguages()
      this.username = ''
    },
  }
}
</script>

<style scoped>
.card-container {
  width: 100%;
}

.card {
  border: 0.5px black solid;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  padding: 15px
}


.search-input:focus {
  outline: none;
}

.search-input {
  width: 100%;
  padding: 15px;
  border: 0;
  border-radius: 10px
}

.search-button {
  width: 100%;
  padding: 15px;
  border: 0;
  margin-left: 50%;
  border-radius: 10px;
  cursor: pointer;
}

.input-container {
  width: 25%;
  margin-bottom: 50px
}

.button-container {
  width: 5%;
  margin-bottom: 50px;

}

.top-container {
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: #000
}

.bottom-container {
  display: flex;
  justify-content: center;
  margin-top: 5%
}

.image-info-container {
  display: flex;
}

.user-info-container {
  display: flex;
  flex-direction: column;
  justify-content: center
}

.repo-info-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;
}

.profile-image {
  border-radius: 15px;
}

.info-container {
  display: flex;
  justify-content: space-between
}

</style>