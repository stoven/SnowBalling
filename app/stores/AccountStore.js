import alt from '../alt';
import AccountActions from '../actions/AccountActions';

class AccountStore {

  constructor() {
    this.bindActions(AccountActions)
    this.summoner = null;
    this.helpBlock = '';
    this.summonerNameValidationState = '';
    this.LoginUser = null;
  }

  onSetLoginUser(user){
    this.LoginUser=user;
  }

  onSetSummonerNameSuccess(successMessage) {
    this.summonerNameValidationState = 'has-success';
    this.helpBlock = successMessage;
  }

  onSetSummonerNameFail(errorMessage) {
    this.summonerNameValidationState = 'has-error';
    this.helpBlock = errorMessage;
  }

  onGetSummonerSuccess(name){
  	this.summoner = name;
  }
  onInvalidName() {
    this.nameValidationState = 'has-error';
    this.helpBlock = 'Please enter a character name.';
  }
}

export default alt.createStore(AccountStore);