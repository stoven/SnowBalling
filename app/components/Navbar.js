import React from 'react';
import {Link} from 'react-router';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';
import NavLogin from './NavLogin'

class ChampionLink extends React.Component {
  render(){
    let champName = this.props.name;
    return (
      <li><Link to='/champion/{champName}'>{champName}</Link></li>
      )
  }
}
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = NavbarStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    NavbarStore.listen(this.onChange);
    NavbarActions.getChampionCountAndNames();

    let socket = io.connect();
    socket.on('onlineUsers', (data) => {
      NavbarActions.updateOnlineUsers(data);
    });

    $(document).ajaxStart(() => {
      NavbarActions.updateAjaxAnimation('fadeIn');
    });

    $(document).ajaxComplete(() => {
      setTimeout(() => {
        NavbarActions.updateAjaxAnimation('fadeOut');
      }, 750);
    });

    $.get(this.state.ChampionNames, function(result) {
      let ChampionsList = this.state.ChampionNames;
      $( "#inputSearchChampions" ).autocomplete({
        source: ChampionsList
      });
    }.bind(this));
  }

  componentDidUpdate(){
  }

  componentWillUnmount() {
    NavbarStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    let searchQuery = this.state.searchQuery.trim();

    if (searchQuery) {
      NavbarActions.findCharacter({
        searchQuery: searchQuery,
        searchForm: this.refs.searchForm,
        history: this.props.history
      });
    }
  }

  render() {
    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <div className='navbar-header'>
          <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar'>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
          <Link to='/' className='navbar-brand'>
            <span ref='triangles' className={'triangles animated ' + this.state.ajaxAnimationClass}>
              <div className='tri invert'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
            </span>
            SnowBalling
            <span className='badge badge-up badge-danger'>{this.state.onlineUsers}</span>
          </Link>
        </div>
        <div id='navbar' className='navbar-collapse collapse'>
          <form ref='searchForm' className='navbar-form navbar-left animated' onSubmit={this.handleSubmit.bind(this)}>
            <div className='input-group'>
              <input id='inputSearchChampions' type='text' className='form-control' placeholder={this.state.totalCharacters + ' champions'} value={this.state.searchQuery} onChange={NavbarActions.updateSearchQuery} />
              <span className='input-group-btn'>
                <button className='btn btn-default' onClick={this.handleSubmit.bind(this)}><span className='glyphicon glyphicon-search'></span></button>
              </span>
            </div>
          </form>
          <ul className='nav navbar-nav'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/stats'>Stats</Link></li>
            <li className='dropdown'>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown'>Top 10 <span className='caret'></span></a>
              <ul className='dropdown-menu'>
                <li><Link to='/top'>Top Overall</Link></li>
                <li className='dropdown-submenu'>
                  <Link to='/top/amarr'>Amarr</Link>
                  <ul className='dropdown-menu'>
                    <li><Link to='/top/amarr/amarr'>Amarr</Link></li>
                    <li><Link to='/top/amarr/ni-kunni'>Ni-Kunni</Link></li>
                    <li><Link to='/top/amarr/khanid'>Khanid</Link></li>
                  </ul>
                </li>
                <li className='divider'></li>
                <li><Link to='/shame'>Hall of Shame</Link></li>
              </ul>
            </li>
            <li className='dropdown'>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown'>Champions<span className='caret'></span></a>
              <ul className='dropdown-menu'>
                <li><Link to='/All'>All</Link></li>
                <li className='dropdown-submenu'>
                  <Link to='/female/caldari'>Caldari</Link>
                  <ul className='dropdown-menu'>
                    <li><Link to='/female/caldari/achura'>Achura</Link></li>
                    <li><Link to='/female/caldari/civire/'>Civire</Link></li>
                    <li><Link to='/female/caldari/deteis'>Deteis</Link></li>
                  </ul>
                </li>
                <li className='dropdown-submenu'>
                  <Link to='/female/gallente'>ADC</Link>
                  <ul className='dropdown-menu'>
                    <li><Link to='/female/gallente/gallente'>Gallente</Link></li>
                    <li><Link to='/female/gallente/intaki'>Intaki</Link></li>
                    <li><Link to='/female/gallente/jin-mei'>Jin-Mei</Link></li>
                  </ul>
                </li>
                <li className='dropdown-submenu'>
                  <Link to='/female/minmatar'>Jungle</Link>
                  <ul className='dropdown-menu'>
                    <li><Link to='/female/minmatar/brutor'>Brutor</Link></li>
                    <li><Link to='/female/minmatar/sebiestor'>Sebiestor</Link></li>
                    <li><Link to='/female/minmatar/vherokior'>Vherokior</Link></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><Link to='/add'>Add</Link></li>
            <li><div id="ckepop">
              <div id="ckepop">
              <span className="jiathis_txt">分享到：</span>
              <a className="jiathis_button_weixin">微信</a> 
              <a href="http://www.jiathis.com/share"  className="jiathis jiathis_txt jiathis_separator jtico jtico_jiathis" target="_blank">更多</a>
              <a className="jiathis_counter_style"></a> </div> 
              <script type="text/javascript" src="http://v3.jiathis.com/code/jia.js?uid=1" charSet="utf-8"></script>
              </div>
            </li>
          </ul>
        </div>
        <NavLogin />
      </nav>
    );
  }
}

export default Navbar;