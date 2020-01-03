import React from 'react';
import './App.css';
import Auth from './components/Auth/Auth'
import Dashboard from './components/Dashboard/Dashboard'
import Form from './components/Form/Form'
import Nav from './components/Nav/Nav'
import Post from './components/Post/Post'
import routes from './routes'
import {withRouter} from 'react-router-dom'

class App extends React.Component {
 
  render() {
    
    
    return (
    <div className="App">     
      {(this.props.location.pathname !== '/')?
       <Nav/>:
       console.log()
    }
      {routes}
    </div>
  )};
}

export default withRouter(App);
