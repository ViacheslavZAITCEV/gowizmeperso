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
import CardEvenement from "./components/CardEvenement";

const { TabPane} = Tabs;


function Evenement (props){

    const [user, setUser] = useState(props.user);
    const [event, setEvent] = useState(props.event);
    const [lieu, setLieu] = useState(props.event.lieux_dates[0].salle);
    const [date, setDate] = useState(null);
    const [dateFin, setDateFin] = useState(null);
    const [duree, setDuree] = useState(props.event.lieux_dates[0].duree);
    const [adresse, setAdresse] = useState('')
    // const [creneau, setCreneau] = useState(null);
    
    const [tabLieu, setTabLieu] = useState([]);
    const [tabLieuDates, setTabLieuDate] = useState([]);
    
    const [toLogin, setToLogin] = useState(false);

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
        console.log ( 'tl=', tl );

        // initialization des objets des salles
        for (var i=0; i<tl.length; i++){
          // res[tl[i]]=[];
          res[tl[i]] = {
            salle : tab[i].salle,
            adresse : tab[i].adresse,
            cp : tab[i].cp,
            creneaux : []
          };
        }
        console.log('res=', res);

        for (var i=0; i<tab.length; i++) {
          // console.log ( 'tab[i]=', tab[i] );
          // console.log('i=',i, 'res[i]=', res[i]);
          
          res[ tab[i].salle ].creneaux.push({
            date_debut: tab[i].date_debut,
            date_fin: tab[i].date_fin,
          });
          // var addDate = tab[i].date_debut;
          // res[tab[i].salle].push(addDate);
          // console.log ( 'addDate=', addDate);

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





    function isDate1MoreDate2(date1, date2) {
      var d1 = new Date(date1)
      var day1 = d1.getDate();
      // console.log('d1=', d1)
      // console.log('day1=', day1)
      // console.log('type of d1=', typeof d1);
      // console.log('type of day1=', typeof day1);
      var d2 = new Date(date2)
      var day2 = d2.getDate();
      // console.log('d2=',  d2);
      // console.log('type of d2=', typeof d2);
      // console.log('day2=', day2);
      // console.log('type of day2=', typeof day2);
      if (day1 > day2){
        return true
      }
      return false;
    }


    function ajouterAmis(){
      if(user.avatar){
        return (
          <div>
            On ajoute les amis ici
          </div>
        )
      }
    }


    function creerSortie(newSortie){

      console.log('newSortie =', newSortie);
    }




    if ( ! props.event || !event){
        return(
            <Redirect to='/' />
        )
    }else 
    if ( toLogin ){
      setTimeout( ()=> setToLogin(false), 300);
      return(
          <Redirect to='/NewUser' />
      )
    }else{
      
        




      // console.log ('tabLieuDates=', tabLieuDates)
      // console.log ('user=', user)


        return (
        <Container>
            <NavbarGwm/>
              <h3 className='titreEvent'>
                {event.nom}
              </h3>
            <Row>
                <Col xs='12' sm='12' md='6' lg='4' xl='4'
                  className='cadEventInEvenement'
                >
                  <CardEvenement
                  event={props.event}
                  description={''}
                  sizeCard={{ width: 300, height: 620 }}
                  sizeImg={{ width: 300, height: 520 }}
                  styleHeartFond={{position: 'relative', top: -600, left: 260, width: 20, height: 20 }}
                  styleHeart={{position: 'relative', top: -602, left: 242 }}
                  >
                  </CardEvenement>
                </Col>
                <Col xs='12' sm='12' md='6' lg='8' xl='8'
                >
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
                      Votre choix de lieu :  
                      {lieu}
                    </div>
                    <div>
                      Votre choix d'horaires : {date ? dateFormat(date) : ' --'}
                    </div>

                    <Divider />

                    <Tabs 
                    defaultActiveKey="0" 
                    type="card" 
                    size='small' 
                    onChange={ (e)=> {
                      setLieu(tabLieu[e]); 
                      
                    }}
                    // className='inputText'
                    >
                      {
                      tabLieu.map( (lieuCourant, i)=> {

                        // console.log('Evenement page, lieuCourant=', lieuCourant);
                        datePrecedent = Date(tabLieuDates[lieuCourant].date_debut);
                        // console.log('datePrecedent=', datePrecedent);
                        return (
                          <TabPane tab={lieuCourant} key={i}>
                            <p>
                              {tabLieu[lieuCourant]}
                            </p>
                            {/* <p>
                              Adresse : {props.event.lieux_dates.salle[lieuCourant].adresse}
                            </p> */}
                            <Radio.Group 
                            key={i}
                            defaultValue={i} 
                            style={{ margin: 16 }} 
                            onChange={ (e)=> {
                              // console.log('e=',e);
                              // console.log('tabLieuDates[lieuCourant].creneaux[e.target.value]=',tabLieuDates[lieuCourant].creneaux[e.target.value]);
                              setDate( tabLieuDates[lieuCourant].creneaux[e.target.value].date_debut );
                              setDateFin( tabLieuDates[lieuCourant].creneaux[e.target.value].date_fin );
                              setAdresse (tabLieuDates[lieuCourant].adresse );
                            }}
                            >
                              {
                                tabLieuDates[lieuCourant].creneaux.map( (creneaux, j)=> {
                                  var dateCourant= new Date(creneaux.date_debut);
                                  if ( isDate1MoreDate2(dateCourant ,datePrecedent) ){
                                    datePrecedent = new Date (creneaux.date_debut);
                                    return(
                                      <div>
                                        <Divider />
                                        <Radio.Button 
                                        key={j}
                                        value={j} 
                                        className='inputText'>
                                            {dateFormat(creneaux.date_debut)}
                                        </Radio.Button>
                                      </div>
                                      )
                                  } else {
                                    return(
                                      <Radio.Button value={j} className='inputText'>
                                          {dateFormat(creneaux.date_debut)}
                                       </Radio.Button>
                                      )    
                                  }
                                })
                              }
                            </Radio.Group>
                            <div>
                              {ajouterAmis()}
                            </div>
                            
                            <Button 
                            className='button1' 
                            onClick={ ()=> {
                              console.log('click "créer sortie", creerSortie=', creerSortie);
                              user.avatar ? creerSortie({
                                evenementLie: [event._id],
                                organisateur: user,
                                nomSortie: event.nom,
                                image: event.image,
                                adresse: tabLieuDates[lieuCourant].adresse,
                                cp: tabLieuDates[lieuCourant].cp,
                                date_debut: date,
                                date_fin: dateFin,
                                duree: duree,
                                type: event.type,
                                participants: [user],
                              }) : setToLogin(true);
                            }}
                            >
                              Créer une sortie { user.avatar ? '' : "  ( L'action demande de la création du compte) "}
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
