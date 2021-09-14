import React from "react";
import registerImg from "../../images/image03.jpg";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import authService from "../../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger field" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger field" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger field_password" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      successful: false,
      message: "",
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.form.validateAll();
    
    if (this.checkBtn.context._errors.length === 0) {
      authService.register(this.state.email, this.state.password).then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <Form
          onSubmit={this.handleSubmit}
          ref={(c) => {
            this.form = c;
          }}
        >
          {!this.state.successful && (
            <div>
              <div className="header">Register</div>
              <div className="content">
                <div className="image">
                  <img src={registerImg} />
                </div>
                <div className="form">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input
                      type="text"
                      name="email"
                      placeholder="email"
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                      validations={[required, email]}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input
                      type="text"
                      name="password"
                      placeholder="password"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                      validations={[required, vpassword]}
                    />
                  </div>
                </div>
              </div>
              <div className="footer">
                <button className="btn">Register</button>
              </div>
            </div>
          )}

          {this.state.message && (
            <div className="form-group">
              <div
                className={
                  this.state.successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {this.state.message}
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
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
