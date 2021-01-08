import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, Text, Divider, Badge, Card } from 'react-native-elements';

//Initialisation du store Redux
import { connect } from 'react-redux';

function FriendsProfileScreen() {

  return (
    <View style={{ flex: 1 }}>

      {/* AVATAR, NOM, PRENOM, VILLE */}

      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar
            size='large'
            marginTop={5}
            marginBottom={5}
            marginRight={10}
            rounded
            source={{
              uri:
                'https://res.cloudinary.com/dhtl1axxt/image/upload/v1608197402/hlotdsopnuvekbmsfbfd.png',
            }}
          />
          <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Text h4>Cedric Alinc</Text>
            <Text h5>Paris</Text>
          </View>
        </View>

        <Divider marginBottom={5} style={{ backgroundColor: '#EFB509', width: 250, height: 2 }} />
      </View>

      {/* PREFERENCES */}

      <View>
        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text h5 fontWeight='bold'>
            Ses préférences
          </Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
          <Badge badgeStyle={{ backgroundColor: '#3C6382', margin: 1 }} value='Films' />
          <Badge badgeStyle={{ backgroundColor: '#3C6382', margin: 1 }} value='Expositions' />
          <Badge badgeStyle={{ backgroundColor: '#3C6382', margin: 1 }} value='Théatre' />
          <Badge badgeStyle={{ backgroundColor: '#3C6382', margin: 1 }} value='Concerts' />
          <Badge badgeStyle={{ backgroundColor: '#E55039', margin: 1 }} value='Comédie' />
          <Badge badgeStyle={{ backgroundColor: '#E55039', margin: 1 }} value='Science-Fiction' />
          {/* <Badge badgeStyle={{ backgroundColor: '#E55039', margin: 1 }} value='Classique' />
          <Badge badgeStyle={{ backgroundColor: '#E55039', margin: 1 }} value='Musique Urbaine' /> */}
          <Badge badgeStyle={{ backgroundColor: '#E55039', margin: 1 }} value='Rock' />
          {/* <Badge badgeStyle={{ backgroundColor: '#E55039', margin: 1 }} value='Pop' /> */}
          <Badge badgeStyle={{ backgroundColor: '#E55039', margin: 1 }} value='Fantastique' />
          {/* <Badge badgeStyle={{ backgroundColor: '#E55039', margin: 1 }} value='Musical' />
          <Badge badgeStyle={{ backgroundColor: '#E55039', margin: 1 }} value='Beaux-Arts' />
          <Badge badgeStyle={{ backgroundColor: '#E55039', margin: 1 }} value='Civilisations' />
          <Badge badgeStyle={{ backgroundColor: '#E55039', margin: 1 }} value='Contemporain' /> */}
          {/* <Badge badgeStyle={{ backgroundColor: '#E55039', margin: 1 }} value='Drame' /> */}
          <Badge badgeStyle={{ backgroundColor: '#E55039', margin: 1 }} value='Histoire' />
          <Badge badgeStyle={{ backgroundColor: '#E55039', margin: 1 }} value='Musique Française' />
          <Badge badgeStyle={{ backgroundColor: '#E55039', margin: 1 }} value='One-Man Show' />
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Divider marginTop={5} marginBottom={5} style={{ backgroundColor: '#EFB509', width: 250, height: 2 }} />
        </View>
      </View>
      <ScrollView>

        {/* FAVORIS */}

        <View>
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text h5 fontWeight='bold'>Ses favoris</Text>
          </View>
          <ScrollView horizontal={true}>
            <Card
              containerStyle={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0, paddingBottom: 0, maxWidth: '100%', backgroundColor: '#F8F5F2' }}>
              <Card.Image
                style={{ width: 85, height: 65 }}
                source={{ uri: 'https://files.offi.fr/evenement/79246/images/200/ad64f2fe27d2be710398ae79fc1b862b.jpg' }}
                resizeMode="cover"
              />
              <Text style={{ textAlign: 'center', fontWeight: 'bold', maxWidth: "80%", padding: 5 }}>TENET</Text>
            </Card>
            {/* <Card
              containerStyle={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0, paddingBottom: 0, maxWidth: '100%', backgroundColor: '#F8F5F2' }}>
              <Card.Image
                style={{ width: 85, height: 65 }}
                source={{ uri: 'https://files.offi.fr/evenement/79246/images/200/ad64f2fe27d2be710398ae79fc1b862b.jpg' }}
                resizeMode="cover"
              />
              <Text style={{ textAlign: 'center', fontWeight: 'bold', maxWidth: "80%", padding: 5 }}>TENET</Text>
            </Card>
            <Card
              containerStyle={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0, paddingBottom: 0, maxWidth: '100%', backgroundColor: '#F8F5F2' }}>
              <Card.Image
                style={{ width: 85, height: 65 }}
                source={{ uri: 'https://files.offi.fr/evenement/79246/images/200/ad64f2fe27d2be710398ae79fc1b862b.jpg' }}
                resizeMode="cover"
              />
              <Text style={{ textAlign: 'center', fontWeight: 'bold', maxWidth: "80%", padding: 5 }}>TENET</Text>
            </Card>
            <Card
              containerStyle={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0, paddingBottom: 0, maxWidth: '100%', backgroundColor: '#F8F5F2' }}>
              <Card.Image
                style={{ width: 85, height: 65 }}
                source={{ uri: 'https://files.offi.fr/evenement/79246/images/200/ad64f2fe27d2be710398ae79fc1b862b.jpg' }}
                resizeMode="cover"
              />
              <Text style={{ textAlign: 'center', fontWeight: 'bold', maxWidth: "80%", padding: 5 }}>TENET</Text>
            </Card> */}
          </ScrollView>
        </View>

        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Divider marginTop={10} marginBottom={10} style={{ backgroundColor: '#EFB509', width: 250, height: 2 }} />
        </View>

        {/* SORTIES PANIFIEES */}

        <View>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text h5 fontWeight='bold'> Ses sorties planifiées</Text>
          </View>
          <ScrollView horizontal={true} style={{ marginBottom: 40 }}>
            <Card
              containerStyle={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0, paddingBottom: 0, maxWidth: '100%', backgroundColor: '#F8F5F2' }}>
              <Card.Image
                style={{ width: 85, height: 65 }}
                source={{ uri: 'https://files.offi.fr/evenement/79246/images/200/ad64f2fe27d2be710398ae79fc1b862b.jpg' }}
                resizeMode="cover"
              />
              <Text style={{ textAlign: 'center', fontWeight: 'bold', maxWidth: "80%", padding: 5 }}>TENET</Text>
            </Card>
            {/* <Card
              containerStyle={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0, paddingBottom: 0, maxWidth: '100%', backgroundColor: '#F8F5F2' }}>
              <Card.Image
                style={{ width: 85, height: 65 }}
                source={{ uri: 'https://files.offi.fr/evenement/79246/images/200/ad64f2fe27d2be710398ae79fc1b862b.jpg' }}
                resizeMode="cover"
              />
              <Text style={{ textAlign: 'center', fontWeight: 'bold', maxWidth: "80%", padding: 5 }}>TENET</Text>
            </Card>
            <Card
              containerStyle={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0, paddingBottom: 0, maxWidth: '100%', backgroundColor: '#F8F5F2' }}>
              <Card.Image
                style={{ width: 85, height: 65 }}
                source={{ uri: 'https://files.offi.fr/evenement/79246/images/200/ad64f2fe27d2be710398ae79fc1b862b.jpg' }}
                resizeMode="cover"
              />
              <Text style={{ textAlign: 'center', fontWeight: 'bold', maxWidth: "80%", padding: 5 }}>TENET</Text>
            </Card>
            <Card
              containerStyle={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0, paddingBottom: 0, maxWidth: '100%', backgroundColor: '#F8F5F2' }}>
              <Card.Image
                style={{ width: 85, height: 65 }}
                source={{ uri: 'https://files.offi.fr/evenement/79246/images/200/ad64f2fe27d2be710398ae79fc1b862b.jpg' }}
                resizeMode="cover"
              />
              <Text style={{ textAlign: 'center', fontWeight: 'bold', maxWidth: "80%", padding: 5 }}>TENET</Text>
            </Card> */}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <TouchableOpacity
          style={{
            width: '100%', height: 40, backgroundColor: '#D70026',
            alignItems: 'center', justifyContent: 'center'
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Supprimer de mes amis</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

function mapStateToProps(state) {
  return { token: state.token }
}

export default connect(
  mapStateToProps,
  null
)(FriendsProfileScreen);