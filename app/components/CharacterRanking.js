import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import CharacterRankingStore from '../stores/CharacterRankingStore';
import CharacterRankingActions from '../actions/CharacterRankingActions';

class CharacterRanking extends React.Component {
  constructor(props) {
    super(props);
    this.state = CharacterRankingStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CharacterRankingStore.Rankingen(this.onChange);
    CharacterRankingActions.getCharacters(this.props.params);
  }

  componentWillUnmount() {
    CharacterRankingStore.unRankingen(this.onChange);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.params, this.props.params)) {
      CharacterRankingActions.getCharacters(this.props.params);
    }
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let charactersRanking = this.state.characters.map((character, index) => {
      return (
        <div key={character.characterId} className='Ranking-group-item animated fadeIn'>
          <div className='media'>
            <span className='position pull-left'>{index + 1}</span>
            <div className='pull-left thumb-lg'>
              <Link to={'/characters/' + character.characterId}>
                <img className='media-object' src={'http://image.eveonline.com/Character/' + character.characterId + '_128.jpg'} />
              </Link>
            </div>
            <div className='media-body'>
              <h4 className='media-heading'>
                <Link to={'/characters/' + character.characterId}>{character.name}</Link>
              </h4>
              <small>Race: <strong>{character.race}</strong></small>
              <br />
              <small>Bloodline: <strong>{character.bloodline}</strong></small>
              <br />
              <small>Wins: <strong>{character.wins}</strong> Losses: <strong>{character.losses}</strong></small>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='container'>
        <div className='Ranking-group'>
          {charactersRanking}
        </div>
      </div>
    );
  }
}

export default CharacterRanking;