import alt from '../alt';

class CharacterActions {
  constructor() {
    this.generateActions(
      'reportSuccess',
      'reportFail',
      'getCharacterSuccess',
      'getCharacterFail'
    );
  }

  getCharacter(characterName) {
    let localData = localStorage.getItem('LOLChampions') ? JSON.parse(localStorage.getItem('LOLChampions')) : {};
    let characterId=0;
    if(localData[characterName]!=null){
      characterId=localData[characterName].id;
      $.ajax({ url: '/api/characters/' + characterId })
      .done((data) => {
        this.actions.getCharacterSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getCharacterFail(jqXhr);
      });
    }
    else{
      $.ajax({ url: '/api/characters' })
      .done(data => {
        localStorage.setItem('LOLChampions', JSON.stringify(data));
        characterId=localData[characterName].id;
        $.ajax({ url: '/api/characters/' + characterId })
        .done((data) => {
          this.actions.getCharacterSuccess(data);
        })
        .fail((jqXhr) => {
          this.actions.getCharacterFail(jqXhr);
        });
      })
      .fail(jqXhr => {
        this.actions.getCharacterFail(jqXhr);
      });
    }
  }

  report(characterId) {
    $.ajax({
      type: 'POST',
      url: '/api/report',
      data: { characterId: characterId }
    })
      .done(() => {
        this.actions.reportSuccess();
      })
      .fail((jqXhr) => {
        this.actions.reportFail(jqXhr);
      });
  }
}

export default alt.createActions(CharacterActions);