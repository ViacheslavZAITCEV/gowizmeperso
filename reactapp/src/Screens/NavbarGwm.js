import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import '../App.css';

import {
  Col, 
  Navbar,  Input, 
  // Button,
} from 'reactstrap';

import { Button } from 'antd';

import { connect } from 'react-redux';

import Perso from './components/Perso';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// const { Search } = Input;



function NavbarGwm(props) {

  // const [evenement, setEvenement] = useState(false);
  // const [planing, setPlaning] = useState(false);
  // const [amis, setAmis] = useState(false);
  const [find, setFind] = useState(false);
  const [search, setSearch] = useState('');

  const [toMainPage, setToMainPage] = useState(false);
  const [toPlaning, setToPlaning] = useState(false);
  const [toAmis, setToAmis] = useState(false);
  const [toProfil, setToProfil] = useState(false);


  // const onSearch = value => console.log(value);

  if (find){
    console.log('on va chercher qqch avec search=', search);
    setTimeout( ()=> setFind(false), 100);
    setTimeout( ()=> setSearch(''), 300);
    return(
      <Redirect to='/' />
    )
  } else if (toMainPage){
    setTimeout( ()=> setToMainPage(false), 100);
    return(
      <Redirect to='/' />
    )
  } else if (toPlaning){
    setTimeout( ()=> setToPlaning(false), 300);
    return(
      <Redirect to='/' />
    )
  } else if (toAmis){
    setTimeout( ()=> setToAmis(false), 300);
    return(
      <Redirect to='/' />
    )
  } else {

  

    return (
      <Navbar className='navbargowizme'>

              <Col xs='3' md="2" >
                  <Button 
                    onClick={ ()=> setToMainPage(true) } 
                    className='navBarBtn'
                    >
                    évènements
                  </Button>
              </Col>
              <Col xs='4' md="3" className='NavBarInput'>
                <Input 
                type='text' 
                onChange={ (e)=> setSearch(e.target.value)} 
                className="navbarSearhInput" 
                placeholder='chercher' 
                value={search}
                />
                <Button 
                onClick={ ()=> setFind(true) } 
                className="navBarBtn" 
                >
                  <FontAwesomeIcon icon={faSearch}
                  style={{position: 'relative' }}
                  color='white'
                  />
                </Button>


              </Col>
              {/* <Col xs="8" className='navBarAvatarCol'> */}
                <Perso/>
              {/* </Col> */}

      </Navbar>
    );
  }
}



function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: 'saveToken', token });
    },
    onAddIdEvent: function (idEvent) {
      dispatch({ type: 'addIdEvent', idEvent: idEvent });
    },
    addUser: function (user) {
      dispatch({ type: 'user', user: user });
    },
  }
}

function mapStateToProps(state) {
  return {
    user : state.userReducer,
    currentCity: state.currentCityReducer
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarGwm);
