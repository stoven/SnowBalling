import React from 'react';
import {Link} from 'react-router';
import LoginStore from '../stores/LoginStore';
import NavLoginActions from '../actions/NavLoginActions';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = LoginStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidUpdate(){
    //NavLoginStore.listen(this.cancel);
  }
  componentDidMount() {
    let user = localStorage.getItem('LoginUser') ? JSON.parse(localStorage.getItem('LoginUser')) : {};
    this.setState({'LoginUser':user});
    LoginStore.listen(this.onChange);
  }
  componentWillUnmount() {
    LoginStore.unlisten(this.onChange);
  }

  updateUsername(e){
    e.preventDefault();
    this.setState({'username':e.target.value})
  }
  updatePassword(e){
    e.preventDefault();
    this.setState({'password':e.target.value})
  }
  onChange(state) {
    this.setState(state);
  }
  // This will be called when the user clicks on the login button
  login(e) {
    e.preventDefault();
    // Here, we call an external AuthService. We’ll create it in the next step
    var self = this;
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
        NavLoginActions.checkUserLoginStatus(data);
        self.setState({'LoginUser':data});
        this.props.history.push('/');
      })
      .fail((jqXhr) => {

      });
  }

  render() {
    if (this.state.LoginUser!=null && Object.keys(this.state.LoginUser).length>0) {
      return (<div>{"You've already Logged In."}<Link to='/logout'>Log out</Link></div>);
    }
    else{
      return (
        <div>
          <form role="form">
          <div className="form-group">
            <input type="text" placeholder="Username" onChange={this.updateUsername.bind(this)} />
            <input type="password" placeholder="Password" onChange={this.updatePassword.bind(this)} />
          </div>
          <button type="submit" onClick={this.login.bind(this)}>Login</button>
        </form>
      </div>
      );
    }
  }
}

// We’re using the mixin `LinkStateMixin` to have two-way databinding between our component and the HTML.
//reactMixin(Login.prototype, React.addons.LinkedStateMixin);
export default Login;