import React from "react";
import loginImg from "../../images/image02.jpg";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Redirect } from "react-router-dom";
import authService from "../../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger field" >
        This field is required!
      </div>
    );
  }
};

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLogin: false,
      loading: false,
      message: "",
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      authService.login(this.state.email, this.state.password).then(
        (res) => {
          this.setState({
            isLogin: true,
          });
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            isLogin: false,
            message: resMessage,
            loading: false,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  handleEmailChange(event) { 
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    if (this.state.isLogin) {
      return <Redirect to="/user" />;
    }

    return (
      <div className="base-container" ref={this.props.containerRef}>
        <Form
          onSubmit={this.handleSubmit}
          ref={(c) => {
            this.form = c;
          }}
        >
          <div className="header">Login</div>
          <div className="content">
            <div className="image">
              <img src={loginImg} />
            </div>
            <div className="form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  validations={[required]}
                  onChange={this.handleEmailChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  validations={[required]}
                  onChange={this.handlePasswordChange}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <button
              className="btn btn-primary footer"
              disabled={this.state.loading}
            >
              {this.state.loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {this.state.message && (
            <div className="form-group">
              <div className="alert alert-danger">{this.state.message}</div>
            </div>
          )}
          <CheckButton
            style={{ display: "none" }}
            ref={(c) => {
              this.checkBtn = c;
            }}
          />
        </Form>
      </div>
    );
  }
}
