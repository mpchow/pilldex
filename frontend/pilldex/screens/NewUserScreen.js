import React, {useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';

function NewUserScreen({ navigation }) {

  const { register } = useContext(AuthContext);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>New User Screen</Text>
    </View>
  );
}

export default NewUserScreen;
