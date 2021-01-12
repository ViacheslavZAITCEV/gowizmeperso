import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom'
import '../App.css';
import {
  Navbar, Label,
} from 'reactstrap';



import {Container, Row, Col} from 'reactstrap'



import { connect } from 'react-redux';


import Perso from './components/Perso';


function NavbarGwm(props) {

  const [user, setUser] = useState(props.user);
  const [token, setToken] = useState(props.token);
  const [login, setLogin] =useState('');
  const [pass, setPass] =useState('');
  const [confpass, setConfPass] =useState('');
  const [inscription, setInscription] =useState(false);
  const [errSignIn, setErrSignIn] = useState('');
  const [toProfil, setToProfil] = useState(false);

  if (toProfil){
    return(
      <Redirect to='Profil' />
    )
  }else{

  

    return (
      <Container >
          <Navbar color="light" bg='#000000' light expand="md">

            <Row className='navbargowizme'>
                  <Link 
                    to='/'
                    className='navBarBtn'
                    >
                    évènements
                  </Link>

                  
                  <Link 
                    to='/'
                    className='navBarBtn'
                  >
                    planning
                  </Link>


                  <Link 
                    to='/'
                    className='navBarBtn'
                  >
                    mes amis
                  </Link>


                  <Link 
                    to='/'
                    className='navBarBtn'
                  >
                    find
                  </Link>


                  <Link 
                    // onClick={ ()=> { setToProfil(true) }}
                    to='Profil'
                    className='navBarBtn'
                  >
                    profil
                  </Link>

                  <Perso/>

            </Row>
          </Navbar>
      </Container>
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
    token: state.tokenReducer,
    user : state.userReducer,
    currentCity: state.currentCityReducer
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarGwm);
