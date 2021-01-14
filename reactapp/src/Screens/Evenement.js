import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import { connect } from 'react-redux';

import {
    Container, Row, Col, 
} from 'reactstrap'
import { Card, Menu, Dropdown, Button } from 'antd';

import NavbarGwm from './NavbarGwm'


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

    function majLang(e) {
        // message.info('Click on menu item.');
        console.log('click', e);
    }
      
    function menuLieu() {
        return (
          <Menu>
            <Menu.Item onClick={() => majLang('')}>
              All languages
            </Menu.Item>
            <Menu.Item onClick={() => majLang('language=en&')}>
              English
            </Menu.Item>
            <Menu.Item onClick={() => majLang('language=fr&')}>
              French
            </Menu.Item>
            <Menu.Item onClick={() => majLang('language=ru&')}>
              Russian
            </Menu.Item>
            <Menu.Item onClick={() => majLang('language=de&')}>
              Deutch
            </Menu.Item>
            <Menu.Item onClick={() => majLang('language=it&')}>
              Italian
            </Menu.Item>
            <Menu.Item onClick={() => majLang('language=pt&')}>
              Portugaise
            </Menu.Item>
          </Menu>
        );
      }




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
                    <Dropdown overlay={menuLieu}>
                        <Button>
                            Lieux
                        </Button>
                    </Dropdown>
                    {/* <Dropdown overlay={menuLang} placement="bottomLeft">
                        <Button className="Drapeau">Language - {lang.substring(9,11)} <img src={`/images/${lang.substring(9,11)}.png`} ></img> </Button>
                    </Dropdown> */}

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
