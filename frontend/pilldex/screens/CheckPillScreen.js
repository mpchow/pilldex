import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

function CheckPillScreen({ navigation }) {

  const [name, setName] = useState("");
  const [refillUnits, setRefillUnits] = useState("");
  const [freqUnits, setFreqUnits] = useState("");
  const [freq, setFreq] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Prescription</Text>

      <View style={{height: 30}} />

      <View style={styles.form_container}>

        <Text style={styles.form_titles}>1 - Medication Name</Text>
        <TextInput
          placeholder = "Medication Name"
          style= {styles.input}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText = {(text) => setName(text)}
        />

        <Text style={styles.form_titles}>2 - Number of Units in Refill</Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            placeholder = "Units"
            style= {styles.number_input}
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='numeric'
            onChangeText = {(text) => setRefillUnits(text)}
          />
          <Text style={styles.text}>  units</Text>
        </View>
          
        <Text style={styles.form_titles}>3 - Frequency</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>Take  </Text>
          <TextInput
            placeholder = "Units"
            style= {styles.number_input}
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='numeric'
            onChangeText = {(text) => setFreqUnits(text)}
          />
          <Text style={styles.text}>  units,</Text>
        </View>

        <Text style={styles.form_titles}>4 - Take with Food?</Text>

      </View>
      
      <View style={{flexDirection: 'row', padding: 20, justifyContent:'space-between'}}>
        <TouchableOpacity style={styles.button}
                          onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
                          onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>VERIFY</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingTop: 15
  },
  title: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 35,
    color: '#538083'
  },
  form_container: {
    flex: 1,
  },
  form_titles: {
    fontFamily: 'Quicksand',
    fontSize: 20,
    color: '#538083',
    textDecorationLine: "underline",
  },
  input: {
    width: 315,
    height: 38,
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 5,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,
    fontFamily: 'Inter-Light'
  },
  number_input: {
    width: 53,
    height: 38,
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 5,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,
    fontFamily: 'Inter-Light'
  },
  text: {
    fontFamily: 'Quicksand', 
    fontSize: 20, color: '#000000', 
    paddingTop: 26
  },
  button: {
    height: 60,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9FB7B9',
    borderRadius: 35,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5
  },
  btnText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  }
});

export default CheckPillScreen;
