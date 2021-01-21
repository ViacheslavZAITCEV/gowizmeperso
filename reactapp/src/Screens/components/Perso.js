import React, { useState } from 'react';
import { Redirect} from 'react-router-dom'
import '../../App.css';
import {Button} from 'antd';


import { 
  Label, Input,  
  Col
} from 'reactstrap';



import { connect } from 'react-redux';
import Form from 'antd/lib/form/Form';

function Perso(props) {

  const [user, setUser] = useState(props.user);
  const [login, setLogin] =useState('');
  const [pass, setPass] =useState('');
  const [errSignIn, setErrSignIn] = useState('');
  const [clickAvatar, setClickAvatar] = useState(false);
  const [toMainPage, setToMainPage] = useState(false);
  const [toPlaning, setToPlaning] = useState(false);
  const [toAmis, setToAmis] = useState(false);
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
        body : `email=${login}&password=${pass}`
      };
      try{
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
          // setToMainPage(true);
        }else{
          setErrSignIn (result.error);
        }
      }catch (error){
        console.log ('Component Perso, loginFE.error=', error);
      }
    }
  }


  if (clickAvatar){
    console.log('click avatar');
    setTimeout( ()=> setClickAvatar(false), 100);
    return(
       <Redirect to='/Profil' />
    );
  }else if (signUp){
    console.log('click sign-up');
    setTimeout( ()=> setSignUp(false), 100);
    return(
       <Redirect to='/newUser' />
    );
  } else if (toMainPage){
    setTimeout( ()=> setToMainPage(false), 100);
    return(
      <Redirect to='/' />
    )
  } else if (toPlaning){
    setTimeout( ()=> setToPlaning(false), 100);
    return(
      <Redirect to='/' />
    )
  } else if (toAmis){
    setTimeout( ()=> setToAmis(false), 100);
    return(
      <Redirect to='/Amis' />
    )
  } else {


    console.log('Perso, user=', user);
    // console.log('inscription=', inscription);

    if ( user.avatar === undefined){
        return(
          <Form>
          <Col xs='6'  md='5'>
            <div  className="Sign">
                <Input 
                type='email' 
                onChange={ (e)=> setLogin(e.target.value)} 
                className="NavBarInput" 
                placeholder='votre email' 
                value={login}/>
                <Button 
                type='submit'
                onClick={ ()=> loginFE() } 
                className="navBarBtn" 
                >
                  connexion
                </Button>
            </div>
            <div  className="Sign">
                <Input 
                type='password' 
                onChange={ (e)=> setPass(e.target.value)} 
                className="NavBarInput" 
                placeholder='votre mot de passe' 
                value = {pass} 
                />
              <Button 
              onClick={ ()=> setSignUp(true) }  
              className='navBarBtn' 
              >
                Créer un compte
              </Button>
            </div>
            <div  className="Sign">
                <Label style={{color : '#EFB509'}}>{errSignIn}</Label> 
            </div>
          </Col>
          </Form>
    )
    }else{
        // console.log('avatar')
        return (
          <Col xs='6'  md='6' className='navbarRow'>
              <Col md="2">
              <Button
                onClick={ ()=> setToPlaning(true) } 
                className='navBarBtn'
              >
                planning
              </Button>
              </Col>
              <Col md="2" >
                 <Button
                    onClick={ ()=> setToAmis(true) } 
                    className='navBarBtn'
                  >
                    amis
                  </Button>

              </Col>

              <Col md='2' className='navBarAvatarCol'>
                <img 
                  src={user.avatar} 
                  className='navBarAvatar'
                  onClick={ ()=> setClickAvatar(true)}
                  />
              </Col>

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
