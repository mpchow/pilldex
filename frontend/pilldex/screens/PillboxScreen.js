import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get('window').width;

function PillboxScreen( {navigation} ) {

  const needRefill = 5; //below this amount, the text is red

  const [pills, setPills] = useState(() => [
    {id: 0, name: "INDOMETHACIN", capsulesLeft: 15},
    {id: 1, name: "VICODIN", capsulesLeft: 2},
    {id: 1, name: "NITROGLYCERIN", capsulesLeft: 5},
    {id: 1, name: "AMOXICILLIN", capsulesLeft: 26},
    {id: 1, name: "IBUPROFEN", capsulesLeft: 85}
  ]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient's Pillbox</Text>
      <SafeAreaView style={{flex: 1}} >
        <FlatList
          data={pills}
          extradata={pills}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.notifBox}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 15}}>
                <MaterialCommunityIcons name="pill" color='#84C0C6' size={40} />
                <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-evenly', marginLeft: 8}}>
                  <Text style={styles.medName}>{item.name}</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: item.capsulesLeft <= needRefill ? 'red' : 'black'}}>{item.capsulesLeft} Capsules Left</Text>
                  </View>
                  <TouchableOpacity style={{flexDirection: 'row'}}
                                    onPress={() => navigation.navigate("PillInfo", {pillName: item.name, pillAmount: item.capsulesLeft})}>
                    <Text style={styles.details}>More Details</Text>
                    <View style = {{width: 10}}/>
                    <Icon name="arrow-right" size={15} color="#538083" style={{paddingTop: 4}}/>
                  </TouchableOpacity>  
                </View>
              </View>
            </View>
            
          )}
        />
      </SafeAreaView>
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
  notifBox: {
    width: width - 60,
    height: 100,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#84C0C6',
    marginTop: 23
  },
  medName: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 28,
    color: '#538083'
  },
  details: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: "#538083"
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

export default PillboxScreen;
