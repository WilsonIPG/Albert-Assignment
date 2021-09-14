import axios from "axios";

const API_URL = "http://localhost:8000";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.access_token) {
          localStorage.setItem(
            "userToken",
            JSON.stringify(response.data.access_token)
          );
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("userToken");
  }

  register(email, password) {
    return axios.post(API_URL + "/register", {
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("userToken"));
  }
}

export default new AuthService();
