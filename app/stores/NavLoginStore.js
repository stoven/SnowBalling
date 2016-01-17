import alt from '../alt';
import NavLoginActions from '../actions/NavLoginActions';

class NavLoginStore {
  constructor() {
    this.bindActions(NavLoginActions);
    this.LoginUser = null;
    this.showLogin = false;
    this.username = null;
    this.password = null;
  }
  // onLoginUser(data){
  //   this.LoginUser=data;
  // }
  onCheckUserLoginStatus(user){
    this.LoginUser=user;
  }
}

export default alt.createStore(NavLoginStore);