import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import firebase, { utils } from '@react-native-firebase/app';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function PillInfoScreen({ navigation, route }) {
  
  const { pillInfo } = route.params;

  const [pillsLeft, setPillsLeft] = useState(pillInfo.remaining);

  function instructions(){
    return pillInfo.withFood && pillInfo.withSleep ? <View>
                                    <Text style={styles.text}>This medication will make you drowsy.</Text>
                                    <Text style={styles.text}>Take with food.</Text>
                                  </View>
          : pillInfo.withFood ? <Text style={styles.text}>Take with food.</Text>
          : pillInfo.withSleep ? <Text style={styles.text}>This medication will make you drowsy.</Text>
          : null;
  }
  
  //TODO: FIX THIS FUNCTION
  function refillPill() {
    
    setPillsLeft(pillsLeft => pillsLeft + pillInfo.totalQuantity);
    console.log(`pills left are ${pillsLeft}`);
    fetch('http://ec2-3-96-185-233.ca-central-1.compute.amazonaws.com:3000/pills', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: pillInfo.name,
        userId: firebase.auth().currentUser.uid,
        totalQuantity: pillInfo.totalQuantity,
        remaining: pillsLeft,
        frequency: pillInfo.frequency,
        frequencyUnit: pillInfo.frequencyUnit,
        withFood: pillInfo.withFood,
        withSleep: pillInfo.withSleep,
        dosage: pillInfo.dosage,
      })
    })
    .catch((error) => {
      console.error(error);
    }) 
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>{pillInfo.name}</Text>

      <View style={{flexDirection: 'row', paddingTop: 20}}>
          <MaterialCommunityIcons name="pill" color='#84C0C6' size={40} />
          <Text style={styles.colorText}> {pillsLeft} </Text>
          <Text style={styles.text}> Units Left</Text>
      </View>

      <View style={{flex: 1, paddingLeft: 20}}>
        <View style={{height: 50, width: Dimensions.get('window').width}}/>
        <View style={styles.instruction}>
          <Text style={styles.subHeading}>Refill Size: </Text>
          <Text style={styles.text}>{pillInfo.totalQuantity}</Text>
        </View>

        <View style={{paddingBottom: 30}}>
          <Text style={styles.subHeading}>Instructions: </Text>
          <View style={{paddingLeft: 30}}>
            <Text style={styles.text}>Take {pillInfo.frequency} units {pillInfo.frequencyUnit}.</Text>
            {instructions()}
          </View>
        </View>

        <View style={styles.instruction}>
          <Text style={styles.subHeading}>Last Refill: </Text>
          <Text style={styles.text}>{pillInfo.lastRefill || "GET FROM SERVER"}</Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', padding: 10, justifyContent:'space-between'}}>
        <TouchableOpacity style={styles.button}
                          onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
                          onPress={() => refillPill()}>
          <Text style={styles.btnText}>REFILL</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 40,
    color: '#46B1C9',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 10
  },
  text: {
    fontFamily: 'Quicksand',
    fontSize: 24,
    color: '#000000',
    paddingTop: 5,
  },
  colorText: {
    fontFamily: 'Quicksand',
    fontSize: 24,
    color: '#538083',
    paddingTop: 5,
    fontWeight: 'bold'
  },
  subHeading: {
    fontFamily: 'Quicksand',
    fontSize: 26,
    color: '#538083',
    paddingTop: 2
  },
  instruction:{
    flexDirection: 'row',
    paddingBottom: 30
  },
  button: {
    height: 60,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9FB7B9',
    borderRadius: 35,
    marginTop: 10,
    marginLeft: 5
  },
  btnText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  }
});

export default PillInfoScreen;
