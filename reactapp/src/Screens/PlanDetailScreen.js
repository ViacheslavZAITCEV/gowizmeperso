import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, Avatar, Image } from 'react-native-elements';

//Initialisation de Redux
import { connect } from 'react-redux';

import urlLocal from '../urlDevsGoWizMe'


function PlanDetailScreen(props, { navigation }) {

  const [planDetailInfo, setPlanDetailInfo] = useState({});

  // console.log(props.idSortie);

  useEffect(() => {
    const getSortieDetails = async () => {
      // console.log(props.idSortie);
      const data = await fetch(`${urlLocal}/pullSortieDetaillee`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${props.idSortie}`
      })
      const body = await data.json()
      // console.log(body)
      setPlanDetailInfo(body);
    }
    getSortieDetails()
  }, [])

  console.log('plan detaille', planDetailInfo);

  var affichageAmisParticipants
  var functionAfficherAmisParticipants = () => {
    if (planDetailInfo.listAmisSortie != undefined) {
      affichageAmisParticipants = planDetailInfo.listAmisSortie.map((x, i) => {
        return (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginVertical: 5, marginLeft: 15, maxWidth: 350 }}>

            <Avatar
              size='medium'
              rounded
              source={{ uri: x.avatar }}
            />

            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>
              {x.prenom} {x.nom}
            </Text>

          </View>
        )
      });
    } else {
      affichageAmisParticipants = <Text>Aucun participant pour cette sortie</Text>
    }
  }
  functionAfficherAmisParticipants();

  var affichageDetailsSortie
  var functionAfficherDetailsSortie = () => {
    if (planDetailInfo.sortie != undefined) {
      affichageDetailsSortie =
        <View style={{ flex: 1, alignItems: 'center', width: 300, margin: 5 }}>

          <Image style={{ width: 210, height: 297, margin: 5 }} source={{ uri: planDetailInfo.sortie.image }} />

          <Text style={{ textAlign: 'center', marginTop: 5, fontWeight: 'bold', fontSize: 18, textTransform: 'uppercase' }}> {planDetailInfo.sortie.nomSortie} </Text>

          {/* <Text style={{ textAlign: 'center', marginTop: 5, fontSize: 18 }}>Type : {(planDetailInfo && planDetailInfo.sortie.type) ? planDetailInfo.sortie.type : ''} </Text> */}

          <Text style={{ textAlign: 'center', marginTop: 5, fontSize: 18 }}>Lieu : {(planDetailInfo && planDetailInfo.sortie.adresse) ? planDetailInfo.sortie.adresse : ''} </Text>

          {/* <Text style={{ textAlign: 'center', marginTop: 5, fontSize: 18 }}>Code postal : {(planDetailInfo && planDetailInfo.sortie.cp) ? planDetailInfo.sortie.cp : ''} </Text> */}

          <Text style={{ textAlign: 'center', marginTop: 5, fontSize: 18 }}>Date et heure : {(planDetailInfo && planDetailInfo.sortie.date_debut) ? planDetailInfo.sortie.date_debut : ''} </Text>

          {/* <Text style={{ textAlign: 'center', marginTop: 5, fontSize: 18 }}>Date fin : {(planDetailInfo && planDetailInfo.sortie.date_fin) ? planDetailInfo.sortie.date_fin : ''} </Text> */}

        </View>
    } else {
      affichageDetailsSortie = <Text>Chargement</Text>
    }
  }
  functionAfficherDetailsSortie();

  var nePlusParticiper = async () => {
    const data = await fetch(`${urlLocal}/desinscription`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `idUser=${props.idUser}&idSortie=${props.idSortie}`
    })
    const body = await data.json();
  }


  return (
    <View style={{ flex: 1 }}>

      <View style={{ backgroundColor: '#E55039' }}>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, fontWeight: 'bold', maxWidth: "100%", marginTop: 10, marginBottom: 10 }}>
          DETAILS DE LA SORTIE
        </Text>
      </View>

      <ScrollView style={{ flexDirection: 'column', marginBottom: 0 }}>

        {/* <ImageBackground source={imageBackground} style={styles.imageBackground}> */}

          <View style={{ flex: 1, alignItems: 'center' }}>

            {affichageDetailsSortie}

            <Text style={{ fontSize: 18, margin: 10, fontWeight: 'bold' }} >
              PARTICIPANTS:
            </Text>

            {affichageAmisParticipants}

          </View>

        {/* </ImageBackground> */}

      </ScrollView>

      {/* <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <TouchableOpacity

          onPress={() => {
            nePlusParticiper();
            props.navigation.navigate('PlanMainScreen')}
          }

          style={{
            width: '100%',
            height: 40,
            backgroundColor: '#D70026',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Ne plus participer à cette sortie</Text>
        </TouchableOpacity>
      </View> */}

    </View>
  );
}

function mapStateToProps(state) {
  return {
    idUser: state.idUserReducer,
    token: state.tokenReducer,
    user: state.userReduceur,
    idSortie: state.idSortieReducer,
    currentCity: state.currentCityReducer
  }
}

export default connect(
  mapStateToProps,
  null
)(PlanDetailScreen);