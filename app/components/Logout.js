import React from 'react';
import NavLoginActions from '../actions/NavLoginActions';

class Logout extends React.Component {

  constructor(props) {
    super(props);
  }
  componentDidUpdate(){
  }
  componentDidMount() {
    localStorage.removeItem('LoginUser');
    NavLoginActions.checkUserLoginStatus();
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        Logging out...
    </div>
    );
  }
}

// We’re using the mixin `LinkStateMixin` to have two-way databinding between our component and the HTML.
//reactMixin(Login.prototype, React.addons.LinkedStateMixin);
export default Logout;