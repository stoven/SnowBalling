import React from 'react';
import {Link,Router} from 'react-router';
import {isEqual} from 'underscore';
import CharacterListStore from '../stores/CharacterListStore';
import CharacterListActions from '../actions/CharacterListActions';

class CharacterList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = CharacterListStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CharacterListStore.listen(this.onChange);
    CharacterListActions.getCharacters(this.props.params);

    $.get(this.state.championNames, function(result) {
      let ChampionsList = this.state.championNames;
      $( "#inputSearchChampions" ).autocomplete({
        source: ChampionsList,
        select: function(event, ui) {
          event.target.value = ui.item.value;
          CharacterListActions.updateSearchQuery(event);//alert(ui.item.value+event.target.value);
        }
      });
    }.bind(this));
  }

  componentWillUnmount() {
    CharacterListStore.unlisten(this.onChange);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.params, this.props.params)) {
      CharacterListActions.getCharacters(this.props.params);
    }
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    let searchQuery = this.state.searchQuery.trim();
    if (searchQuery) {
      CharacterListActions.findCharacter({
        searchQuery: searchQuery,
        searchForm: this.refs.searchForm,
        history: this.props.history
      });
    }
  }

  render() {

    var characterNodes =[];
    {/* ranking styles
    var counter=0;
    for(var x in this.state.characters){
      counter++;
      if(counter>5){
        break;
      }
      let character=this.state.characters[x];
      characterNodes.push(
        <div key={character.id} className='list-group-item animated fadeIn'>
          <div className='media'>
            <span className='position pull-left'>{counter + 1}</span>
            <div className='pull-left thumb-lg'>
              <Link to={'/characters/' + character.name}>
                <img className='campionImage' src={'http://ddragon.leagueoflegends.com/cdn/5.24.2/img/champion/' + character.image.full }/>
              </Link>
            </div>
            <div className='media-body'>
              <h4 className='media-heading'>
                <Link to={'/characters/' + character.name}>{character.name}</Link>
              </h4>
              <small><strong>{character.title}</strong></small>
              <br />
              <small>Bloodline: <strong>{character.bloodline}</strong></small>
              <br />
              <small>Wins: <strong>{character.wins}</strong> Losses: <strong>{character.losses}</strong></small>
            </div>
          </div>
        </div>
        );
    }*/}
    for(var x in this.state.characters){
      let character=this.state.characters[x];
      characterNodes.push(
        <div key={character.id} className='col-xs-6 col-sm-6 col-md-2 champion'>
          <div className='thumbnail fadeInUp animated'>
            <Link to={'/champion/' + character.name}><img className='campionImage' /*onClick={this.handleClick.bind(this, character.id)} */src={'http://ddragon.leagueoflegends.com/cdn/5.24.2/img/champion/' + character.image.full }/></Link>
            <div className='caption text-center'>
              <ul className='list-inline'>
                <li className='characterTitle'> {character.title}</li>
              </ul>
              <h4>
                <Link to={'/champion/' + character.name}><strong>{character.name}</strong></Link>
              </h4>
            </div>
          </div>
        </div>
        );
    }

    return (
      <div className='container'>
      <h3 className='text-center'>View Champions</h3>
          <form ref='searchForm' className='champions-search-form animated col-xs-3 col-xs-offset-9 clearfix' style={{'display':'block','marginBottom':'15px'}} onSubmit={this.handleSubmit.bind(this)}>
            <div className='input-group'>
              <input id='inputSearchChampions' type='text' className='form-control' placeholder={this.state.totalCharacters + ' champions'} value={this.state.searchQuery} onChange={CharacterListActions.updateSearchQuery} />
              <span className='input-group-btn'>
                <button className='btn btn-default' onClick={this.handleSubmit.bind(this)}><span className='glyphicon glyphicon-search'></span></button>
              </span>
            </div>
          </form>
        <div className='list-group'>
          {characterNodes}
        </div>
      </div>
    );
  }
}

export default CharacterList;