import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Nav extends Component {

    render(){
        return(
            <div>Nav.jsx
                <ul>
                    <Link to='/dashboard'><li>Home</li></Link>
                    <Link to = '/new'><li>New Post</li></Link>
                    <Link to = '/'><li>Logout</li></Link>
                </ul>
            </div>
        )
    }
}

export default Nav