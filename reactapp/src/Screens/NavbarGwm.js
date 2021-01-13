import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom'
import '../App.css';

import {
  Navbar, Label, Input, 
  Container, Row, Col,
} from 'reactstrap';

import {Button } from 'antd';

import { connect } from 'react-redux';

import Perso from './components/Perso';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const { Search } = Input;



function NavbarGwm(props) {

  const [evenement, setEvenement] = useState(false);
  const [planing, setPlaning] = useState(false);
  const [amis, setAmis] = useState(false);
  const [find, setFind] = useState(false);
  const [search, setSearch] = useState('');

  const [login, setLogin] =useState('');
  const [pass, setPass] =useState('');
  const [confpass, setConfPass] =useState('');
  const [inscription, setInscription] =useState(false);
  const [errSignIn, setErrSignIn] = useState('');
  const [toProfil, setToProfil] = useState(false);


  const onSearch = value => console.log(value);

  if (evenement){
    return(
      <Redirect to='/' />
    )
  } else   if (planing){
    return(
      <Redirect to='/' />
    )
  } else   if (amis){
    return(
      <Redirect to='/' />
    )
  } else  if (find){
    console.log('on va chercher qqch avec search=', search);
    setTimeout( ()=> setFind(false), 300);
    setTimeout( ()=> setSearch(''), 300);
    return(
      <Redirect to='/' />
    )
  } else  if (toProfil){
    setTimeout( ()=> setToProfil(false), 300);
    return(
      <Redirect to='Profil' />
    )
  } else{

  

    return (
      <Navbar className='navbargowizme'>

              <Col xs='3' md="2" >
                  <Link 
                    to='/'
                    className='navBarBtn'
                    >
                    évènements
                  </Link>
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
                className="navbarSearhBtn" 
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
