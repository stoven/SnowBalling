import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import {first, without, findWhere} from 'underscore';
import CurrentGame from './CurrentGame'

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
    this.setState({'game':null});
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    let searchQuery = this.state.searchQuery.trim();
    if (searchQuery) {
      HomeActions.getPlayerGame({
        searchQuery: searchQuery,
        searchForm: this.refs.searchForm,
        history: this.props.history
      });
    }
  }

  render() {
    var gameContent;
    if(this.state.game!=null && Object.keys(this.state.game).length>0){
      gameContent = <CurrentGame game={this.state.game} />
    }
    return (
      <div className='container'>
        {gameContent}
        <h3 className='text-center'>Search Summoner:</h3>
        <form ref='searchForm' className='home-form animated' onSubmit={this.handleSubmit.bind(this)}>
          <div className='input-group col-xs-6 col-xs-offset-3'>
            <input id='inputSearchChampions' type='text' className='form-control' placeholder="Summoner's Name" value={this.state.searchQuery} onChange={HomeActions.updateSearchQuery} />
            <span className='input-group-btn'>
              <button className='btn btn-default' onClick={this.handleSubmit.bind(this)}><span className='glyphicon glyphicon-search'></span></button>
            </span>
          </div>
        </form>
      </div>
    );
    
  }
}
export default Home;