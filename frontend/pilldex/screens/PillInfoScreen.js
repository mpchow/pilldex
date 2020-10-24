import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function PillInfoScreen({ navigation, route }) {
  const { pillName, pillAmount } = route.params;

  const [info, setInfo] = useState(() => {
    //do get request here with pill name
    return {refillAmount: 30, frequency: 3, frequencyUnits: "Daily", withFood: true, withSleep: true, lastRefill: "10-23-2020"};
  });

  function instructions(){
    return info.withFood && info.withSleep ? <View>
                                    <Text style={styles.text}>This medication will make you drowsy.</Text>
                                    <Text style={styles.text}>Take with food.</Text>
                                  </View>
          : info.withFood ? <Text style={styles.text}>Take with food.</Text>
          : info.withSleep ? <Text style={styles.text}>This medication will make you drowsy.</Text>
          : null;
  }

  return (
    
    <View style={styles.container}>

      <Text style={styles.title}>{pillName}</Text>

      <View style={{flexDirection: 'row', paddingTop: 20}}>
          <MaterialCommunityIcons name="pill" color='#84C0C6' size={40} />
          <Text style={styles.colorText}> {pillAmount} </Text>
          <Text style={styles.text}> Units Left</Text>
      </View>

      <View style={{flex: 1, paddingLeft: 20}}>
        <View style={{height: 50, width: Dimensions.get('window').width}}/>
        <View style={styles.instruction}>
          <Text style={styles.subHeading}>Refill Size: </Text>
          <Text style={styles.text}>{info.refillAmount}</Text>
        </View>

        <View style={{paddingBottom: 30}}>
          <Text style={styles.subHeading}>Instructions: </Text>
          <View style={{paddingLeft: 30}}>
            <Text style={styles.text}>Take {info.frequency} units {info.frequencyUnits}.</Text>
            {instructions()}
          </View>
        </View>

        <View style={styles.instruction}>
          <Text style={styles.subHeading}>Last Refill: </Text>
          <Text style={styles.text}>{info.lastRefill}</Text>
        </View>
      </View>
     
      <View style={{flexDirection: 'row', padding: 10, justifyContent:'space-between'}}>
        <TouchableOpacity style={styles.button}
                          onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>BACK</Text>
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
