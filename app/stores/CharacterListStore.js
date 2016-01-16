import alt from '../alt';
import CharacterListActions from '../actions/CharacterListActions';

class CharacterListStore {
  constructor() {
    this.bindActions(CharacterListActions);
    this.characters = [];
    this.totalCharacters = 0;
    this.searchQuery = '';
    this.championNames = [];
  }

  onFindCharacterSuccess(payload) {
    payload.history.pushState(null, '/champion/' + payload.name);
  }

  onFindCharacterFail(payload) {
    payload.searchForm.classList.add('shake');
    setTimeout(() => {
      payload.searchForm.classList.remove('shake');
    }, 1000);
  }

  onUpdateSearchQuery(event) {
    this.searchQuery = event.target.value;
  }

  onGetChampionsSuccess(data) {
    this.characters = data;
    this.championNames = Object.keys(data);
    this.totalCharacters = this.championNames.length;
  }

  onGetChampionsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(CharacterListStore);