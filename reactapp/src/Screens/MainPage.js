import React, { useEffect, useState } from "react";
import {
  Card,
} from 'antd';


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
                    <div key={i} >
                      <CardEvenement
                        event={eventMap}
                        item={i}   
                      >
                      </CardEvenement>
                    </div>
                  )
                }else if (eventMap.type === 'théâtre'){
                  theatreCards.push(
                    <div key={i} >
                      <CardEvenement
                        event={eventMap}
                        item={i}   
                      >
                      </CardEvenement>
                    </div>
                  )
                }else if (eventMap.type === 'exposition'){
                  expoCards.push(
                    <div key={i} >
                      <CardEvenement
                        event={eventMap}
                        item={i}   
                      >
                      </CardEvenement>
                    </div>
                  )
                }else if (eventMap.type === 'concert'){
                  concertCards.push(
                    <div key={i} >
                      <CardEvenement
                        event={eventMap}
                        item={i}   
                      >
                      </CardEvenement>
                    </div>
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

      {/* {console.log('cinema=', cinema)} */}
      <Row className='cardsRow'>
          {cinema}
      </Row>
      <Row className='cardsRow'>
          {theatre}
      </Row>
      <Row className='cardsRow'>
          {concert}
      </Row>
      <Row className='cardsRow'>
          {expo}
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
