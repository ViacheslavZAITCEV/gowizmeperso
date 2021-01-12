import React, { useState } from 'react';
import {Redirect} from 'react-router-dom'
import '../../App.css';
import {Button} from 'antd';


import { 
  Label, Input,
  Container, Row, Col
} from 'reactstrap';



import { connect } from 'react-redux';

function Perso(props) {

  const [user, setUser] = useState(props.user);
  const [login, setLogin] =useState('');
  const [pass, setPass] =useState('');
  const [errSignIn, setErrSignIn] = useState('');
  const [clickAvatar, setClickAvatar] = useState(false);
  const [toMainPage, setToMainPage] = useState(false);
  const [signUp, setSignUp] = useState(false);
  


  const loginFE = async ()=>{
    setErrSignIn('');
    console.log('Process LoginFE. Login=', login);
    if(login === '' || pass === ''){
        setErrSignIn ('le/les champs sont vides...');
    }else{
      var requet = {
        method : 'POST', 
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body : `email=${login}&pass=${pass}`
      };
      var resultRAW = await fetch(`/users/sign-in`, requet);
      var result = await resultRAW.json();
      if(result.response){
        console.log('login with email = ', login);
        var user = {
          token : result.token,
          nom : result.nom,
          prenom :  result.prenom,
          avatar : result.avatar,
          ville  : result.ville,
          preferences  : result.preferences,
          groupes  : result.groupes,
          favoris  : result.favoris,
          sorties  : result.sorties,
          amis  : result.amis,
          confidentialite  : result.confidentialite,
          age : result.age,
        };
        props.setUser(user);
        setUser(user);
        setToMainPage(true);
      }else{
        setErrSignIn (result.error);
      }
    }
  }


  if (clickAvatar){
    console.log('click avatar');
    // setClickAvatar(false)
    return(
       <Redirect to='/Profil' />
    );
  }else if (signUp){
    console.log('click sign-up');
    setSignUp(false)
    return(
       <Redirect to='/newUser' />
    );
  }else if (toMainPage){
    console.log('click sign-in');
    setToMainPage(false)
    return(
       <Redirect to='/' />
    );
  }else{


    console.log('Perso, user=', user);
    // console.log('inscription=', inscription);

    if ( user.avatar === undefined){
        return(
          <div className="Sign">/
            <div>
                <Input type='email' onChange={ (e)=> setLogin(e.target.value)} className="NavBarInput" placeholder='votre email' value={login}/>
                <Input type='password' onChange={ (e)=> setPass(e.target.value)} className="NavBarInput" placeholder='votre mot de passe' value = {pass} />
                <Label style={{color : 'white'}}>{errSignIn}</Label> 
            </div>
            <div >
                <Button onClick={ ()=> loginFE() } className="Login-input" type="primary">connexion</Button>
                <Button onClick={ ()=> setSignUp(true) }  className='Login-input' >Créer un compte</Button>

            </div>
          </div>
    )
    }else{
        console.log('avatar')
        return (
              <Col xs='1' sm='2'>
                <img 
                  src={user.avatar} 
                  className='navBarAvatar'
                  onClick={ ()=> setClickAvatar(true)}
                />
              </Col>

        )
    }
  }

}



function mapDispatchToProps(dispatch) {
  return {
    setUser: function (user) {
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
)(Perso);
