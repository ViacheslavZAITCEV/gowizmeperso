import React, { useEffect, useState } from "react";
import {Redirect} from 'react-router-dom'
import {
  Button,  Label, Input, 
  Badge,
} from 'reactstrap';

import {Container, Row, Col} from 'reactstrap'


import { connect } from 'react-redux';

import NavbarGwm from './NavbarGwm'


function Profil (props){

  
  console.log('Profil Page');
  
  const [user, setUser] = useState(props.user);

  const [nomChange, setNomChange] = useState(false);
  const [newNom, setNewNom] = useState(props.user.nom);
  
  const [prenomChange, setPrenomChange] = useState(false);
  const [newPrenom, setNewPrenom] = useState(props.user.prenom);
  
  const [villeChange, setVilleChange] = useState(false);
  const [newVille, setNewVille] = useState(props.user.ville);
  
  const [avatarChange, setAvatarChange] = useState(false);
  const [avatar, setAvatar] = useState(props.user.avatar);
  
  const [badges, setBadges] = useState([]);
  const [prefsUser, setPrefsUser] = useState([]);







  useEffect(()=>{
    const updateState = ()=>{
        if (user.preferences !== undefined && user.preferences.length > 0){
          setPrefsUser(props.user.preferences[0]);
          var prefs = props.user.preferences[0];
          var badgesTemp = [];
          console.log('type of prefs=', typeof prefs);

          var keys = Object.getOwnPropertyNames(prefs);
          var compt=0;
          keys.forEach( key => {
            if( typeof key === 'string' && key !== '_id' ){
              badgesTemp.push(
                <Col xs="12" sm="6" md="4" lg="2" xl="1" >
                <Badge
                  
                  key={compt++}
                  pill
                  className= {
                    (prefs[key] === true ) 
                    ?
                    (key === 'cinema' || key === 'theatre' || key === 'exposition' || key === 'concert') ? 'badgeActiveType' : 'badgeActiveCategory' 
                    :
                    (key === 'cinema' || key === 'theatre' || key === 'exposition' || key === 'concert') ? 'badgeInactiveType' : 'badgeInactiveCategory'
                  }
                  onClick={ ()=> changePrefs(key)}
                  >
                {key}
                </Badge>
                </Col>
              )
            }
          })
          setBadges(badgesTemp);


        };
    }
    updateState();
  },[prefsUser]);








  function changePrefs(pref){
    var pfs = props.user.preferences;
    // console.log('ProfilPage.changePrefs()  pfs=', pfs);
    // console.log('ProfilPage.changePrefs()  pref=', pref);
    pfs[0][pref] = ! pfs[0][pref];
    console.log('ProfilPage.changePrefs()  pfs=', pfs);
    var newUser = props.user;
    newUser.preferences = pfs;
    setPrefsUser(pfs);
    setUser(newUser)
    updateBD(`/users/updatePrefs`, 'preferences', JSON.stringify(pfs));
  }

  
  async function updateBD(route, key, value){
    console.log('value=', value)
    var requet = {
      method : 'POST', 
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body : `token=${user.token}&${key}=${value}`
    };
    console.log('requet=', requet)
    console.log('route=', route)
    try {
      // `/users/update`
      var resultRAW = await fetch(route, requet);
      var result = await resultRAW.json();
      if(result.response){
        console.log('Profil.updateBD(), resBD=', result);
      }else{
        console.log('ERROR! Profil.updateBD(), resBD.error=', result.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (props.user === undefined || user.avatar === undefined){
    console.log('Profil Page, user=', props.user)
  return(
    <Redirect to='/newUser' />
   );
 }else{



  
  
  function displayNom(){
    console.log('Profil.displayNom(), nomChange=', nomChange)
    if (!nomChange){
      return(
        <Row className='persoLine'>
          Nom: {user.nom ? user.nom : '...'} 
          <Label
            className='button2'
            alt='changer le nom' 
            onClick={ ()=> {console.log('click nom'); setNomChange(true)}}
          >
            changer
          </Label>
        </Row>
      )
    }else{

      function changeNom(){
        setNomChange(false);
        var newUser = user;
        updateBD(`/users/update`, 'nom', newNom);
        newUser.nom = newNom;
        setUser(newUser);
        console.log('Profil.displayNom(), newUser=', newUser)
        props.setUser(newUser);
      }

      return(
        <Row className='persoLine'>
          Nom <Input onSubmit={()=> changeNom() } type='text' onChange={ (e)=> {console.log('e=', e); setNewNom(e.target.value)}} value={newNom} placeholder='votre nom' className='PersoInput' />
          <Label className='button2' onClick={ ()=> changeNom()
          }> valider </Label>
        </Row>
      )
    }
  }
  
  
  function displayPrenom(){
    console.log('Profil.displayPrenom(), prenomChange=', prenomChange)
    if (!prenomChange){
      return(
        <Row className='persoLine'>
          Prenom: {user.prenom ? user.prenom : '...'} 
          <Label
            className='button2'
            alt='changer le prenom' 
            onClick={ ()=> {console.log('click prenom'); setPrenomChange(true)}}
          >
            changer
          </Label>
        </Row>
      )
    }else{
      return(
        <Row className='persoLine'>
          Nom <Input type='text' onChange={ (e)=> setNewPrenom(e.target.value)} value={newPrenom} placeholder='votre nom' className='PersoInput' />
          <Label className='button2' onClick={ ()=> {
            setPrenomChange(false);
            var newUser = user;
            updateBD(`/users/update`, 'prenom', newPrenom);
            newUser.prenom = newPrenom;
            setUser(newUser);
            console.log('Profil.displayNom(), newUser=', newUser)
            props.setUser(newUser);
          }
          }> valider </Label>
        </Row>
      )
    }
  }
  
  
  
  function displayVille(){
    console.log('Profil.displayVille(), villeChange=',  villeChange)
    if (!villeChange){
      return(
        <Row className='persoLine'>
          Ville: {user.ville ? user.ville : '...'} 
          <Label
            className='button2'
            alt='changer la ville' 
            onClick={ ()=> {console.log('click ville'); setVilleChange(true)}}
          >
            changer
          </Label>
        </Row>
      )
    }else{
      return(
        <Row className='persoLine'>
          Ville : <Input type='text' onChange={ (e)=> setNewVille(e.target.value)} value={newVille} placeholder='ville de recherche' className='PersoInput' />
          <Label className='button2' onClick={ ()=> {
            setVilleChange(false);
            var newUser = user;
            updateBD(`/users/update`, 'ville', newVille);
            newUser.ville = newVille;
            setUser(newUser);
            console.log('Profil.displayNom(), newUser=', newUser)
            props.setUser(newUser);
          }
          }> valider </Label>
        </Row>
      )
    }
  }
  
  

  function displayAvatar(){
    console.log('Profil.changeAvatar(), avatar=', avatar)
    if (!avatarChange){
      return(
        <Row >
        <img
          className='persoAvatar'
          alt={user.nom}
          src={avatar}
          onClick={ ()=> {console.log('click avatar'); setAvatarChange(true)}}
        />
        </Row>
      )
    }else{
      const verifAvatar = ()=>{
        if(avatar !== undefined){
          return true;
        }
        return false;
      }

      return(
        <Row className='persoAvatar'>
          New avatar : <Input type='text' onChange={ (e)=> setAvatar(e.target.value)} value={avatar} placeholder='new URL avatar' className='PersoInput' />
          <Label className='button2' onClick={ ()=> {
            if (verifAvatar()){

              setAvatarChange(false);
              var newUser = user;
              updateBD(`/users/update`, 'avatar', avatar);
              newUser.avatar = avatar;
              setUser(newUser);
              console.log('Profil.displayNom(), newUser=', newUser)
              props.setUser(newUser);
            }
          }
          }> valider </Label>
        </Row>
      )
    }
  }







  function deconnecter (){
    console.log('Profil page, deconnecter()');
    var newUser={};
    setUser(newUser);
    props.setUser(newUser);
  }




    return (
    <Container>
        <NavbarGwm/>
        {displayAvatar()}
        {displayNom()}
        {displayPrenom()}
        {displayVille()}
        <Row> Préférences: </Row>
        <Row> 
            {badges}
        </Row>
        <Row 
          className='button1'
          onClick={ ()=> deconnecter()}
        >
          Deconecter        
        </Row>
      {/* </Col> */}

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
  )(Profil);
