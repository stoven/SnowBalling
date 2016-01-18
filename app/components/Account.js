import React from 'react';
import {Link} from 'react-router';
import AccountStore from '../stores/AccountStore';
import AccountActions from '../actions/AccountActions';

class Account extends React.Component {

  constructor(props) {
    super(props);
    this.state = AccountStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidUpdate(){
  }
  componentDidMount() {
    AccountStore.listen(this.onChange);
    let user = localStorage.getItem('LoginUser') ? JSON.parse(localStorage.getItem('LoginUser')) : {};
    AccountActions.getSummoner(user.user._id);
    AccountActions.setLoginUser(user);
  }
  componentWillUnmount() {
    AccountStore.unlisten(this.onChange);
  }

  updateSummonerName(e){
    e.preventDefault();
    this.setState({'summoner':e.target.value})
  }
  onChange(state) {
    this.setState(state);
  }

  submit(e) {
    e.preventDefault();

    var name = this.state.summoner.trim();

    if (!name) {
      AccountActions.invalidName();
      this.refs.summonerNameTextField.getDOMNode().focus();
    }

    if (name) {
      AccountActions.setSummoner(this.state.LoginUser.user._id,name);
    }
  }

  render() {
    
      return (
        <div className='container'>
          <div className='row flipInX animated'>
            <div className='col-sm-8'>
              <div className='panel panel-default'>
                <div className='panel-heading'>Add Character</div>
                <div className='panel-body'>
                  <form onSubmit={this.submit.bind(this)}>
                    <div className={"form-group "+this.state.summonerNameValidationState}>
                      <label className='control-label'>Character Name</label>
                      <input type="text" className='form-control' ref='summonerNameTextField' placeholder="Summoner Name" onChange={this.updateSummonerName.bind(this)} value={this.state.summoner} />
                      <span className='help-block'>{this.state.helpBlock}</span>
                    </div>
                    <button type="submit" className='btn btn-primary' >Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    
  }
}

export default Account;