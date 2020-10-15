import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Logo() {
  return (
    <View style={styles.circle}>
      <MaterialCommunityIcons name="pill" color='#84C0C6' size={60} />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderRadius: 40,
    borderColor: '#84C0C6'
  }
});

export default Logo;
