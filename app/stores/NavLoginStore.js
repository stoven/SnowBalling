import alt from '../alt';
import NavLoginActions from '../actions/NavLoginActions';

class NavLoginStore {
  constructor() {
    this.bindActions(NavLoginActions);
    this.LoginUser = null;
  }
  // onLoginUser(data){
  //   this.LoginUser=data;
  // }
}

export default alt.createStore(NavLoginStore);