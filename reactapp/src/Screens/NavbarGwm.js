import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom'
import '../App.css';
import {
  Navbar, Label, 
} from 'reactstrap';
import {Button} from 'antd';


import {Container, Row, Col} from 'reactstrap'



import { connect } from 'react-redux';


import Perso from './components/Perso';


function NavbarGwm(props) {

  const [evenement, setEvenement] = useState(false);
  const [planing, setPlaning] = useState(false);
  const [amis, setAmis] = useState(false);
  const [find, setFind] = useState(false);

  const [login, setLogin] =useState('');
  const [pass, setPass] =useState('');
  const [confpass, setConfPass] =useState('');
  const [inscription, setInscription] =useState(false);
  const [errSignIn, setErrSignIn] = useState('');
  const [toProfil, setToProfil] = useState(false);

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
    return(
      <Redirect to='/' />
    )
  } else  if (toProfil){
    return(
      <Redirect to='Profil' />
    )
  } else{

  

    return (
      <Navbar color="light" bg='#000000' light expand="md">
          <Container >

            <Row className='navbargowizme'>
              <Col xs="2" sm="1" md="1" lg="1" xl="1">
                  <Button 
                    onClick={ ()=> setEvenement(true) }
                    className='navBarBtn'
                    >
                    évènements
                  </Button>
              </Col>
              <Col xs="2" sm="1" md="1" lg="1" xl="1">
                  <Button 
                    onClick={ ()=> setPlaning(true) }
                    className='navBarBtn'
                  >
                    planning
                  </Button>
              </Col>
              <Col xs="2" sm="1" md="1" lg="1" xl="1">
                 <Button 
                    onClick={ ()=> setAmis(true) }
                    className='navBarBtn'
                  >
                    amis
                  </Button>

              </Col>
              <Col xs="2" sm="1" md="1" lg="1" xl="1">

                  <Button 
                    onClick={ ()=> setFind(true) }
                    className='navBarBtn'
                  >
                    find
                  </Button>
              </Col>

              <Col  xs="4" >
                <Perso/>
              </Col>

            </Row>
        </Container>
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
