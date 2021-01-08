import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';



import MainPage from './Screens/MainPage';
import NewUser from './Screens/NewUser';
import Profil from './Screens/Profil';

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';


import tokenReducer from './reducers/token.reducer';
import idEventReducer from './reducers/idEvent.reducer';
import idSortieReducer from './reducers/idSortie.reducer';
import newSortieReducer from './reducers/newSortie.reducer';
import idUserReducer from './reducers/idUser.reducer';
import userReducer from './reducers/user.reduceur';

const store = createStore(combineReducers({tokenReducer,idEventReducer,idSortieReducer,newSortieReducer,idUserReducer, userReducer}));


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route component={MainPage} path="/" exact />
          <Route component={NewUser} path="/newUser" exact />
          <Route component={Profil} path="/Profil" exact />
          {/*
          <Route component={SignInScreen} path="/SignInScreen" exact />
          <Route component={SignUpScreen} path="/SignUpScreen" exact /> */}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
