import React, { Component } from "react";
import Axios from "axios";
import { withRouter, Redirect } from "react-router-dom";
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
    
    this.setState({
      username: "",
      password: ""
    });
    if (res.status === 201) {
      this.props.updateUser( res.data.userData.username, res.data.userData.id,res.data.userData.profilePic);
      this.props.history.push("/dashboard");
    }
  }

  async login() {
    let res = await Axios.post("/auth/login", {
      username: this.state.username,
      password: this.state.password
    });
    alert(res.data.message);
    console.log(res.data)
    const { id, username, profilePic } = res.data.userData;
    this.props.updateUser(username, id, profilePic);
    this.setState({
      username: "",
      password: ""
    });
    if (res.status === 200) {
      this.props.history.push("/dashboard");
    }

  }

  render() {
    if (this.props.username) return <Redirect to='/dashboard'/>

    return (
      <div>
        <h1>Helo</h1>
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

const mapStateToProps = state => {
  const {username} = state
  return {username}
}

export default connect(mapStateToProps, {updateUser})(withRouter(Auth));
