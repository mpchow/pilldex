import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

function NewPillScreen({ navigation }) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Add Pill Screen</Text>
      <TouchableOpacity style={styles.button}
                        onPress={() => navigation.navigate('CheckPill')}>
        <Text style={styles.btnText}>ADD PILL</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
                        onPress={() => navigation.goBack()}>
        <Text style={styles.btnText}>GO BACK</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9FB7B9',
    borderRadius: 35,
    marginTop: 10
  },
  btnText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  }
});

export default NewPillScreen;
