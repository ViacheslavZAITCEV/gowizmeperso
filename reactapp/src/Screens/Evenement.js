import React, { useEffect, useState } from "react";

import { connect } from 'react-redux';

import {Container, Row, Col, } from 'reactstrap'
import { Card } from 'antd';

import NavbarGwm from './NavbarGwm'
import { Redirect } from "react-router-dom";

function Evenement (props){

    const [user, setUser] = useState(props.user);
    const [event, setEvent] = useState(props.event);


    console.log ('Evenement page, props=', props);

    // useEffect( ()=> {
    //       }
    // },[])


    if (props.event === null){
        return(
            <Redirect to='/' />
        )
    }else{
        



        return (
        <Container>
            <NavbarGwm/>

            <Row>
                {console.log('event=', props.event)}
                <Col sm='6'>
                    <Card
                        cover={
                            <img
                            alt={props.event.nom}
                            src={props.event.image}
                            />
                        }
                        style={{
                            height: 500,
                            margin: 17,
                            // display: flex,
                            // flexdirection: row,
                            // alignitems: center,
                            // justifycontent: center,
                        }}>
                        Evenement
                    </Card>
                </Col>
                <Col sm='6'>
                        TextArea
                </Col>
            </Row>
            
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
        newEvent: function (evenement) {
            dispatch({ type: 'evenement', evenement: evenement });
          },
    }
  }
  
  function mapStateToProps(state) {
    return {
      event: state.evenementReducer,
      user : state.userReducer
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Evenement);
