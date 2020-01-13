import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser} from '../../ducks/reducer'
import Axios from "axios";
import './nav.css'

class Nav extends Component {
  
  logout = () => {
    this.props.updateUser('', '', '' )
    Axios.post('/auth/logout').then(res =>{
      alert(res.data.message)}
    )}



  render() {
    return (
      <div className='nav'>
        <ul>
          <img className='nav-img' alt="profile" src={this.props.profilePic} />
          <li><h2>{this.props.username}</h2></li>
          <Link to="/dashboard">
            <li><img className='nav-img' alt='home' src={'https://images.vexels.com/media/users/3/135263/isolated/preview/b26ee4099ae2550f79e65e41843a9198-web-home-flat-sign-by-vexels.png'}/></li>
          </Link>
          <Link to="/new">
            <li><img className='nav-img' alt='new post' src={'https://www.freeiconspng.com/uploads/add-1-icon--flatastic-1-iconset--custom-icon-design-0.png'}/></li>
          </Link>
          <Link to="/">
            <li onClick={this.logout}><img className='nav-img' alt='logout' src={'https://i.ya-webdesign.com/images/log-out-icon-png-18.png'}/></li>
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
