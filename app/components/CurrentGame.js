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
      <div className='TeamBlue'>{team1}</div>
      <div className='TeamRed'>{team2}</div>
      <div style={{'display':'none'}}>{this.props.game}</div>
      </div>
    );
    
  }
}
class Participant extends React.Component {
  render(){
    var player = JSON.parse(this.props.participant);
    return (
      <div className='Participant'>
        <div className='pIcon'>{player.profileIconId}</div>
        <div className='pName'>{player.summonerName}</div>
        <div className='pId'>{player.summonerId}</div>
        <div className='championId'>{player.championId}</div>
        <div className='spell1'>{player.spell1Id}</div>
        <div className='spell2'>{player.spell2Id}</div>
        <div className='masteries'>{JSON.stringify(player.runes)}</div>
        <div className='runes'>{JSON.stringify(player.masteries)}</div>
      </div>  
    )
  }
}
export default CurrentGame;