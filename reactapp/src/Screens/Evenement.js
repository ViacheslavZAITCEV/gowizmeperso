import React, { useEffect, useState } from "react";

import {Container, Row, Col} from 'reactstrap'

import { connect } from 'react-redux';

import NavbarGwm from './NavbarGwm'
import CardEvenement from "./components/CardEvenement";

function Evenement (props){

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(props.token);


    

    // useEffect( ()=> {
    //       }
    // },[])





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
            Evenement
        </Col>
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
        newEvent: function (evenement) {
            dispatch({ type: 'evenement', evenement: evenement });
          },
    }
  }
  
  function mapStateToProps(state) {
    return {
      event: state.evenement,
      user : state.userReducer,
      currentCity: state.currentCityReducer
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Evenement);
