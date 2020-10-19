import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

function CheckPillScreen({ navigation }) {

  const [name, setName] = useState("");
  const [refillUnits, setRefillUnits] = useState("");
  const [freq, setFreq] = useState("");

  const [freqButton, setFreqButton] = useState(null);
  const [foodButton, setFoodButton] = useState(null);
  const [drowsyButton, setDrowsyButton] = useState(null);

  return (
    <ScrollView>
      <View  style={styles.container}>
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
            onChangeText = {(text) => setFreq(text)}
          />
          <Text style={styles.text}>  units,</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: -15}}>
          <TouchableOpacity style={freqButton == "Daily" ? styles.radioButtonPressed : styles.radioButtonUnPressed} onPress={()=>setFreqButton("Daily")}/>
          <Text style={styles.radioText}>  Daily</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style={freqButton == "Weekly" ? styles.radioButtonPressed : styles.radioButtonUnPressed} onPress={()=>setFreqButton("Weekly")} />
          <Text style={styles.radioText}>  Weekly</Text>
        </View>
        <View style={{height: 20}} />

        <Text style={styles.form_titles}>4 - Take with Food?</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <TouchableOpacity style={foodButton == "Yes" ? styles.radioButtonPressed : styles.radioButtonUnPressed} onPress={()=>setFoodButton("Yes")}/>
          <Text style={styles.radioText}>  Yes</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style={foodButton == "No" ? styles.radioButtonPressed : styles.radioButtonUnPressed} onPress={()=>setFoodButton("No")} />
          <Text style={styles.radioText}>  No</Text>
        </View>
        <View style={{height: 20}} />

        <Text style={styles.form_titles}>5 - Does it make you drowsy?</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <TouchableOpacity style={drowsyButton == "Yes" ? styles.radioButtonPressed : styles.radioButtonUnPressed} onPress={()=>setDrowsyButton("Yes")}/>
          <Text style={styles.radioText}>  Yes</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style={drowsyButton == "No" ? styles.radioButtonPressed : styles.radioButtonUnPressed} onPress={()=>setDrowsyButton("No")} />
          <Text style={styles.radioText}>  No</Text>
        </View>
        <View style={{height: 20}} />

      </View>
      
      <View style={{flexDirection: 'row', padding: 10, justifyContent:'space-between'}}>
        <TouchableOpacity style={styles.button}
                          onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
                          onPress={() => console.log(freqButton, foodButton)}>
          <Text style={styles.btnText}>VERIFY</Text>
        </TouchableOpacity>
      </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontFamily: 'Inter-Light',
  },
  text: {
    fontFamily: 'Quicksand', 
    fontSize: 20, color: '#000000', 
    paddingTop: 26,
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
  },
  radioButtonPressed:{
    backgroundColor: '#538083',
    borderRadius: 100,
    height: 20,
    width: 20,
    marginTop: 0
  },
  radioButtonUnPressed:{
    borderRadius: 100,
    height: 20,
    width: 20,
    marginTop: 0,
    borderWidth: 1.5,
    borderColor: '#538083',
  },
  radioText: {
    fontFamily: 'Quicksand', 
    fontSize: 20, color: '#000000', 
  }
});

export default CheckPillScreen;
