import alt from '../alt';
import LoginActions from '../actions/LoginActions';

class LoginStore {

  constructor() {
    this.bindActions(LoginActions)
    this.username = null;
    this.password = null;
  }
}

export default alt.createStore(LoginStore);