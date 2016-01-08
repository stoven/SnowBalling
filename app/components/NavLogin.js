import React from 'react';
import {Link} from 'react-router';
import NavLoginStore from '../stores/NavLoginStore';
import NavLoginActions from '../actions/NavLoginActions';

class NavLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = NavLoginStore.getState();
  }

  componentDidMount() {
    let user = localStorage.getItem('LoginUser') ? JSON.parse(localStorage.getItem('LoginUser')) : {};
    this.setState({'LoginUser':user});
  }

  componentDidUpdate(){
    
  }

  componentWillUnmount() {

  }


  handleLoginSubmit(event) {
    event.preventDefault();

    //NavLoginActions.login('root', 'root');
    //this.forceUpdate();
    var self = this;
    $.ajax({
        type: 'POST',
        url: '/api/loginUser',
        data: {
          'username': 'root',
          'password': 'root'
        }
      })
      .done((data) => {
        localStorage.setItem('LoginUser', JSON.stringify(data));
        self.setState({'LoginUser':data});
      })
      .fail((jqXhr) => {

      });
  }
  handleLogoutSubmit(event) {
    event.preventDefault();
    localStorage.removeItem('LoginUser');
    this.setState({'LoginUser':null});
  }

  render() {
    var loginButton;
    if (this.state.LoginUser!=null && Object.keys(this.state.LoginUser).length>0) {
      loginButton = <a id='btnLogout' onClick={this.handleLogoutSubmit.bind(this)} >Log Out</a>;
    } else {
      loginButton = <a id='btnLogin' onClick={this.handleLoginSubmit.bind(this)} >Login</a>;
    }
    return (

      <div id='loginControls'>
      	{loginButton}
      </div>
    );
  }
}

export default NavLogin;