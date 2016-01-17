import React from 'react';
import {Link} from 'react-router';
import UserRegisterStore from '../stores/UserRegisterStore'
//import UserRegisterActions from '../actions/UserRegisterActions';
import NavLoginActions from '../actions/NavLoginActions';
import {first, without, findWhere} from 'underscore';



class UserRegister extends React.Component {

  constructor(props,context) {
    super(props);
    this.state = UserRegisterStore.getState();
  }

  componentDidMount() {
    let user = localStorage.getItem('LoginUser') ? JSON.parse(localStorage.getItem('LoginUser')) : {};
    this.setState({'LoginUser':user});
  }

  componentWillUnmount() {
  }

  updateUsername(e){
    e.preventDefault();
    this.setState({'username':e.target.value})
  }
  updatePassword(e){
    e.preventDefault();
    this.setState({'password':e.target.value})
  }
  updateEmail(e){
    e.preventDefault();
    this.setState({'email':e.target.value})
  }

  register(event) {
    event.preventDefault();
    var self = this;
    $.ajax({
        type: 'POST',
        url: '/api/registerUser',
        data: {
          'username': this.state.username,
          'password': this.state.password,
          'email':this.state.email
        }
      })
      .done((data) => {
        localStorage.setItem('LoginUser', JSON.stringify(data));
        NavLoginActions.checkUserLoginStatus(data);
        self.setState({'LoginUser':data});
        this.props.history.push('/');
      })
      .fail((jqXhr) => {

      });
  }

  render() {
    if (this.state.LoginUser!=null && Object.keys(this.state.LoginUser).length>0) {
      return (<div>You must log out to register a new acctoun</div>);
    }
    else{
    return (
      <div className='container'>
        <form role="form">
        <div className="form-group">
          <input type="text" placeholder="Username" onChange={this.updateUsername.bind(this)} />
          <input type="password" placeholder="Password" onChange={this.updatePassword.bind(this)} />
          <input type="text" placeholder="Email" onChange={this.updateEmail.bind(this)} />
        </div>
        <button type="submit" onClick={this.register.bind(this)}>Login</button>
      </form>
      </div>
    );
    }
  }
}
export default UserRegister;