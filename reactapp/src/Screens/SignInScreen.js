import React, { useState, useEffect } from 'react';
// import { View, AsyncStorage, ScrollView, Button, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import {Button,  Input } from 'antd';
// import { SafeAreaView } from 'react-native-safe-area-context';

//Initialisation de Redux
import { connect } from 'react-redux';

import urlLocal from '../urlDevsGoWizMe'

function SignInScreen(props, { navigation, addToken }) {

    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')

    const [userExists, setUserExists] = useState(false)

    const [listErrorsSignin, setErrorsSignin] = useState('')


    useEffect(() => {
        function goToBack() {
            if (props.token) {
                props.navigation.navigate('AfficheMainScreen');
            }
        }
        goToBack();
    }, [props.token])


    var handleSubmitSignin = async () => {

        console.log('function handleSubmitSignin');
        const data = await fetch(`${urlLocal}/users/sign-in`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `email=${signInEmail}&password=${signInPassword}`
        })
        const body = await data.json()

        console.log('reponse Backend:', body);
        if (body.response === true) {
            try {
                AsyncStorage.setItem('user', body.token);
            } catch (e) {
                console.log(e);
            }
            setUserExists(true);

            //si l'utilisateur arrive à sign-in, on appelle la fonction 'addToken' comme propriété de Redux et on ajoute dans Redux le token reçu du backend
            props.addToken(body.token);
            props.addIdUser(body._id);
            console.log('user est connecté');
            // props.navigation.goBack();
        } else {
            setErrorsSignin(body.error)
        }
    }

    // if (userExists) {
    //     return <Redirect to='/AfficheMainScreen' />
    // }


    // var tabErrorsSignin = listErrorsSignin.map((error, i) => {
    //     return (<p>{error}</p>)
    // })

    return (
        <div style={{ flex: 1 }}>

            <div style={{ backgroundColor: '#E55039' }}>
                <p style={{ color: 'white', textAlign: 'center', fontSize: 18, fontWeight: 'bold', maxWidth: "100%", marginTop: 10, marginBottom: 10 }}>
                    SE CONNECTER
                </p>
            </div>

            {/* <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> */}
                {/* <KeyboardAvoidingView behavior="padding" style={{ flex: 1, justifyContent: 'center' }}> */}
                    {/* <SafeAreaView> */}
                        <Input label="e-mail" placeholder="entrer mon adresse e-mail"
                            onChangeText={(val) => setSignInEmail(val)} />

                        <Input label="mot de passe" placeholder="entrer mon mot de passe" secureTextEntry={true}
                            onChangeText={(val) => setSignInPassword(val)} />
                        <Button
                            title="Pas encore de profil? Créer mon profil"
                            onPress={() => props.navigation.navigate('SignUpScreen')}
                        />
                    {/* </SafeAreaView> */}
                {/* </KeyboardAvoidingView> */}
            {/* </ScrollView> */}

            <div style={{ flex: 1, justifyContent: 'flex-end' }}>
                {/* <TouchableOpacity */}
                    {/* onPress={() => handleSubmitSignin()}
                    style={{
                        width: '100%', height: 40, backgroundColor: '#D70026',
                        alignItems: 'center', justifyContent: 'center'
                    }}
                > */}
                    <p style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Connexion</p>
                {/* </TouchableOpacity> */}
            </div>

        </div>
    );
}

//Mise en place du composant conteneur qui va “englober” SignInScreen
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

//export modifié pour l’appliquer au composant conteneur
export default connect(
    null,
    mapDispatchToProps
)(SignInScreen);