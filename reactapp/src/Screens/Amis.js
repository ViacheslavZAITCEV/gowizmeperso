import React, {  useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { connect } from 'react-redux';

import {
    Container, Row, Col, 
} from 'reactstrap'
import { 
  Card, 
  Carousel,
  Button,
  Tabs,
  Radio ,
  Divider ,
  Badge
} from 'antd';

import NavbarGwm from './NavbarGwm'
import CardEvenement from "./components/CardEvenement";



function Amis (props){

  console.log ('Page Amis. props.user.avatar=', props.user.avatar)

  const [user, setUser] = useState(props.user);
  const [amis, setAmis] = useState([]);
  const [demandesAmis, setDemandesAmis] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');

    
    useEffect( ()=> {
        async function setListeDemanderAmis(){
          var token = props.user.token;
          var amis = JSON.stringify(props.user.amis);
          console.log('Page Amis.setListeDemanderAmis(), props.user=', props.user)
          var requet = {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: `token=${token}&amis=${amis}`
          }
          var res = {response : false};
          try {
                var responseBE = await fetch('/users/findDemandes', requet);
                res = await responseBE.json();
          } catch (error) {
              console.log(error);
              res.error = error;
          }
          if (res.response){
              console.log('Page Amis, res (DemandesAmis)=', res)
              setDemandesAmis(res.listeDemandesAmis)
          }else{
              console.log('error=',res.error);
              setModalVisible(true);
              setError(res.error);
          }

          setListeAmis();

        }

        async function setListeAmis(){
            var token = props.user.token;
            var amis = JSON.stringify(props.user.amis);
            console.log('Page Amis.setListeAmis(), props.user=', props.user)
            var requet = {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${token}&amis=${amis}`
            }
            var res = {response : false};
            try {
                const responseBE = await fetch('/users/getAmis', requet);
                res = await responseBE.json();
            }catch(error) {
                console.log(error);
                res.error = error;
            }
            if (res.response){
                console.log('Page Amis, res (Amis)=', res)
                setAmis(res.listeAmis)
            }else{
                console.log(res.error);
                setModalVisible(true);
                setError(res.error);
            }
        }
    setListeDemanderAmis();
    },[props.user])

    function supprimerDoublons (tab){
      var tabNew = [];
      var tabSet = new Set (tab);
      tabNew = [...tabSet];
      return tabNew;
    }

    function getBadges(prefs){
      var badgesTemp = [];
      var keys = Object.getOwnPropertyNames(prefs);
        var compt=0;
        keys.forEach( key => {
          if( typeof key === 'string' && key !== '_id' ){
            badgesTemp.push(
              
                <Badge
                  
                  key={compt++}
                  // pill
                  className= {
                    (prefs[key] === true ) 
                    ?
                    (key === 'cinema' || key === 'theatre' || key === 'exposition' || key === 'concert') ? 'badgeActiveType' : 'badgeActiveCategory' 
                    :
                    (key === 'cinema' || key === 'theatre' || key === 'exposition' || key === 'concert') ? 'badgeInactiveType' : 'badgeInactiveCategory'
                  }
                  >
                {key}
                </Badge>
            )
          }
        })
      return badgesTemp;
    }

    function getSorties(sorties){
      var sortieRes = [];

      var i=0;
      sorties.forEach( sortie =>{

        sortieRes.push(
          <Carousel autoplay className='carouselEvents'>
            <p>{sortie.nomSortie}</p>
            <CardEvenement
              key={i}
              event={getEvent(sortie.evenementLie, sortie)}
              item={i}
              sizeCard={{ width: 240, height: 440 }}
              sizeImg={{ width: 240, height: 300 }}
              styleHeartFond={{position: 'relative', top: -420, left: 200, width: 20, height: 20 }}
              styleHeart={{position: 'relative', top: -422, left: 182 }}
              >
            </CardEvenement>
            <p>{sortie.date_debut}</p>
            <p>{sortie.nomSortie}</p>
          </Carousel>
        )
        i++ ;
      })
      return sortieRes;
    }

    async function getEvent(event, sortie){
      if (event){
        var requet = {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `id=${event}`
        }
        var responseBE = await fetch ('/pullEventDetaille', requet);
        return responseBE.json();
      }
      return {
        description : '',
        nom : sortie.nomSortie,
        image : sortie.image,
      };
    }



    function getDemadesAmis(amiIn){
      return(
        amiIn.map( (ami, i)=>{
          return(
            <Row>
              <Col xs='6' sm='4' md='3' lg='2' xl='2'>
                {ami.prenom}, {ami.nom}
                <img 
                className='navBarAvatar'
                src={ami.avatar}
                />
              </Col>
              <Col xs='6' sm='5' md='6' lg='8' xl='8'>
                Ville : {ami.ville}
                {getBadges(ami.preferences[0])}
              </Col>
              {/* <Col xs='6' sm='2' md='1' lg='1' xl='1'>
                {getSorties(ami.sorties)}
              </Col> */}
              <Col xs='6' sm='3' md='3' lg='2' xl='2'>
                <Button
                  className='button1'
                  onClick={ ()=> {console.log('click button accepter')}}
                  >
                    accepter
                </Button>
              </Col>
            </Row>
          )
        })
      )
    }
    
    function getAmis(amiIn){
      return(
        amiIn.map( (ami, i)=>{
          return(
            <Row>
              <Col xs='4' sm='4' md='3' lg='2' xl='2'>

                <div className='freindsAvatar' >
                <img 
                className='navBarAvatar'
                src={ami.avatar}
                />
                  {ami.prenom}, {ami.nom}
                </div>
              </Col>
              <Col xs='8' sm='8' md='9' lg='10' xl='10'>
                <div>
                Ville : {ami.ville}
                </div>
                <div>
                {getBadges(ami.preferences[0])}
                </div>
              </Col>
              {/* <Col xs='6' sm='2' md='1' lg='1' xl='1'>
                {getSorties(ami.sorties)}
              </Col> */}
            </Row>
          )
        })
      )
    }
    

  // if ( props.user.avatar ){
  //     return(
  //         <Redirect to='/' />
  //     )
    // }else if ( toPlaning ){
    //   setTimeout( ()=> setToPlaning(false), 100);
    //   return(
    //       <Redirect to='/' />
    //   )
    // }else {
      

        return (
          <div>
        <Container>
          <NavbarGwm/>

          <div className='flexCol'>


          <Col 
            xs='6' sm='3' md='3' lg='2' xl='2'
          >
            <Button
            className='button2'
            onClick={ ()=> {console.log('click button mes amis')}}
            >
              mes amis
            </Button>
            <Button
            className='button2'
            onClick={ ()=> {console.log('click button mes amis')}}
            >
              chercher amis
            </Button>
            <Button
            className='button2'
            onClick={ ()=> {console.log('click button mes amis')}}
            >
              inviter amis
            </Button>
          </Col>
          <Col  xs='6' sm='9' md='9' lg='10' xl='10'
          >
            <Row>
              <h3 className='titreEvent'>
                Mes amis
              </h3>
            </Row>
            <Row>
              <h4 >
                Demandes d'amis:
              </h4>
            </Row>

            {getDemadesAmis(demandesAmis)}
            <Divider />
          </Col>
        </div>

      </Container>
      <Container>

                <h4>
                  Liste de mes amis:
                </h4>
                {getAmis(amis)}
                <Divider />

        </Container>
      </div>
    )
  // }
}












//
// **************************************************
//
//


function mapDispatchToProps(dispatch) {
    return {
        newEvent: function (evenement) {
            dispatch({ type: 'evenement', evenement: evenement });
          },
    }
  }
  
  function mapStateToProps(state) {
    return {
      user : state.userReducer
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Amis);
