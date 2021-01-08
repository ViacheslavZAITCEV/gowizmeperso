import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, Avatar, Icon, Badge } from 'react-native-elements';

//Initialisation du store Redux
import { connect } from 'react-redux';

import urlLocal from '../urlDevsGoWizMe'

function FriendsMainScreen(props, { navigation }) {

  const [friendsRequests, setFriendsRequests] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [token, setToken] = useState(props.token)

  const [nombreDemandes, setNombreDemandes] = useState(friendsRequests.length)

  useEffect(() => {
    async function findDemandes() {

      try {
        const data = await fetch(`${urlLocal}/findDemandes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `token=${props.token}`
        });

        console.log("FRIENDS MAIN SCREEN => PROPS.TOKEN=>>>>>>>><", props.token)

        var resBD = await data.json();
        // if (resBD.status){
        setFriendsRequests(resBD);

        console.log("RESBD=>>>>>>>>>>>>>><", resBD)

        // }
      } catch (e) {
        console.log('function findDemandes, error:', e)
      }

    }
    const getFriendsList = async () => {
      const dataFriends = await fetch(`${urlLocal}/pullFriendsList`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=5fdb409fa597eb0f08533c1d`
      })
      const bodyFriends = await dataFriends.json()
      setFriendsList(bodyFriends)
    }

    findDemandes();
    getFriendsList();

  }, [])

  console.log("+++++++++ FRIENDS LIST +++++++++", friendsList)

  useEffect(() => {
    function toSignIn() {
      if (props.token === null) {
        props.navigation.navigate('SignInScreen')
      }
    }
    toSignIn();
  }, [token])

  // useEffect(() => {
  //   console.log("rafraichissement de l'écran")
  // }, [nombreDemandes])

  var demandesAmis;
  var mapDemandes = () => {
    if (friendsRequests == undefined) {
      demandesAmis =
        <Text>Ca fonctionne pas</Text>
    } else {
      demandesAmis =
        friendsRequests.map((ami, i) => {
          // console.log("AMI+>>>>>>>>>>>",ami)

          console.log("AVATAR", ami.avatar)
          console.log("nom", ami.nom)
          console.log("PRENOM", ami.prenom)

          return (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 5 }}>

              <Avatar
                size='small'
                rounded
                source={{ uri: ami.avatar }}
              />

              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                {ami.prenom} {ami.nom}
                </Text>
                <Text> veut faire partie de vos amis </Text>
              </View>

              <Icon
                name="checkcircle"
                type='antdesign'
                size={30}
                color="#D70026"
                onPress={() => accepteDemande(ami._id)}
              />

              <Icon
                name="closecircle"
                type='antdesign'
                size={30}
                color="#D70026"
                onPress={() => delDemande(ami._id)}
              />

            </View>

          )
        })
    }
  }

  mapDemandes();

  var ListeAmis;

  if (friendsList.listAmis == undefined) {
    ListeAmis =
      <Text>Echec de récupération de la liste d'amis</Text>
  } else if (friendsList.listAmis.length > 0) {
    ListeAmis = friendsList.listAmis.map((x, i) => {
      console.log("++++++++++AMIS+++++++++++++++++", x)
      return (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginVertical: 5, marginLeft: 15 }}>

          <Avatar
            onPress={() => props.navigation.navigate('FriendsProfileScreen')}
            size='medium'
            rounded
            source={{
              uri: x.avatar
            }}
          />

          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('FriendsProfileScreen')}
            >
            
            <Text 
            style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5 }}
            >
            {x.prenom} {x.nom}
            </Text>
            {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', maxWidth: 300 }}>
              <Badge badgeStyle={{ backgroundColor: '#3C6382', margin: 1 }} value='Films' />
              <Badge badgeStyle={{ backgroundColor: '#E55039', margin: 1 }} value='Science-Fiction' />
              <Badge badgeStyle={{ backgroundColor: '#E55039', margin: 1 }} value='Musique Urbaine' />
              <Badge badgeStyle={{ backgroundColor: '#E55039', margin: 1 }} value='Fantastique' />
              <Badge badgeStyle={{ backgroundColor: '#E55039', margin: 1 }} value='Histoire' />
            </View> */}
            </TouchableOpacity>
          </View>
        </View>
      )
    })
  } else {
    <Text>Pas encore d'amis enregistrés</Text>
  }

  // ========================================================
  // GESTION DE VALIDATION / REFUS D'AJOUT D'AMIS
  // ========================================================

  async function accepteDemande(idAmis) {
    try {
      const data = await fetch(`${urlLocal}/accepteDemande`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `token=${props.token}&idDemandeur=${idAmis}`
      });
      var resBD = await data.json();
      if (resBD.status) {
        // setNombreDemandes(nombreDemandes--)
        console.log('=========================================')
        console.log('resBD.response=', resBD.response);
        console.log()
      }
    } catch (e) {
      console.log('function accepteDemande, error:', e)
    }
  }

  async function delDemande(idAmis) {
    try {
      const data = await fetch(`${urlLocal}/delDemande`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `token=${props.token}&idDemandeur=${idAmis}`
      });
      var resBD = await data.json();
      if (resBD.status) {
        // setNombreDemandes(nombreDemandes--)
        console.log('resBD.response=', resBD.response);
      }
    } catch (e) {
      console.log('function findDemandes, error:', e)
    }
  }

  return (
    <View style={{ flex: 1 }}>

      <View style={{ backgroundColor: '#E55039' }}>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, fontWeight: 'bold', maxWidth: "100%", marginTop: 10, marginBottom: 10 }}>
          GERER MES AMIS
      </Text>
      </View>

      <ScrollView style={{ flexDirection: 'column', marginBottom: 40 }}>

        <Text style={{ fontSize: 18, margin: 7, fontWeight: 'bold' }} >
          DEMANDES D'AMIS
      </Text>

        {demandesAmis}


        <Text style={{ fontSize: 18, margin: 7, fontWeight: 'bold' }} >
          MES AMIS
      </Text>
        {ListeAmis}

      </ScrollView>

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('FriendsResearchScreen')}
          style={{
            width: '100%', height: 40, backgroundColor: '#D70026',
            alignItems: 'center', justifyContent: 'center'
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Rechercher mes amis sur GoWizMe</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

function mapStateToProps(state) {
  return {
    token: state.tokenReducer,
    idUser: state.idUserReducer,
  }
}

export default connect(
  mapStateToProps,
  null
)(FriendsMainScreen);