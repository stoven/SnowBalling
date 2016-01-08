import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'getPlayerGameSuccess',
      'getPlayerGameFail',
      'updateSearchQuery',
      'voteFail'
    );
  }

  getPlayerGame() {
    //let localData = localStorage.getItem('LOLChampions') ? JSON.parse(localStorage.getItem('LOLChampions')) : {};
    let params = {
      playername: payload.playername
    };

      $.ajax({ url: '/api/getPlayerGame',data: params })
      .done(data => {
        //localStorage.setItem('LOLChampions', JSON.stringify(data));
        this.actions.getCharactersSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getCharactersFail(jqXhr.responseJSON.message);
      });
    
  }

  vote(winner, loser) {
    $.ajax({
      type: 'PUT',
      url: '/api/characters' ,
      data: { winner: winner, loser: loser }
    })
      .done(() => {
        this.actions.getTwoCharacters();
      })
      .fail((jqXhr) => {
        this.actions.voteFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(HomeActions);