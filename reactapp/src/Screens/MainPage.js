import React, { useEffect, useState } from "react";
import {
  // div,
  ScrollView,
  // p,
  Input,
  Button,
  Badge,
  Card,
} from 'antd';


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { connect } from 'react-redux';

import NavbarGwm from './NavbarGwm'
import CardEvenement from "./components/CardEvenement";

const { Meta } = Card;

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
             var cardsEvents = body.map( (eventMap, i)=>{
                // console.log('i=', i, '  eventMap=', eventMap);
                if (eventMap.type === 'film'){
                  return (
                    <div key={i} >
                      <Card
                        style={{ width: 170, height: 230 }}
                        cover={
                          <img
                          alt={eventMap.nom}
                          src={eventMap.image}
                          />
                        }
                        >
                      </Card>
                    </div>
                  )
                }
              });
            console.log('cardsEvents=', cardsEvents)  
            setCinema(cardsEvents);
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
