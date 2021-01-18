import React, { useEffect, useState } from "react";

import {Container, Row, Col} from 'reactstrap'

import { connect } from 'react-redux';

import NavbarGwm from './NavbarGwm'
import CardEvenement from "./components/CardEvenement";


function MainPage (props){

    // const [user, setUser] = useState(null);

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

                      <CardEvenement
                        key={i}
                        event={eventMap}
                        // description={eventMap.description}
                        item={i}
                        sizeCard={{ width: 240, height: 440 }}
                        sizeImg={{ width: 240, height: 300 }}
                        styleHeartFond={{position: 'relative', top: -420, left: 200, width: 20, height: 20 }}
                        styleHeart={{position: 'relative', top: -422, left: 182 }}
                        >
                      </CardEvenement>

                  )
                }else if (eventMap.type === 'théâtre'){
                  theatreCards.push(

                      <CardEvenement
                        key={i}
                        event={eventMap}
                        item={i}   
                        >
                      </CardEvenement>
                  )
                }else if (eventMap.type === 'exposition'){
                  expoCards.push(
                      <CardEvenement
                        event={eventMap}
                        key={i}
                        item={i}   
                        >
                      </CardEvenement>
                  )
                }else if (eventMap.type === 'concert'){
                  concertCards.push(
                      <CardEvenement
                        event={eventMap}
                        key={i}
                        item={i}   
                        >
                      </CardEvenement>
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
      <div>
    <Container>
      <NavbarGwm/>

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
              fontWeight: 'bold'
            }}>
            CONCERTS
        </div>
      </Row>
      <Row className='cardsRow' style={{ background:'#3C6382'}}>
          {concert}
      </Row>

    </Container>
    </div>
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
      user : state.userReducer,
      currentCity: state.currentCityReducer
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainPage);
