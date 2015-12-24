import React from 'react';
import CharacterStore from '../stores/CharacterStore';
import CharacterActions from '../actions/CharacterActions'

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = CharacterStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CharacterStore.listen(this.onChange);
    CharacterActions.getCharacter(this.props.params.id);

    $('.magnific-popup').magnificPopup({
      type: 'image',
      mainClass: 'mfp-zoom-in',
      closeOnContentClick: true,
      midClick: true,
      zoom: {
        enabled: true,
        duration: 300
      }
    });
    $("#showAllLore").click(function(){
      $('.lore.rest').toggle();
    })
  }

  componentWillUnmount() {
    CharacterStore.unlisten(this.onChange);
    $(document.body).removeClass();
  }

  componentDidUpdate(prevProps) {
    // Fetch new charachter data when URL path changes
    if (prevProps.params.id !== this.props.params.id) {
      CharacterActions.getCharacter(this.props.params.id);
    }
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let firstParagraph, restParagraph='';
    //firstParagraph = ;//.substring(0,this.state.lore.indexOf('br'));
    if(this.state.lore){
      firstParagraph = this.state.lore.substring(0,this.state.lore.indexOf('<br'));
      restParagraph = this.state.lore.substring(this.state.lore.indexOf('<br'));
    }
    return (
      <div className='container'>
        <div className='profile-img'>
          <a className='magnific-popup' href={'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/'+this.state.name+'_0.jpg'}>
            <img className='profile-img-src' src={'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/'+this.state.name+'_0.jpg'} />
          </a>
        </div>
        <div className='profile-info clearfix'>
          <h2><strong>{this.state.name}</strong></h2>
          <h4 className='lead'><strong>{this.state.title}</strong></h4>
          <div className='lore first' dangerouslySetInnerHTML={{__html:firstParagraph}}></div>
          <div className='lore rest' dangerouslySetInnerHTML={{__html:restParagraph}}></div>
          <a id='showAllLore'>Show All</a>
          {/* <button className='btn btn-transparent'
                  onClick={CharacterActions.report.bind(this, this.state.characterId)}
                  disabled={this.state.isReported}>
            {this.state.isReported ? 'Reported' : 'Report Character'}
          </button>
          */}
        </div>
        {/*<div className='profile-stats clearfix'>
          <ul>
            <li><span className='stats-number'>{this.state.winLossRatio}</span>Winning Percentage</li>
            <li><span className='stats-number'>{this.state.wins}</span> Wins</li>
            <li><span className='stats-number'>{this.state.losses}</span> Losses</li>
          </ul>
        </div>*/}
      </div>
    );
  }
}

export default Character;