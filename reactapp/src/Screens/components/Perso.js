import React, { useState } from 'react';
import {Redirect} from 'react-router-dom'
import '../../App.css';
import {
  Button,  Label, Input,

} from 'reactstrap';



import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



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
  }else{


    console.log('Perso, user=', user);
    // console.log('inscription=', inscription);

    if ( user.avatar === undefined){
        return(
        // <Form >
            <Row className="Sign">/
            <Col>
                <Input type='email' onChange={ (e)=> setLogin(e.target.value)} className="NavBarInput" placeholder='votre email' value={login}/>
                <Input type='password' onChange={ (e)=> setPass(e.target.value)} className="NavBarInput" placeholder='votre mot de passe' value = {pass} />
                <Label style={{color : 'white'}}>{errSignIn}</Label> 
            </Col>
            <Col>
                <Button onClick={ ()=> loginFE() } className="Login-input" type="primary">connexion</Button>
                <Button onClick={ ()=> setSignUp(true) }  className='Login-input' >Créer un compte</Button>

            </Col>
            </Row>
        // </Form>
    )
    }else{
        console.log('avatar')
        return (
            <Container>
              {/* <Col className='flex-col navBarName'>
                Bonjour
                {user.prenom}
              </Col> */}
              <Col>
                <img 
                  src={user.avatar} 
                  className='navBarAvatar'
                  onClick={ ()=> setClickAvatar(true)}
                />
              </Col>
            </Container>

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
    token: state.tokenReducer,
    user : state.userReducer,
    currentCity: state.currentCityReducer
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Perso);
