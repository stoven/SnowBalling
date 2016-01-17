import React from 'react';
import {Link} from 'react-router';
import ResetPasswordStore from '../stores/ResetPasswordStore';
import NavLoginActions from '../actions/NavLoginActions';

class ResetPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = ResetPasswordStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidUpdate(){
    //NavLoginStore.listen(this.cancel);
  }
  componentDidMount() {
    ResetPasswordStore.listen(this.onChange);
    let key = this.getParameterByName('key');
    if(this.state.key==null&&key){
      this.setState({'key':key});
    }
    let email = this.getParameterByName('email');
    if(this.state.email==null&&email){
      this.setState({'email':email});
    }
    let user = localStorage.getItem('LoginUser') ? JSON.parse(localStorage.getItem('LoginUser')) : {};
    this.setState({'LoginUser':user});
  }
  componentWillUnmount() {
    ResetPasswordStore.unlisten(this.onChange);
  }

  updateEmail(e){
    e.preventDefault();
    this.setState({'email':e.target.value})
  }
  updatePassword(e){
    e.preventDefault();
    this.setState({'password':e.target.value}) 
  }
  onChange(state) {
    this.setState(state);
  }
  // This will be called when the user clicks on the login button
  submit(e) {
    e.preventDefault();
    // Here, we call an external AuthService. We’ll create it in the next step
    var self = this;
    $.ajax({
        type: 'POST',
        url: '/api/reset',
        data: {
          'email': this.state.email,
          'password':this.state.password,
          'key':this.state.key
        }
      })
      .done((data) => {
        self.setState({'resetSuccess':true});
      })
      .fail((jqXhr) => {

      });
  }
  getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  render() {
    if (this.state.LoginUser!=null && Object.keys(this.state.LoginUser).length>0) {
      return (<div>{"You've already Logged In."}<Link to='/logout'>Log out</Link></div>);
    }
    else if(this.state.resetSuccess){
      return (<div>{"You've successfully reset your password."}<Link to='/login'>Log In</Link></div>);
    }
    else if(!this.state.key){
      return (<div>The request is invalid.</div>);
    }
    else{
      return (
        <div>
          <form role="form">
          <div className="form-group">
            <input type="text" placeholder="Email" onChange={this.updateEmail.bind(this)} value={this.state.email} />
            <input type="password" placeholder="Password" onChange={this.updatePassword.bind(this)} />
          </div>
          <button type="submit" onClick={this.submit.bind(this)}>Submit</button>
        </form>
      </div>
      );
    }
  }
}

// We’re using the mixin `LinkStateMixin` to have two-way databinding between our component and the HTML.
//reactMixin(Login.prototype, React.addons.LinkedStateMixin);
export default ResetPassword;