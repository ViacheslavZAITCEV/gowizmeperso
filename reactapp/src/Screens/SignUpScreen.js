import React, { useState } from 'react';
// import { div, ScrollView, KeyboardAvoidingView, TouchableOpacity, AsyncStorage  } from 'react-native';
import { Input, Button } from 'antd';
// import { SafeAreaView } from 'react-native-safe-area-context';

//Initialisation de Redux
import { connect } from 'react-redux';

import urlLocal from '../urlDevsGoWizMe'

function SignUpScreen(props) {

    const [signUpUserFirstname, setSignUpUserFirstname] = useState('')
    const [signUpUserLastname, setSignUpUserLastname] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')
    const [signUpCity, setSignUpCity] = useState('')

    const [isVisible, setVisible] = useState(false);
    const [textModal, setTextModal] = useState('');

    const [userExists, setUserExists] = useState(false)

    var handleSubmitSignup = async () => {

        const data = await fetch(`${urlLocal}/users/sign-up`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `prenom=${signUpUserFirstname}&nom=${signUpUserLastname}&email=${signUpEmail}&password=${signUpPassword}&ville=${signUpCity}`
        })

        const body = await data.json()

        if (body.response) {
            AsyncStorage.setItem('user', body.token);
            setUserExists(true)
            //si l'utilisateur a bien été enregistré en BDD (le sign-up a fonctionné), on appelle la fonction 'addToken' comme propriété de Redux et on ajoute dans Redux le token reçu du backend
            props.addToken(body.token);
            props.addIdUser(body._id);
            // props.addUser(userBE);
            console.log('user est enregistré');
            props.navigation.navigate('AfficheMainScreen');
        } else {
            setErrorsSignup(body.error)
        }

    }

    // if (userExists) {
    //     return <Redirect to='/AfficheMainScreen' />
    // }

    return (
        <div style={{ flex: 1 }}>

            <div style={{ backgroundColor: '#E55039' }}>
                <p style={{ color: 'white', textAlign: 'center', fontSize: 18, fontWeight: 'bold', maxWidth: "100%", marginTop: 10, marginBottom: 10 }}>
                    CREER MON PROFIL
                </p>
            </div>

            {/* <ScrollView contentContainerStyle={{ flexDirection: 'row', alignItems: 'flex-start'}}>
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1, justifyContent: 'center' }}>
                    <SafeAreaView> */}
                        <Input label="prénom" placeholder="entrer mon prénom"
                            onChangeText={(val) => setSignUpUserFirstname(val)} />
                        <Input label="nom" placeholder="entrer mon nom"
                            onChangeText={(val) => setSignUpUserLastname(val)} />
                        <Input label="ville de résidence" placeholder="entrer ma ville"
                            onChangeText={(val) => setSignUpCity(val)} />
                        <Input label="e-mail" placeholder="entrer mon adresse e-mail"
                            onChangeText={(val) => setSignUpEmail(val)} />
                        <Input label="mot de passe" placeholder="entrer mon mot de passe" secureTextEntry={true}
                            onChangeText={(val) => setSignUpPassword(val)} />
                    {/* </SafeAreaView>
                </KeyboardAvoidingView>
            </ScrollView> */}

            <div style={{ flex: 1, justifyContent: 'flex-end' }}>
                {/* <TouchableOpacity
                    onPress={() => handleSubmitSignup()}
                    style={{
                        width: '100%', height: 40, backgroundColor: '#D70026',
                        alignItems: 'center', justifyContent: 'center'
                    }}
                > */}
                    <p style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Inscription</p>
                {/* </TouchableOpacity> */}
            </div>
        </div>
    );
}

//Mise en place du composant conteneur qui va “englober” SignUpScreen
function mapDispatchToProps(dispatch) {
    return {
        // création de la fonction qui va devoir recevoir une info afin de déclencher une action nommée addToken qui enverra cette information auprès de Redux comme propriété
        addToken: function (token) {
            dispatch({ type: 'saveToken', token })
        },
        addIdUser: function (idUser) {
            dispatch({ type: 'addIdUser', idUser })
        }
    }
}

// function mapStateToProps(state) {
//   return { SignUpScreen: state.city }
// }

//export modifié pour l’appliquer au composant conteneur
export default connect(
    null,
    mapDispatchToProps
)(SignUpScreen);