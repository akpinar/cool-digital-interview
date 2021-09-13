import axios from "axios";

class UserService {
    getUserInfo(username) {
        return axios.get(`https://api.github.com/users/${username}`).then(response => {
            return response
        }).catch(error => {
            return error
        })
    }

}

export default UserService