import React from 'react';
import { View, ScrollView, Button } from 'react-native';
import { Text } from 'react-native-elements';

export default function PlanDetailScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>

      <Button title="Go to PlanMainScreen"
        onPress={() => navigation.navigate('PlanMainScreen')}
      />      
      <Button title="Go to PlanInvitationScreen"
        onPress={() => navigation.navigate('PlanInvitationScreen')}
      />
      <Button title="Go to PlanOrgaScreen"
        onPress={() => navigation.navigate('PlanOrgaScreen')}
      />

      <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Plan join screen
      </Text>
      </ScrollView>
    </View>
  );
}