import alt from '../alt';

class CharacterListActions {
  constructor() {
    this.generateActions(
      'getChampionCountAndNamesSuccess',
      'getChampionCountAndNamesFail'
    );
  }

  getCharacters(payload) {
    let url = '/api/characters';
    let params = {
      race: payload.race,
      bloodline: payload.bloodline
    };

    if(payload.category.toLowerCase()==='all'){
      let localData = localStorage.getItem('LOLChampions') ? JSON.parse(localStorage.getItem('LOLChampions')) : {};
      if(Object.keys(localData).length==0){
        $.ajax({ url: '/api/characters' })
        .done((data) => {
          localStorage.setItem('LOLChampions', JSON.stringify(data));
          this.actions.getChampionCountAndNamesSuccess(data);
        })
        .fail((jqXhr) => {
          this.actions.getChampionCountAndNamesFail(jqXhr);
        });
      }
      else{
        this.actions.getChampionCountAndNamesSuccess(localData);
      }
    }
    else
    {
      this.actions.getChampionCountAndNamesSuccess([]);
      //Router.transiteTo('notfound');
    }
    // if (payload.category === 'female') {
    //   params.gender = 'female';
    // } else if (payload.category === 'male') {
    //   params.gender = 'male';
    // }

    // if (payload.category === 'shame') {
    //   url = '/api/characters/shame';
    // }

    // $.ajax({ url: url, data: params })
    //   .done((data) => {
    //     this.actions.getCharactersSuccess(data);
    //   })
    //   .fail((jqXhr) => {
    //     this.actions.getCharactersFail(jqXhr);
    //   });
  }
}

export default alt.createActions(CharacterListActions);