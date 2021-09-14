import React from "react";
import jwt_decode from "jwt-decode";
import authService from "../../services/auth.service";
import { Redirect } from "react-router";
import background from "../../images/image01.jpg";
import userService from "../../services/user.service";

export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      redirect: null,
      currentUser: "",
      userData: [],
    };
    this.getDecodeToken = this.getDecodeToken.bind(this);
  }

  componentDidMount() {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      this.setState({ redirect: "/" });
    } else {
      this.getDecodeToken(currentUser);
    }

    userService.getUser().then((res) => this.setState({ userData: res.data }));
  }

  getDecodeToken(token) {
    const decoded = jwt_decode(token);
    this.setState({ userInfo: decoded });
  }
  render() {
    const currentUserInfo = this.state.userData.filter(
      (currentUser) => currentUser.email === this.state.userInfo.email
    );

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return Object.keys(this.state.userInfo).length > 0 ? (
      <div
        className="container-fluid text-center "
        style={{ backgroundImage: `url(${background})`, height: "100vh" }}
      >
        <h1 className="bg-secondary">
          Welcome Back {this.state.userInfo.email}{" "}
        </h1>
        {currentUserInfo.map((user) => {
          return <div className="card" key={user.id}>
            <h5 className="card-header">User Info</h5>
            <div className="card-body">
              <h5 className="card-title">Email: {user.email}</h5>
              <p className="card-text">
                ID: {user.id}
              </p>
           
            </div>
          </div>;
        })}
      </div>
    ) : (
      <div>loading...</div>
    );
  }
}
