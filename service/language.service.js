import axios from "axios";

class LanguageService {

    getReposLanguages(username, repoName) {
        return axios.get(`https://api.github.com/repos/${username}/${repoName}/languages`).then(response => {
            return response
        }).catch(error => {
            return error
        })
    }
}

export default LanguageService