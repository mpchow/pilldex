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

import firebase, { utils } from '@react-native-firebase/app';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get('window').width;

function PillboxScreen( {navigation } ) {


  const needRefill = 5; //below this amount, the text is red

  const [pills, setPills] = useState([]);
  console.log("PIll is", pills);

  function getPills(){
   
    fetch(`http://ec2-35-183-198-103.ca-central-1.compute.amazonaws.com:3000/pills?userId=${firebase.auth().currentUser.uid}`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {

      console.log("Response from server is", responseJson['pill']);
      setPills(responseJson['pill']);
     
    })
    .catch((error) => {
         console.error(error);
    });
 
  }

  useEffect(() => {
    console.log("Inside useEffect function");
    getPills();
    

  }, []);

  function showInfo(pillName){
    fetch(`http://ec2-35-183-198-103.ca-central-1.compute.amazonaws.com:3000/pills/single?userId=${firebase.auth().currentUser.uid}&name=${pillName}`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("Response from server is", responseJson['pill']);
      navigation.navigate("PillInfo", {pillInfo: { ...responseJson['pill'], pillsLeft:50}});
    })
    .catch((error) => {
         console.error(error);
    });
  }
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
                    <Text style={{color: item.totalQuantity <= needRefill ? 'red' : 'black'}}>{item.totalQuantity} Capsules Left</Text>
                  </View>
                  <TouchableOpacity style={{flexDirection: 'row'}}
                                    onPress={() => showInfo(item.name)}>
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
