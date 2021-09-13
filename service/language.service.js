import axios from "axios";

class LanguageService {

    getReposLanguages(username, repoName) {
        return axios.get(`https://api.github.com/repos/${username}/${repoName}/languages`)
    }
}

export default LanguageService