import axios from "axios";

const API_URL = "http://localhost:8000";

class UserService {
  getUser() {
    return axios.get(API_URL + "/getUser");
  }
}

export default new UserService();
