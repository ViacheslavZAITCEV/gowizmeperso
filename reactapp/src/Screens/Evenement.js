import React, { useEffect, useState } from "react";

import { connect } from 'react-redux';

import {Container, Row, Col, } from 'reactstrap'
import { Card, Dropdown, Button, Menu  } from 'antd';

import NavbarGwm from './NavbarGwm'
import { Redirect } from "react-router-dom";


import { DownOutlined, UserOutlined } from '@ant-design/icons';

function Evenement (props){

    const [user, setUser] = useState(props.user);
    const [event, setEvent] = useState(props.event);
    const [lieu, setLieu] = useState(null);
    const [date, setDate] = useState(null);
    const [creneau, setCreneau] = useState(null);



    console.log ('Evenement page, props=', props);

    // useEffect( ()=> {
    //       }
    // },[])

    function handleMenuClick(e) {
        // message.info('Click on menu item.');
        console.log('click', e);
    }
      
    const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="1" >
            1st menu item
          </Menu.Item>
          <Menu.Item key="2" >
            2nd menu item
          </Menu.Item>
          <Menu.Item key="3" >
            3rd menu item
          </Menu.Item>
        </Menu>
    );
    if (props.event === null){
        return(
            <Redirect to='/' />
        )
    }else{
        






        return (
        <Container>
            <NavbarGwm/>

                {event.nom}
            <Row>
                {console.log('event=', props.event)}
                <Col xs='12' sm='6'>
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
                        
                    </Card>
                </Col>
                <Col xs='12' sm='6'>
                    <div>
                        {event.description}
                    </div>
                    <Dropdown overlay={menu}>
                        <Button>
                            Button
                        </Button>
                    </Dropdown>

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
