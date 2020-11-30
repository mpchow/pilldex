import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
  Alert
} from 'react-native';

import firebase, { utils } from '@react-native-firebase/app';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const width = Dimensions.get('window').width;

function PillboxScreen( {navigation } ) {

  const needRefill = 5; //below this amount, the text is red

  const [pills, setPills] = useState([]);
  console.log("Pill is", pills);

  function deletePills(pillName) {
    var arr = [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK', onPress: () => {
          fetch('http://ec2-3-96-185-233.ca-central-1.compute.amazonaws.com:3000/pills', {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: pillName,
              userId: firebase.auth().currentUser.uid
            })
          })
          .catch((error) => {
            console.error(error);
          });
          getPills(); //call get pills to refresh the screen
        }
    }];

    Alert.alert(
      `Delete ${pillName}`,
      `Are you sure you want to delete ${pillName}?`,
      arr
    );
  }

  function getPills() { // RESPONSE FROM SERVER UNDEFINED

    fetch(`http://ec2-3-96-185-233.ca-central-1.compute.amazonaws.com:3000/pills?userId=${firebase.auth().currentUser.uid}`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      console.log("Response from server is", responseJson['pills']);
      setPills(responseJson['pills']);

    })
    .catch((error) => {
         console.error(error);
    });

  }

  useEffect(() => {
    console.log("Inside useEffect function");
    getPills();


  }, []);

  function showInfo(pillName) {
    fetch(`http://ec2-3-96-185-233.ca-central-1.compute.amazonaws.com:3000/pills/single?userId=${firebase.auth().currentUser.uid}&name=${pillName}`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("Response from server is (and going to pillinfo)", responseJson['pill']);
      navigation.navigate("PillInfo", {pillInfo: responseJson['pill']});
    })
    .catch((error) => {
         console.error(error);
    });
  }
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.title}>Patient's Pillbox</Text>
        <TouchableOpacity testID="Refresh" style={{paddingTop: 38, paddingLeft: 15}} onPress={()=>{getPills()}}>
          <AntDesign name="sync" size={26} color="#46B1C9"/>
        </TouchableOpacity>
      </View>
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
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.medName}>{item.name}</Text>
                    <TouchableOpacity testID="Delete-Pill" style={{position: 'absolute', left: 225, top: 7}} onPress={()=>{deletePills(item.name)}}>
                      <AntDesign name="close" size={25} color="#ba0c00"/>
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: item.remaining <= needRefill ? 'red' : 'black'}}>{item.remaining} Capsules Left</Text>
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
    <View style={{height: 30}} />
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
