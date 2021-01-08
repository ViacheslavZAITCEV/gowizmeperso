import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, CheckBox } from 'react-native-elements';

import { connect } from 'react-redux';

import urlLocal from '../urlDevsGoWizMe'


function ProfilePreferenceScreen(props) {

  // =========================================================================
  //                         TYPE D'EVENEMENTS
  // =========================================================================

  const [typeFilms, setTypeFilms] = useState(false)
  const [typeConcerts, setTypeConcerts] = useState(false)
  const [typeExpositions, setTypeExpositions] = useState(false)
  const [typeTheatre, setTypeTheatre] = useState(false)


  // =========================================================================
  //                         CATEGORIES D'EVENEMENTS
  // =========================================================================

  const [categorieBeauxArts, setCategorieBeauxArts] = useState(false)
  const [categorieClassique, setCategorieClassique] = useState(false)
  const [categorieComedie, setCategorieComedie] = useState(false)
  const [categorieOneManShow, setCategorieOneManShow] = useState(false)
  const [categorieContemporain, setCategorieContemporain] = useState(false)
  const [categorieDrame, setCategorieDrame] = useState(false)
  const [categorieFantastique, setCategorieFantastique] = useState(false)
  const [categorieScienceFiction, setCategorieScienceFiction] = useState(false)
  const [categorieHistoire, setCategorieHistoire] = useState(false)
  const [categorieCivilisations, setCategorieCivilisations] = useState(false)
  const [categorieMusical, setCategorieMusical] = useState(false)
  const [categorieMusiqueFrancaise, setCategorieMusiqueFrancaise] = useState(false)
  const [categorieMusiqueUrbaine, setCategorieMusiqueUrbaine] = useState(false)
  const [categoriePop, setCategoriePop] = useState(false)
  const [categorieRock, setCategorieRock] = useState(false)


    
  const [token, setToken] = useState(props.token);
  const [user, setUser] = useState(props.user);

  useEffect(() => {
    const takeUserBD = async () => {
        if(props.token){
          const userBD = await fetch(`${urlLocal}/users/getUser`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: `token=${props.token}`
          })
          const body = await userBD.json();
          console.log('ProfileMainScreen, updateUser(), user = ', body);
          setUser(body);
          setTypeFilms(body.preferences[0].cinema);
        }else{
          setUser(null);
        }
    }
    takeUserBD ();
  },[props.token])

  useEffect(() => {
    const updateUserBD = async () => {

      var newprefs = [{
        cinema : typeFilms,
        theatre: typeTheatre,
        exposition: typeExpositions,
        concert: typeConcerts,
        fantastique: categorieFantastique,
        scienceFiction:  categorieScienceFiction,
        comedie: categorieComedie,
        drame: categorieDrame,
        spectacleMusical: categorieMusical,
        contemporain: categorieContemporain,
        oneManShow: categorieOneManShow,
        musiqueClassique: categorieClassique,
        musiqueFrancaise: categorieMusiqueFrancaise,
        musiquePop: categoriePop,
        musiqueRock: categorieRock,
        beauxArts : categorieBeauxArts,
        histoireCivilisations: categorieCivilisations,
      }];

      var newUser = user;
      newUser.preferences = newprefs;
      props.updateStoreUser(newUser);
      console.log('ProfilPreferenceScreen, newUser=', newUser);

      
      var requetRAW = JSON.stringify(newprefs);
      console.log('ProfilPreferenceScreen, token=', token);
      const data = await fetch(`${urlLocal}/users/updatePrefs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `token=${props.token}&preferences=${requetRAW}`
        })
        const body = await data.json()
        if (body.response){
          console.log('ProfilPreferenceScreen, update est enregistré dans BD');
        }else {
          console.log('ProfilPreferenceScreen, enregistrement dans BD est refusé, error=', body.error);
        } 
    }
    updateUserBD ();
  },[
    typeFilms, 
    typeConcerts, 
    typeExpositions, 
    typeTheatre, 
    categorieBeauxArts, 
    categorieClassique, 
    categorieComedie, 
    categorieOneManShow,
    categorieContemporain,
    categorieDrame,
    categorieFantastique,
    categorieScienceFiction,
    categorieHistoire,
    categorieCivilisations,
    categorieMusical, 
    categorieMusiqueFrancaise, 
    categorieMusiqueUrbaine, 
    categoriePop, 
    categorieRock,
  ]);

  return (
    <View style={{ flex: 1 }}>

      <View style={{ backgroundColor: '#E55039' }}>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, fontWeight: 'bold', maxWidth: "100%", marginTop: 10, marginBottom: 10 }}>
          DEFINIR MES PREFERENCES
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>

        {/* =============================================================================
                                     CHECKBOX POUR TYPES
        ============================================================================= */}

        <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: 'bold', maxWidth: "100%", marginTop: 15 }}>
          TYPES D'EVENEMENTS
            </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <CheckBox
            title='Films'
            checkedIcon='check-square'
            uncheckedIcon='square'
            checkedColor='#EFB509'
            uncheckedColor='#dfe4ea'
            checked={typeFilms}
            onPress={() => setTypeFilms(!typeFilms)}
          />
          <CheckBox
            title='Concerts'
            checkedIcon='check-square'
            uncheckedIcon='square'
            checkedColor='#EFB509'
            uncheckedColor='#dfe4ea'
            checked={typeConcerts}
            onPress={() => setTypeConcerts(!typeConcerts)}
          />
          <CheckBox
            title='Expositions'
            checkedIcon='check-square'
            uncheckedIcon='square'
            checkedColor='#EFB509'
            uncheckedColor='#dfe4ea'
            checked={typeExpositions}
            onPress={() => setTypeExpositions(!typeExpositions)}
          />
          <CheckBox
            title='Théatre'
            checkedIcon='check-square'
            uncheckedIcon='square'
            checkedColor='#EFB509'
            uncheckedColor='#dfe4ea'
            checked={typeTheatre}
            onPress={() => setTypeTheatre(!typeTheatre)}
          />
        </View>

        {/* =============================================================================
                                      CHECKBOX POUR CATEGORIES
          ============================================================================= */}

        <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: 'bold', maxWidth: "100%", marginTop: 15 }}>
          CATEGORIES
            </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 40 }}>
          <CheckBox
            title='Beaux-Arts'
            checkedIcon='check-square'
            uncheckedIcon='square'
            checkedColor='#EFB509'
            uncheckedColor='#dfe4ea'
            checked={categorieBeauxArts}
            onPress={() => setCategorieBeauxArts(!categorieBeauxArts)}
          />
          <CheckBox
            title='Civilisations'
            checkedIcon='check-square'
            uncheckedIcon='square'
            checkedColor='#EFB509'
            uncheckedColor='#dfe4ea'
            checked={categorieCivilisations}
            onPress={() => setCategorieCivilisations(!categorieCivilisations)}
          />
          <CheckBox
            title='Classique'
            checkedIcon='check-square'
            uncheckedIcon='square'
            checkedColor='#EFB509'
            uncheckedColor='#dfe4ea'
            checked={categorieClassique}
            onPress={() => setCategorieClassique(!categorieClassique)}
          />
          <CheckBox
            title='Comédie'
            checkedIcon='check-square'
            uncheckedIcon='square'
            checkedColor='#EFB509'
            uncheckedColor='#dfe4ea'
            checked={categorieComedie}
            onPress={() => setCategorieComedie(!categorieComedie)}
          />
          <CheckBox
            title='Contemporain'
            checkedIcon='check-square'
            uncheckedIcon='square'
            checkedColor='#EFB509'
            uncheckedColor='#dfe4ea'
            checked={categorieContemporain}
            onPress={() => setCategorieContemporain(!categorieContemporain)}
          />
          <CheckBox
            title='Drame'
            checkedIcon='check-square'
            uncheckedIcon='square'
            checkedColor='#EFB509'
            uncheckedColor='#dfe4ea'
            checked={categorieDrame}
            onPress={() => setCategorieDrame(!categorieDrame)}
          />
          <CheckBox
            title='Fantastique'
            checkedIcon='check-square'
            uncheckedIcon='square'
            checkedColor='#EFB509'
            uncheckedColor='#dfe4ea'
            checked={categorieFantastique}
            onPress={() => setCategorieFantastique(!categorieFantastique)}
          />
          <CheckBox
            title='Histoire'
            checkedIcon='check-square'
            uncheckedIcon='square'
            checkedColor='#EFB509'
            uncheckedColor='#dfe4ea'
            checked={categorieHistoire}
            onPress={() => setCategorieHistoire(!categorieHistoire)}
          />
          <CheckBox
            title='Musical'
            checkedIcon='check-square'
            uncheckedIcon='square'
            checkedColor='#EFB509'
            uncheckedColor='#dfe4ea'
            checked={categorieMusical}
            onPress={() => setCategorieMusical(!categorieMusical)}
          />
          <CheckBox
            title='Musique Française'
            checkedIcon='check-square'
            uncheckedIcon='square'
            checkedColor='#EFB509'
            uncheckedColor='#dfe4ea'
            checked={categorieMusiqueFrancaise}
            onPress={() => setCategorieMusiqueFrancaise(!categorieMusiqueFrancaise)}
          />
          <CheckBox
            title='Musique Urbaine'
            checkedIcon='check-square'
            uncheckedIcon='square'
            checkedColor='#EFB509'
            uncheckedColor='#dfe4ea'
            checked={categorieMusiqueUrbaine}
            onPress={() => setCategorieMusiqueUrbaine(!categorieMusiqueUrbaine)}
          />
          <CheckBox
            title='One-Man Show'
            checkedIcon='check-square'
            uncheckedIcon='square'
            checkedColor='#EFB509'
            uncheckedColor='#dfe4ea'
            checked={categorieOneManShow}
            onPress={() => setCategorieOneManShow(!categorieOneManShow)}
          />
          <CheckBox
            title='Pop'
            checkedIcon='check-square'
            uncheckedIcon='square'
            checkedColor='#EFB509'
            uncheckedColor='#dfe4ea'
            checked={categoriePop}
            onPress={() => setCategoriePop(!categoriePop)}
          />
          <CheckBox
            title='Rock'
            checkedIcon='check-square'
            uncheckedIcon='square'
            checkedColor='#EFB509'
            uncheckedColor='#dfe4ea'
            checked={categorieRock}
            onPress={() => setCategorieRock(!categorieRock)}
          />
          <CheckBox
            title='Science-Fiction'
            checkedIcon='check-square'
            uncheckedIcon='square'
            checkedColor='#EFB509'
            uncheckedColor='#dfe4ea'
            checked={categorieScienceFiction}
            onPress={() => setCategorieScienceFiction(!categorieScienceFiction)}
          />
        </View>
      </ScrollView>

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <TouchableOpacity
          style={{
            width: '100%', height: 40, backgroundColor: '#D70026',
            alignItems: 'center', justifyContent: 'center'
          }}
          onPress={() => props.navigation.navigate('ProfileMainScreen')}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Valider les changements</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}


function mapStateToProps(state){
  return {
    token: state.tokenReducer,
    user : state.userReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
      updateStoreUser: function (user) {
        dispatch({ type: 'user', user })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePreferenceScreen);