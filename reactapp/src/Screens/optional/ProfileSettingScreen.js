import React from 'react';
import { View, ScrollView, Button } from 'react-native';
import { Text } from 'react-native-elements';

export default function ProfileSettingScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>

      <Button title="Go to ProfileMainScreen"
        onPress={() => navigation.navigate('ProfileMainScreen')}
      />
      <Button title="Go to ProfileAvatarModifScreen"
        onPress={() => navigation.navigate('ProfileAvatarModifScreen')}
      />      
      <Button title="Go to ProfilePreferenceScreen"
        onPress={() => navigation.navigate('ProfilePreferenceScreen')}
      />      

      <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Profile setting screen
        </Text>
      </ScrollView>

    </View>
  );
}