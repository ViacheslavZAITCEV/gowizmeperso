import React from 'react';
import { View, ScrollView, Button } from 'react-native';
import { Text } from 'react-native-elements';

export default function AfficheByTypeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>

      <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Affiche by type screen
        </Text>
      </ScrollView>
      
    </View>
  );
}