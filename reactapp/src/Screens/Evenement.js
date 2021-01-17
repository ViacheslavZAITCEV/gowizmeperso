import React, {  useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { connect } from 'react-redux';

import {
    Container, Row, Col, 
} from 'reactstrap'
import { 
  Card, 
  Menu, Dropdown, 
  Button,
  Tabs,
  Radio ,
  Divider ,
} from 'antd';

import NavbarGwm from './NavbarGwm'

const { TabPane} = Tabs;


function Evenement (props){

    const [user, setUser] = useState(props.user);
    const [event, setEvent] = useState(props.event);
    const [lieu, setLieu] = useState(props.event.lieux_dates[0].salle);
    const [date, setDate] = useState(null);
    const [duree, setDuree] = useState(props.event.lieux_dates[0].duree);
    // const [creneau, setCreneau] = useState(null);
    
    const [tabLieu, setTabLieu] = useState([]);
    const [tabLieuDates, setTabLieuDate] = useState([]);

    var datePrecedent = new Date();
    
    useEffect( ()=> {
      const setLieuxDates = () =>{
        var tab = props.event.lieux_dates;
        var res = {};
        var tl = [];
        for (var i=0; i<tab.length; i++) {
          tl.push(tab[i].salle);
        }
        tl = supprimerDoublons(tl);
        setTabLieu(tl);

        for (var i=0; i<tl.length; i++){
          res[tl[i]]=[];
        }

        for (var i=0; i<tab.length; i++) {
          // console.log ( 'tab[i]=', tab[i] );
          var addDate = tab[i].date_debut;
          // console.log ( 'addDate=', addDate);
          res[tab[i].salle].push(addDate);
        }
        console.log('res=', res);
        
        setTabLieuDate(res);
        
      };
      setLieuxDates();
    },[props.event])

    function supprimerDoublons (tab){
      var tabNew = [];
      var tabSet = new Set (tab);
      tabNew = [...tabSet];
      return tabNew;
    }

    var dateFormat = function (date) {
      var newDate = new Date(date);
      var format;
      if (newDate.getMinutes()<10) {
        format = newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear() + ' - ' + newDate.getHours() + 'h0' + newDate.getMinutes();
      } else {
        format = newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear() + ' - ' + newDate.getHours() + 'h' + newDate.getMinutes();
      }
      return format;
    }




    const dates = ()=> {
      return (
        props.event.lieux_dates.map( ()=> {
          return (
            <Menu.Item onClick={() => setDate(props.event.lieux_dates.date_debut)}>
              {props.event.lieux_dates.date_debut}
            </Menu.Item>
          )   
        })
      )
    }

    function menuDate() {
        return (
          <Menu>
            {dates}
          </Menu>
        );
      }




    if ( ! props.event || !event){
        return(
            <Redirect to='/' />
        )
    }else{
        




      console.log ('tabLieuDates=', tabLieuDates)


        return (
        <Container>
            <NavbarGwm/>
              <h3 className='titreEvent'>
                {event.nom}
              </h3>
            <Row>
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
                    <h4>
                      Description:
                    </h4>
                    <div>
                      {event.description}
                    </div>
                    <Divider />
                    <h4>
                      Détails d'évènement 
                    </h4>
                    <div>
                      durée : {duree}
                    </div>
                    <div>
                      Votre choix de lieu :  {lieu}
                    </div>
                    <div>
                      Votre choix d'horaires : {date ? dateFormat(date) : '  --'}
                    </div>

                    <Divider />

                    <Tabs 
                    defaultActiveKey="0" 
                    type="card" 
                    size='small' 
                    onChange={ (e)=> setLieu(tabLieu[e]) }
                    // className='inputText'
                    >
                      {
                      tabLieu.map( (lieuCourant, i)=> {

                        console.log('Evenement page, lieuCourant=', lieuCourant);
                        datePrecedent = Date(tabLieuDates[lieuCourant].date_debut);
                        console.log('datePrecedent=', datePrecedent);
                        return (
                          <TabPane tab={lieuCourant} key={i}>
                            <p>
                              {lieuCourant}
                            </p>
                            {/* <p>
                              Adresse : {props.event.lieux_dates.salle[lieuCourant].adresse}
                            </p> */}
                            <Radio.Group 
                            defaultValue={i} 
                            style={{ margin: 16 }} 
                            onChange={ (e)=> setDate( tabLieuDates[lieuCourant][e] ) }
                            >
                              {
                                tabLieuDates[lieuCourant].map( (creneaux, j)=> {
                                  console.log('creneaux=',creneaux);
                                  var dateCourant= Date(creneaux);
                                  if ( dateCourant > datePrecedent){
                                  // if ( dateCourant.getDate() > datePrecedent.getDate()){
                                    datePrecedent = new Date (creneaux);
                                    return(
                                      <div>
                                        <Divider />
                                        <Radio.Button value={j} className='inputText'>
                                            {dateFormat(creneaux)}
                                        </Radio.Button>
                                      </div>
                                      )
                                  } else {
                                    return(
                                      <Radio.Button value={j} className='inputText'>
                                          {dateFormat(creneaux)}
                                       </Radio.Button>
                                      )    
                                  }
                                })
                              }
                            </Radio.Group>
                            <Button className='button1' >
                              Créer une sortie
                              { user ? '' : "L'action demende de création du compte"}
                            </Button>
                          </TabPane>
                        )   
                      })
                    }
                    </Tabs>


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
