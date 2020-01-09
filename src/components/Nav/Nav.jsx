import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser} from '../../ducks/reducer'

class Nav extends Component {
  
  logout = () => this.props.updateUser('', '', '' )



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
            <li onClick={this.logout}>Logout</li>
          </Link>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { username, profilePic } = state;
  return { username, profilePic };
};

export default connect(mapStateToProps, {updateUser})(Nav);
