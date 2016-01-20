import alt from '../alt';
import {assign} from 'underscore';

class CharacterListActions {
  constructor() {
    this.generateActions(
      'getChampionsSuccess',
      'getChampionsFail',
      'findCharacterSuccess',
      'findCharacterFail',
      'updateSearchQuery'
    );
  }

  findCharacter(payload) {
    $.ajax({
      url: '/api/characters/search',
      data: { name: payload.searchQuery }
    })
      .done((data) => {
        let hit=0;
        let hitArray = [];
        $.each(Object.keys(data),function(index,value){
          if(value.toLowerCase().indexOf(payload.searchQuery.toLowerCase())!=-1){
            hit++;
            hitArray.push(value);
          }
        })
        if(hit==1){
          assign(payload, data[hitArray[0]]);
          this.actions.findCharacterSuccess(payload);
        }
      })
      .fail(() => {
        this.actions.findCharacterFail(payload);
      });
  }

  getCharacters(payload) {
    // let params = {
    //   race: payload.race,
    //   bloodline: payload.bloodline
    // };

    let localData = localStorage.getItem('LOLChampions') ? JSON.parse(localStorage.getItem('LOLChampions')) : {};
    if(Object.keys(localData).length==0){
      $.ajax({ url: '/api/characters' })
      .done((data) => {
        localStorage.setItem('LOLChampions', JSON.stringify(data));
        localData = JSON.parse(data);
      })
      .fail((jqXhr) => {
        this.actions.getChampionsFail(jqXhr);
      });
    }
    if(payload.category.toLowerCase()==='all'){
        this.actions.getChampionsSuccess(localData);
    }
    else
    {
      this.actions.getChampionsSuccess(localData);
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