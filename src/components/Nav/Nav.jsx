import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Nav extends Component {
  render() {
    return (
      <div>
        Nav.jsx
        <ul>
          <img alt="profile" src={this.props.profilePic} />
          <li>{this.props.username}</li>
          <Link to="/dashboard">
            <li>Home</li>
          </Link>
          <Link to="/new">
            <li>New Post</li>
          </Link>
          <Link to="/">
            <li>Logout</li>
          </Link>
          {console.log(this.props)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { username, profilePic } = state;
  return { username, profilePic };
};

export default connect(mapStateToProps, null)(Nav);
