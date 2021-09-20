import React from "react";
import { withRouter } from "react-router-dom";
import * as auth from "../utils/Auth.js";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    auth
      .authorize(this.state.email, this.state.password)
      .then((data) => {
        if (data.token) {
          this.setState({ email: "", password: "" }, () => {
            localStorage.setItem("jwt", data.token);
            this.props.history.push("/");
            this.props.setLoggedIn(true);
          });
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <form className="login" onSubmit={this.handleSubmit}>
        <h1 className="login__header">Вход</h1>
        <input
          placeholder="email"
          id="email"
          name="email"
          type="email"
          className="input"
          value={this.state.email || ""}
          onChange={this.handleChange}
          required
        />
        <input
          placeholder="пароль"
          id="password"
          name="password"
          type="password"
          className="input"
          value={this.state.password || ""}
          onChange={this.handleChange}
          required
        />
        <button type="submit" className="submit">
          Войти
        </button>
      </form>
    );
  }
}

export default withRouter(Login);
