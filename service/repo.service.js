import axios from "axios";

class RepoService {
    getUserRepos(username) {
        return axios.get(`https://api.github.com/users/${username}/repos`).then(response => {
            return response
        }).catch(error => {
            return error
        })
    }

}

export default RepoService