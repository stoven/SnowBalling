import alt from '../alt';
//import NavLoginActions from '../actions/NavLoginActions';

class UserRegisterStore {
  constructor() {
    //this.bindActions(NavLoginActions);
    this.LoginUser=null;
    this.emial = false;
    this.username = null;
    this.password = null;
  }
  // onLoginUser(data){
  //   this.LoginUser=data;
  // }
}

export default alt.createStore(UserRegisterStore);