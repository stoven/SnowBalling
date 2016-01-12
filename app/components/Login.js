import React from 'react';
import LoginStore from '../stores/LoginStore';
import NavLoginStore from '../stores/NavLoginStore';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = LoginStore.getState();
  }
  componentDidUpdate(){
    //NavLoginStore.listen(this.cancel);
  }

  updateUsername(e){
    e.preventDefault();
    this.setState({'username':e.target.value})
  }
  udpatePassword(e){
    e.preventDefault();
    this.setState({'password':e.target.value})
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
        self.setState({'LoginUser':data});
      })
      .fail((jqXhr) => {

      });
  }

  render() {
    return (
      <div>
        <form role="form">
        <div className="form-group">
          <input type="text" placeholder="Username" onChange={this.updateUsername.bind(this)} />
          <input type="password" placeholder="Password" onChange={this.udpatePassword.bind(this)} />
        </div>
        <button type="submit" onClick={this.login.bind(this)}>Login</button>
      </form>
    </div>
    );
  }
}

// We’re using the mixin `LinkStateMixin` to have two-way databinding between our component and the HTML.
//reactMixin(Login.prototype, React.addons.LinkedStateMixin);
export default Login;