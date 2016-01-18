import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import AddCharacter from './components/AddCharacter';
import Character from './components/Character';
import CharacterList from './components/CharacterList';
import Stats from './components/Stats';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Logout from './components/Logout';
import UserRegister from './components/UserRegister';
import Forget from './components/Forget';
import ResetPassword from './components/ResetPassword';
import Account from './components/Account'

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/home' component={Home} />
    <Route path='/login' component={Login} />
    <Route path='/logout' component={Logout} />
    <Route path='/forget' component={Forget} />
    <Route path='/reset' component={ResetPassword} />
    <Route path='/add' component={AddCharacter} />
    <Route path='/champion/:id' component={Character} />
    <Route path='/shame' component={CharacterList} />
    <Route path='/stats' component={Stats} />
    <Route path='/notfound' component={NotFound} />
    <Route path='/register' component={UserRegister} />
    <Route path='/account' component={Account} /> 
    <Route path=':category' component={CharacterList}> 

      {/*<Route path=':race' component={CharacterList}>
        <Route path=':bloodline' component={CharacterList} />
      turns payload to { category: 'female', race: 'gallente', bloodline: 'intaki' } 
      </Route>*/}
    </Route>
  </Route>
);