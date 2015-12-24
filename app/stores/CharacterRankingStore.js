import alt from '../alt';
import CharacterRankingActions from '../actions/CharacterRankingActions';

class CharacterRankingStore {
  constructor() {
    this.bindActions(CharacterRankingActions);
    this.characters = [];
  }

  onGetCharactersSuccess(data) {
    this.characters = data;
  }

  onGetCharactersFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(CharacterRankingStore);