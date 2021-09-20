import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../utils/Auth.js";

 class Register extends React.Component {
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
    auth.register(this.state.email, this.state.password).then((res) => {
      res.ok ? this.props.setSucces(true) : this.props.setSucces(false);
      this.props.handlePopupStatus(true);
      this.props.history.push('/sign-in');
    })
    .catch((err) => console.log(err));
    
  };

  render() {
    return (
      <form className="register" onSubmit={this.handleSubmit}>
        <h1 className="register__header">Регистрация</h1>
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
        <button type="submit" className="submit" >
          Зарегистрироваться
        </button>
        <div className="register__signin">
          <p>
            Уже зарегистрированы?{" "}
            <Link to="sign-in" className="register__login">
              Войти
            </Link>
          </p>
        </div>
      </form>
    );
  }
}

export default withRouter(Register);
