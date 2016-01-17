import alt from '../alt';
//import LoginActions from '../actions/LoginActions';

class ResetPasswordStore {

  constructor() {
    //this.bindActions(LoginActions)
    this.email = null;
    this.password = null;
    this.key = null;
    this.resetSuccess = false;
    this.LoginUser = null;
  }
}

export default alt.createStore(ResetPasswordStore);