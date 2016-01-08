import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import {first, without, findWhere} from 'underscore';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.setState({'game':null});
    HomeStore.listen(this.onChange);
    //HomeActions.getCharacters();
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleClick(character) {
    // var winner = character.id;
    // var loser = first(without(this.state.characters, findWhere(this.state.characters, { id: winner }))).id;
    // HomeActions.vote(winner, loser);
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
    var pageContent;
    if(this.state.game!=null && Object.keys(this.state.game).length>0){
      pageContent = <div>{this.state.game}</div>
    }
    else{
      pageContent = <div><h3 className='text-center'>Search Summoner:</h3>
        <form ref='searchForm' className='navbar-form navbar-left animated' onSubmit={this.handleSubmit.bind(this)}>
            <div className='input-group'>
              <input id='inputSearchChampions' type='text' className='form-control' placeholder="Summoner's Name" value={this.state.searchQuery} onChange={HomeActions.updateSearchQuery} />
              <span className='input-group-btn'>
                <button className='btn btn-default' onClick={this.handleSubmit.bind(this)}><span className='glyphicon glyphicon-search'></span></button>
              </span>
            </div>
          </form>
          </div>
    }
    return (
      <div className='container'>
      {pageContent}
      </div>
    );
    
  }
}

export default Home;