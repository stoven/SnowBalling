import React from 'react';
import {Link} from 'react-router';

class CurrentGame extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }



  render() {
    var game = JSON.parse(this.props.game);

    var team1 = game.participants.map(function(participant) {
      if(participant.teamId==100){
        return (
          <Participant participant={JSON.stringify(participant)} key={participant.summonerId} />
        );
      }
    });
    var team2 = game.participants.map(function(participant) {
      if(participant.teamId==200){
        return (
          <Participant participant={JSON.stringify(participant)} key={participant.summonerId} />
        );
      }
    });
    return (
      <div className='CurrentGame'>
        <Team participants={team1} />
        <Team participants={team2} />
      <div style={{'display':'none'}}>{this.props.game}</div>
      </div>
    );
    
  }
}
class Team extends React.Component{
  render(){
    return(
    <table className='TeamBlue'>
      <thead><tr>
        <th className='pIcon'></th>
        <th className='pName'>Name</th>
        <th className='champion'>Champion</th>
        <th className='spell'>Spells</th>
        <th className='masteries'>Masteries</th>
        <th className='runes'>Runes</th>
      </tr></thead>
      <tbody>
        {this.props.participants}
      </tbody>
    </table>
    );
  }
}
class Participant extends React.Component {
  componentDidMount(){
    let localData = localStorage.getItem('LOLChampions') ? JSON.parse(localStorage.getItem('LOLChampions')) : {};
    if(Object.keys(localData).length==0){
      $.ajax({ url: '/api/characters' })
      .done((data) => {
        localStorage.setItem('LOLChampions', JSON.stringify(data));
        localData = JSON.parse(data);
      })
      .fail((jqXhr) => {
        this.actions.getChampionsFail(jqXhr);
      });
    }
    localData
  }
  render(){
    var player = JSON.parse(this.props.participant);
    return (
      <tr className='Participant'>
        <td className='pIcon'><img height='30px' src={'http://ddragon.leagueoflegends.com/cdn/6.1.1/img/profileicon/'+player.profileIconId+'.png'} /></td>
        <td className='pName'>{player.summonerName}</td>
        <td className='champion'>{player.championId}</td>
        <td className='spell'>{player.spell1Id}{player.spell2Id}</td>
        <td className='masteries'>{JSON.stringify(player.runes)}</td>
        <td className='runes'>{JSON.stringify(player.masteries)}</td>
      </tr>  
    )
  }
}
export default CurrentGame;