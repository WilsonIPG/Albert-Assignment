import React from "react";
import authService from "../../services/auth.service";
import AuthVerify from "../auth/authVerify.jsx";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    const user = authService.getCurrentUser();
    if (user) {
      this.setState({
        isLogin: true,
      });
    }
  }

  logOut() {
    authService.logout();
    this.setState({
      isLogin: false,
    });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light border-bottom box-shadow mb-3 bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand text-white" >
            Albert Auth
          </a>

          {this.state.isLogin ? (
            <ul className="navbar-nav flex-grow-1">
              <li className="nav-item">
                <a
                  href="/"
                  className="btn btn-outline-primary rounded-pill"
                  onClick={this.logOut}
                >
                  LogOut
                </a>
              </li>
            </ul>
          ) : (
            ""
          )}

          <AuthVerify logOut={this.logOut} />
        </div>
      </nav>
    );
  }
}
