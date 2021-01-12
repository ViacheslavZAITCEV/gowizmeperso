import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
} from 'antd';

import { Form, Label } from "reactstrap";



import {Container, Row, Col} from 'reactstrap'

import { connect } from 'react-redux';

import NavbarGwm from './NavbarGwm'
import { Redirect } from "react-router-dom";


function MainPage (props){


  const [user, setUser] = useState(props.user);
  const [loginSetup, setLoginSetup] =useState('');
  const [passSetup, setPassSetup] =useState('');
  const [confpass, setConfPass] =useState('');
  const [nom, setNom] =useState('');
  const [prenom, setPrenom] =useState('');
  const [ville, setVille] =useState('');
  const [errSignUp, setErrSignUp] = useState('');
  

    if (user === undefined) {
      console.log('NewUserPage, redirect to MainPage')
      return (
        <Redirect to='/' />
      )
    }else{


    const inscrire = async ()=>{
      setErrSignUp('');
      console.log('inscription. Login=', loginSetup)
      if (passSetup != confpass){
        setErrSignUp('passwords ne sont pas identiques!');
      }else{
        var requet = {
          method : 'POST', 
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body : `email=${loginSetup}&pass=${passSetup}&nom=${nom}&prenom=${prenom}&ville=${ville}`
        };
        try {
          var resultRAW = await fetch(`/users/sign-up`, requet);
          var result = await resultRAW.json();
          if(result.succes){
            console.log('login with email = ', result.user.email);
            props.setUser(result.user);
            setUser(result.user);
          }else{
            setErrSignUp(result.error);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    return (
    <Container>
      <Col>
          <NavbarGwm/>
      </Col>

      <Row className='cardsRow'>
        <Form>

            <Input type='email' onChange={ (e)=> setLoginSetup(e.target.value)} className="NavBarInput" placeholder='votre email' value={loginSetup}/>
            <Input type='password' onChange={ (e)=> setPassSetup(e.target.value)} className="NavBarInput" placeholder='votre password' value = {passSetup} />
            <Input type='password' onChange={ (e)=> setConfPass(e.target.value)} className="NavBarInput" placeholder='confirm password' value = {confpass} />
            <Input type='text' onChange={ (e)=> setNom(e.target.value)} className="NavBarInput" placeholder='votre nom' value = {nom} />
            <Input type='text' onChange={ (e)=> setPrenom(e.target.value)} className="NavBarInput" placeholder='votre prénom' value = {prenom} />
            <Input type='text' onChange={ (e)=> setVille(e.target.value)} className="NavBarInput" placeholder='votre ville de recherche' value = {ville} />
            <Button onClick={ ()=> inscrire() } className="Login-input" type="primary">Sign-up</Button>

        </Form>

        <Label>{errSignUp}</Label> 

      </Row>

    </Container>
    )
  }
}












//
// **************************************************
//
//


function mapDispatchToProps(dispatch) {
    return {
      addToken: function (token) {
        dispatch({ type: 'saveToken', token });
      },
      setUser: function (user) {
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
  )(MainPage);