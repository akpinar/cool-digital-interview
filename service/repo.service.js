import axios from "axios";

class RepoService {
    getUserRepos(username) {
        return axios.get(`https://api.github.com/users/${username}/repos`)
    }

}

export default RepoService