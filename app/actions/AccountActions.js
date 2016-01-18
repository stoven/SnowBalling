import alt from '../alt';

class AccountActions {
  constructor() {
    this.generateActions(
      'setSummonerNameSuccess',
      'setSummonerNameFail',
      'getSummonerSuccess',
      'invalidName',
      'setLoginUser'
    );
  }
  getSummoner(userId) {
    $.ajax({
      type: 'GET',
      url: '/api/getSummoner',
      data: { userid: userId }
    })
      .done((data) => {
        this.actions.getSummonerSuccess(data.summonerName);
      })
      .fail((jqXhr) => {
        this.actions.getSummonerSuccess('');
      });
  }
  setSummoner(userId, summonerName){
    $.ajax({
      type: 'POST',
      url: '/api/setSummoner',
      data: { userid: userId, summonerName: summonerName }
    })
      .done((data) => {
        this.actions.setSummonerNameSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.setSummonerNameFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(AccountActions);