import React from 'react';
import {Link} from 'react-router';
import NavLoginStore from '../stores/NavLoginStore';
import NavLoginActions from '../actions/NavLoginActions';
import Login from './Login'
import LoginStore from '../stores/LoginStore'

class NavLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = NavLoginStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    let user = localStorage.getItem('LoginUser') ? JSON.parse(localStorage.getItem('LoginUser')) : {};
    this.setState({'LoginUser':user});
    NavLoginStore.listen(this.onChange);
  }

  componentDidUpdate(){
  }

  componentWillUnmount() {
    NavLoginStore.unlisten(this.onChange);
  }
  onChange(state) {
    this.setState(state);
  }
  
  handleLoginRequest(event){
    event.preventDefault();
    this.setState({'showLogin':true});
  }
  handleLogoutCancel(event){
    event.preventDefault();
    this.setState({'showLogin':false});
  }
  handleLoginSubmit(event) {
    event.preventDefault();

    //NavLoginActions.login('root', 'root');
    //this.forceUpdate();
    var self = this;
    if(this.state.username && this.state.password){
    $.ajax({
        type: 'POST',
        url: '/api/loginUser',
        data: {
          'username': this.state.username,
          'password': this.state.password
        }
      })
      .done((data) => {
        localStorage.setItem('LoginUser', JSON.stringify(data));
        self.setState({'LoginUser':data,'showLogin':false});
      })
      .fail((jqXhr) => {
      });
    }
    else{
      toastr.error('Please Enter a Valid Username and Password');
    }
  }
  handleLogoutSubmit(event) {
    event.preventDefault();
    localStorage.removeItem('LoginUser');
    this.setState({'LoginUser':null});
  }
  updateUsername(e){
    e.preventDefault();
    this.setState({'username':e.target.value})
  }
  udpatePassword(e){
    e.preventDefault();
    this.setState({'password':e.target.value})
  }

  render() {
    var loginButton;
    if(this.state.showLogin){
      loginButton = <div id='NavLoginForm'>
          <form role="form">
            <input type="text" placeholder="Username" onChange={this.updateUsername.bind(this)} />
            <input type="password" placeholder="Password" onChange={this.udpatePassword.bind(this)} />
          
          <button type="submit" onClick={this.handleLoginSubmit.bind(this)}>Login</button>
          <button type="cancel" onClick={this.handleLogoutCancel.bind(this)}>Cancel</button>
        </form>
      </div>;
    }
    else{
      if (this.state.LoginUser!=null && Object.keys(this.state.LoginUser).length>0) {
        loginButton = <a href='/logout' id='btnLogout' onClick={this.handleLogoutSubmit.bind(this)} >Log Out</a>;
      } else {
        loginButton = <a href='/login' id='btnLogin' onClick={this.handleLoginRequest.bind(this)} >Login</a>;
      }
    }
    return loginButton;
  }
}

export default NavLogin;