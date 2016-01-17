import alt from '../alt';
//import LoginActions from '../actions/LoginActions';

class ForgetStore {

  constructor() {
    //this.bindActions(LoginActions)
    this.email = null;
    this.recoveryEmailSent = null;
    this.LoginUser = null;
  }
}

export default alt.createStore(ForgetStore);