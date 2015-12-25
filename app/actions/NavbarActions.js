import alt from '../alt';
import {assign} from 'underscore';

class NavbarActions {
  constructor() {
    this.generateActions(
      'updateOnlineUsers',
      'updateAjaxAnimation',
      'updateSearchQuery',
      'getChampionCountAndNamesSuccess',
      'getChampionCountAndNamesFail',
      'findCharacterSuccess',
      'findCharacterFail'
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
          if(value.toLowerCase().indexOf(payload.searchQuery)!=-1){
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

  getChampionCountAndNames() {
    let localData = localStorage.getItem('LOLChampions') ? JSON.parse(localStorage.getItem('LOLChampions')) : {};
    if(Object.keys(localData).length==0){
    //$.ajax({ url: '/api/characters/count' })
    $.ajax({ url: '/api/characters' })
      .done((data) => {
        this.actions.getChampionCountAndNamesSuccess(Object.keys(data));
        localStorage.setItem('LOLChampions', JSON.stringify(data));
      })
      .fail((jqXhr) => {
        this.actions.getChampionCountAndNamesFail(jqXhr);
      });
    }
    else{
      this.actions.getChampionCountAndNamesSuccess(Object.keys(localData));
    }
  }
}

export default alt.createActions(NavbarActions);