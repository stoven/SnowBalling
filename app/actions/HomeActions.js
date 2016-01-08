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

  getPlayerGame(payload) {
    //let localData = localStorage.getItem('LOLChampions') ? JSON.parse(localStorage.getItem('LOLChampions')) : {};
    let params = {
      playername: payload.searchQuery
    };

      $.ajax({ url: '/api/getPlayerGame',data: params })
      .done(data => {
        //localStorage.setItem('LOLChampions', JSON.stringify(data));
        //console.log(data);
        if(data.slice(0, 'error'.length) == 'error'){
          this.actions.getPlayerGameFail(jqXhr.responseJSON.message);
        }
        else{
          this.actions.getPlayerGameSuccess(data);
        }
      })
      .fail(jqXhr => {
        this.actions.getPlayerGameFail(jqXhr.responseJSON.message);
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