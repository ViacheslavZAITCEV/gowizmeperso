import React, { useEffect, useState } from "react";
import {
  // div,
  ScrollView,
  // p,
  Input,
  Button,
  Badge,
} from 'antd';


import { connect } from 'react-redux';

import urlLocal from '../urlDevsGoWizMe';
import CardEvenement from "./components/CardEvenement";


function AfficheMainScreen(props) {

  const [isVisible, setIsVisible] = useState(false);
  const [currentCity, setCurrentCity] = useState('');

  const [eventsList, setEventsList] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(props.token);




  useEffect(() => {
    const getEvents = async () => {
      var requet = {
        method : 'POST', 
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body : ``
      };
      var resultRAW = await fetch(`${urlLocal}/pullEvents`);
      var body = await resultRAW.json();
      setEventsList(body)
      console.log('body = ', body)
    }
    getEvents()
  }, [])

console.log('eventsList = ', eventsList)


var cinema = [];
cinema = eventsList.map( (eventMap, i)=>{
  if (eventMap.type === 'film') {
    return (
      <CardEvenement
        event={eventMap}
      >
      </CardEvenement>
    )
  }
})


  return (
    <div className='gowizme' >
      <div style={{ flex: 1 }}>
          <div style={{ flexDirection: 'row', width: 300, cover: 'width', marginTop: 5, paddingBottom: 0, marginBottom: 0 }}>
            <Input
              placeholder="CHERCHER"
              inputStyle={{ borderWidth: 1, borderColor: 'grey', backgroundColor: 'white', marginBottom: 0 }}
            />
            <Button
              type='outline'
              title="Filtres"
              buttonStyle={{ backgroundColor: "#D70026", marginBottom: 0 }}
              titleStyle={{ color: 'white' }}
            />
          </div>


            <p
              style={{
                fontSize: 22,
                margin: 7,
                fontWeight: 'bold'
              }}>
              CINEMA
              </p>

            <div style={{ backgroundColor: '#3C6382', paddingBottom: 15 }}>

              {cinema}
            </div>

      </div>
      </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: 'saveToken', token });
    },
    onAddIdEvent: function (idEvent) {
      dispatch({ type: 'addIdEvent', idEvent: idEvent });
    },
    onAddIdUser: function (idUser) {
      dispatch({ type: 'addIdUser', idUser: idUser });
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
)(AfficheMainScreen);















































