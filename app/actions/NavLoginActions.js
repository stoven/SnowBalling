import alt from '../alt';

class NavLoginActions {
  constructor() {
    this.generateActions(
      // 'loginUser',
      // 'logoutUser'
    );
  }

  // login(username, password) {
  //   $.ajax({
  //       type: 'POST',
  //       url: '/api/loginUser',
  //       data: {
  //         'username': username,
  //         'password': password
  //       }
  //     })
  //     .done((data) => {
  //       localStorage.setItem('LoginUser', JSON.stringify(data));
  //       this.actions.loginUser(data);
  //     })
  //     .fail((jqXhr) => {

  //     });
  // }

  // logout() {
  //   localStorage.removeItem('LoginUser');
  // }
}
export default alt.createActions(NavLoginActions);