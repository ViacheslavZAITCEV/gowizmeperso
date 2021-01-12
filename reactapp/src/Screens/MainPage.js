import React, { useEffect, useState } from "react";

import {Container, Row, Col} from 'reactstrap'

import { connect } from 'react-redux';

import NavbarGwm from './NavbarGwm'
import CardEvenement from "./components/CardEvenement";

function MainPage (props){

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(props.token);

    const [cinema,setCinema] = useState([]);
    const [theatre,setTheatre] = useState([]);
    const [expo,setExpo] = useState([]);
    const [concert,setConcert] = useState([]);
    

    useEffect( ()=> {
        async function chargeListEvent(){
            var requet = {
                method : 'POST', 
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body : `test`
            };
            console.log('requet=',requet);
            var resultRAW = await fetch(`/pullEvents`, requet);
            console.log('resultRAW=',resultRAW);
            var body = await resultRAW.json();
            console.log('body=',body);
            setCardsEvents(body);
        };
        function setCardsEvents(body){
          if (body){
            //  var cardsEvents = body.map( (eventMap, i)=>{
            var cinemaCards = [];
            var theatreCards = [];
            var concertCards = [];
            var expoCards = [];
            for (let i=0; i < body.length; i++){
              var eventMap = body[i];
                // console.log('i=', i, '  eventMap=', eventMap);
                if (eventMap.type === 'film'){
                  cinemaCards.push(
                    <Col xs="12" sm="6" md="4" lg="2" xl="1" >
                      <CardEvenement
                        event={eventMap}
                        item={i}   
                        onClick
                      >
                      </CardEvenement>
                    </Col>
                  )
                }else if (eventMap.type === 'théâtre'){
                  theatreCards.push(
                    <Col xs="12" sm="6" md="4" lg="2" xl="1" >
                      <CardEvenement
                        event={eventMap}
                        item={i}   
                      >
                      </CardEvenement>
                    </Col>
                  )
                }else if (eventMap.type === 'exposition'){
                  expoCards.push(
                    <Col xs="12" sm="6" md="4" lg="2" xl="1" >
                      <CardEvenement
                        event={eventMap}
                        item={i}   
                      >
                      </CardEvenement>
                    </Col>
                  )
                }else if (eventMap.type === 'concert'){
                  concertCards.push(
                    <Col xs="12" sm="6" md="4" lg="2" xl="1" >
                      <CardEvenement
                        event={eventMap}
                        item={i}   
                      >
                      </CardEvenement>
                    </Col>
                  )
                };
            }
            // console.log('cardsEvents=', cardsEvents)  
            setCinema(cinemaCards);
            setTheatre(theatreCards);
            setConcert(concertCards);
            setExpo(expoCards);
          }
        };
        chargeListEvent();
    },[])





    return (
    <Container>
      <Col>
          <NavbarGwm/>
      </Col>

      <Row className='cardsRow' style={{ background:'#3C6382'}}>
        <Col
            style={{
              fontSize: 22,
              margin: 7,
              fontWeight: 'bold'
            }}>
            CINEMA
        </Col>
      </Row>
      <Row className='cardsRow' style={{ background:'#3C6382'}}>
          {cinema}
      </Row>
      <Row className='cardsEspaceRow'></Row>
      <Row className='cardsRow' style={{ background:'#E55039'}}>
        <div
            style={{
              fontSize: 22,
              margin: 7,
              fontWeight: 'bold'
            }}>
            THEATRE
        </div>
      </Row>
      <Row className='cardsRow' style={{ background:'#E55039'}}>
          {theatre}
      </Row>
      <Row className='cardsEspaceRow'></Row>
      <Row className='cardsRow' style={{ background:'#F6E58D'}}>
        <div
            style={{
              fontSize: 22,
              margin: 7,
              fontWeight: 'bold'
            }}>
            EXPOSITIONS
        </div>
      </Row>
      <Row className='cardsRow' style={{ background:'#F6E58D'}}>
          {expo}
      </Row>
      <Row className='cardsEspaceRow'></Row>
      <Row className='cardsRow'  style={{ background:'#3C6382'}}>
        <div
            style={{
              fontSize: 22,
              margin: 7,
              fontWeight: 'bold',
              background:'green'
            }}>
            CONCERTS
        </div>
      </Row>
      <Row className='cardsRow' style={{ background:'#3C6382'}}>
          {concert}
      </Row>

    </Container>
    )
}












//
// **************************************************
//
//


function mapDispatchToProps(dispatch) {
    return {
      onAddIdEvent: function (idEvent) {
        dispatch({ type: 'addIdEvent', idEvent: idEvent });
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
