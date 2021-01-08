import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-elements';

export default function ProfileAvatarMofidScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>

      <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Profile avatar modification screen
        </Text>
        <Button 
          type='outline'
          title="valider"
          buttonStyle={{ backgroundColor: "#EFB509" }}
          titleStyle={{ color: 'white' }}
          onPress={() => navigation.navigate('ProfileMainScreen')}
        />      
      </ScrollView>

    </View>
  );
}