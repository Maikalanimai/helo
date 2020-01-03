import React from 'react';
import './App.css';
import Nav from './components/Nav/Nav'
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
