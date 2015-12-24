import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'getCharactersSuccess',
      'getCharactersFail',
      'updateSearchQuery',
      'voteFail'
    );
  }

  getCharacters() {
    let localData = localStorage.getItem('LOLChampions') ? JSON.parse(localStorage.getItem('LOLChampions')) : {};
    if(!Object.keys(localData).length==0){
      $.ajax({ url: '/api/characters' })
      .done(data => {
        localStorage.setItem('LOLChampions', JSON.stringify(data));
        this.actions.getCharactersSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getCharactersFail(jqXhr.responseJSON.message);
      });
    }
    else{
      this.actions.getCharactersSuccess(localData);
    }
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