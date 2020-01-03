import React, { Component } from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser } from "../../ducks/reducer";

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange(e, key) {
    this.setState({
      [key]: e.target.value
    });
  }

  async register() {
    let res = await Axios.post("/auth/register", {
      username: this.state.username,
      password: this.state.password
    });
    alert(res.data.message);
    updateUser(res.data.userData);
    this.setState({
      username: "",
      password: ""
    });
    if (res.status === 201) {
      this.props.history.push("/dashboard");
    }
  }

  async login() {
    let res = await Axios.post("/auth/login", {
      username: this.state.username,
      password: this.state.password
    });
    alert(res.data.message);
    const { id, username, profilePic } = res.data.userData;
    console.log(username, id, profilePic);
    updateUser(username, id, profilePic);
    this.setState({
      username: "",
      password: ""
    });
    if (res.status === 200) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div>
        Auth.jsx Helo
        <div>
          Username:
          <input
            onChange={e => this.handleChange(e, "username")}
            value={this.state.username}
          ></input>
        </div>
        <div>
          Password:
          <input
            onChange={e => this.handleChange(e, "password")}
            value={this.state.password}
          ></input>
        </div>
        <button onClick={() => this.login()}>Login</button>
        <button onClick={() => this.register()}>Register</button>
      </div>
    );
  }
}

export default connect(null, updateUser)(withRouter(Auth));
