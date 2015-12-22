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
    HomeStore.listen(this.onChange);
    HomeActions.getTwoCharacters();
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleClick(character) {
    var winner = character.characterId;
    var loser = first(without(this.state.characters, findWhere(this.state.characters, { characterId: winner }))).characterId;
    HomeActions.vote(winner, loser);
  }

  render() {
    var characterNodes =[];
    for(var x in this.state.characters){
    	let character=this.state.characters[x];
    	characterNodes.push(
    		<div key={character.id} className='col-xs-6 col-sm-6 col-md-2 champion'>
          <div className='thumbnail fadeInUp animated'>
            <img className='campionImage' onClick={this.handleClick.bind(this, character.id)} src={'http://ddragon.leagueoflegends.com/cdn/5.24.2/img/champion/' + character.image.full }/>
            <div className='caption text-center'>
              <ul className='list-inline'>
                <li> {character.title}</li>
              </ul>
              <h4>
                <Link to={'/characters/' + character.characterId}><strong>{character.name}</strong></Link>
              </h4>
            </div>
          </div>
        </div>
    		);
    }

    return (
      <div className='container'>
        <h3 className='text-center'>View Champions</h3>
        <div className='row'>
          {characterNodes}
        </div>
      </div>
    );
  }
}

export default Home;