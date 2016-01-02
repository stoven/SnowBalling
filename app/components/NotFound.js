import React from 'react';
import {
  Link
}
from 'react-router';
import {
  first, without, findWhere
}
from 'underscore';


class NotFound extends React.Component {
  constructor(props) {
    super(props);
    //this.state = NotFoundStore.getState();
  }

  componentDidMount() {}

  componentWillUnmount() {
  }


  render() {
    return (
      <div>
        <h3 className='text-center'>Opps... Something is wrong...</h3>
        <div id='error'>
          <link rel="stylesheet" href="/css/error.css"/>
          <div id='errorAnimation'>
            <div className = 'dino'></div>
            <div className = 'eye'></div>
            <div className = 'mouth'></div>
            <div className = 'ground'></div>
            <div className = 'comets'></div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;