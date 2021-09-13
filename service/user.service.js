import axios from "axios";

class UserService {
    getUserInfo(username) {
        return axios.get(`https://api.github.com/users/${username}`)
    }

}

export default UserService