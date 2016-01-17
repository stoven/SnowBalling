import React from 'react';
import {Link} from 'react-router';
import ForgetStore from '../stores/ForgetStore';
import NavLoginActions from '../actions/NavLoginActions';

class Forget extends React.Component {

  constructor(props) {
    super(props);
    this.state = ForgetStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidUpdate(){
    //NavLoginStore.listen(this.cancel);
  }
  componentDidMount() {
    let user = localStorage.getItem('LoginUser') ? JSON.parse(localStorage.getItem('LoginUser')) : {};
    this.setState({'LoginUser':user});
    ForgetStore.listen(this.onChange);
  }
  componentWillUnmount() {
    ForgetStore.unlisten(this.onChange);
  }

  updateEmail(e){
    e.preventDefault();
    this.setState({'email':e.target.value})
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
        url: '/api/forget',
        data: {
          'email': this.state.email
        }
      })
      .done((data) => {
        self.setState({'recoveryEmailSent':true});
      })
      .fail((jqXhr) => {

      });
  }

  render() {
    if (this.state.LoginUser!=null && Object.keys(this.state.LoginUser).length>0) {
      return (<div>{"You've already Logged In."}<Link to='/logout'>Log out</Link></div>);
    }
    else if(this.state.recoveryEmailSent){
      return (<div>Please check your email to reset the password.</div>);
    }
    else{
      return (
        <div>
          <form role="form">
          <div className="form-group">
            <input type="text" placeholder="Email" onChange={this.updateEmail.bind(this)} />
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
export default Forget;