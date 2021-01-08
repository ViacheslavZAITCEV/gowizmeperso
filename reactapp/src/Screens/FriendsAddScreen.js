import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Avatar, Icon } from 'react-native-elements';

import urlLocal from '../urlDevsGoWizMe';

//Initialisation du store Redux
import { connect } from 'react-redux';

function FriendsAddScreen(props) {

  // const [requestToBeFriend, setRequestToBeFriend] = useState({});
  
  const askToBeFriend = async (idAmi) => {
    console.log("envoi de demande d'amis");
    console.log("token=", props.token);

    // setRequestToBeFriend(props.idUser);

    const data = await fetch(`${urlLocal}/demandeFriend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${props.token}&idAmi=${idAmi}`
    });
    

    const body = await data.json()

    props.navigation.navigate('FriendsMainScreen')
  };

  // console.log("PROPS=>", props)
  console.log("NOM => ", props.navigation.state.params.friendsResult)
  const friendsResult = props.navigation.state.params.friendsResult;



  if (friendsResult == null ){
    <Text>Aucun utilisateur</Text>
  } else {
    affichageFriendSearch
  }

  const affichageFriendSearch = friendsResult.map((x, i) => {
    console.log (x);
    return (
      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
        <View style={{ justifyContent: 'flex-end', marginLeft: 15 }}>
          <Icon
            name="add-circle"
            type='materialicons'
            size={35}
            color="#D70026"
            onPress={() => askToBeFriend(x._id)}
          />
        </View>
        <View style={{ marginHorizontal: 15 }}>
          <Avatar
            size='medium'
            rounded
            source={{
              uri:
                x.avatar,
            }}
          />
        </View>

        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', textAlign: 'left' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              {x.prenom} {x.nom}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', textAlign: 'left' }}>
            <Text style={{ fontSize: 16 }}>
              {x.ville}
            </Text>
          </View>
        </View>
      </View>
    )
  })

  return (
    <View style={{ flex: 1 }}>

      <View style={{ backgroundColor: '#E55039' }}>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, fontWeight: 'bold', maxWidth: "100%", marginTop: 10, marginBottom: 10 }}>
          AJOUTER À MES AMIS
        </Text>
      </View>

      <Text style={{ fontSize: 22, margin: 7, fontWeight: 'bold' }} >
        RESULTATS DE LA RECHERCHE :
        </Text>

      <ScrollView style={{ flexDirection: 'column', marginBottom: 40 }}>

        {affichageFriendSearch}

      </ScrollView>

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('FriendsResearchScreen')}
          style={{
            width: '100%', height: 40, backgroundColor: '#D70026',
            alignItems: 'center', justifyContent: 'center'
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Faire une nouvelle recherche</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}


function mapStateToProps(state) {
  return {
    token: state.tokenReducer,
    idUser : state.idUserReduceur,
  }
}

export default connect(
  mapStateToProps,
  null
)(FriendsAddScreen);

// import React, { useEffect, useState } from 'react';
// import { View, ScrollView, TouchableOpacity } from 'react-native';
// import { Text, Avatar, Icon } from 'react-native-elements';

// //Initialisation du store Redux
// import { connect } from 'react-redux';

// function FriendsAddScreen(props) {

//   const [requestToBeFriend, setRequestToBeFriend] = useState({});
  
//   const askToBeFriend = async () => {
//     console.log("envoi de demande d'amis");
//     props.navigation.navigate('FriendsMainScreen')
//   };

//   console.log("PROPS=>", props)
//   console.log("NOM => ", props.navigation.state.params.friendsResult)
//   const friendsResult = props.navigation.state.params.friendsResult;

//   const affichageFriendSearch = friendsResult.map((x, i) => {
//     return (
//       <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
//         <View style={{ justifyContent: 'flex-end', marginLeft: 15 }}>
//           <Icon
//             name="add-circle"
//             type='materialicons'
//             size={35}
//             color="#D70026"
//             onPress={() => askToBeFriend()}
//           />
//         </View>
//         <View style={{ marginHorizontal: 15 }}>
//           <Avatar
//             size='medium'
//             rounded
//             source={{
//               uri:
//                 x.avatar,
//             }}
//           />
//         </View>

//         <View style={{ flexDirection: 'column', alignItems: 'center' }}>
//           <View style={{ flexDirection: 'row', alignItems: 'center', textAlign: 'left' }}>
//             <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
//               {x.prenom} {x.nom}
//             </Text>
//           </View>
//           <View style={{ flexDirection: 'row', alignItems: 'center', textAlign: 'left' }}>
//             <Text style={{ fontSize: 16 }}>
//               {x.ville}
//             </Text>
//           </View>
//         </View>
//       </View>
//     )
//   })

//   return (
//     <View style={{ flex: 1 }}>

//       <View style={{ backgroundColor: '#E55039' }}>
//         <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, fontWeight: 'bold', maxWidth: "100%", marginTop: 10, marginBottom: 10 }}>
//           AJOUTER À MES AMIS
//         </Text>
//       </View>

//       <Text style={{ fontSize: 22, margin: 7, fontWeight: 'bold' }} >
//         RESULTATS DE LA RECHERCHE :
//         </Text>

//       <ScrollView style={{ flexDirection: 'column', marginBottom: 40 }}>

//         {affichageFriendSearch}

//       </ScrollView>

//       <View style={{ flex: 1, justifyContent: 'flex-end' }}>
//         <TouchableOpacity
//           onPress={() => props.navigation.navigate('FriendsResearchScreen')}
//           style={{
//             width: '100%', height: 40, backgroundColor: '#D70026',
//             alignItems: 'center', justifyContent: 'center'
//           }}
//         >
//           <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Faire une nouvelle recherche</Text>
//         </TouchableOpacity>
//       </View>

//     </View>
//   );
// }

// export default connect(
//   null,
//   null
// )(FriendsAddScreen);