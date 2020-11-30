import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import { NotifProvider } from '../components/notifContext.js';

const width = Dimensions.get('window').width;

function NotificationsScreen({ navigation }) {
  //var notifications = ["hello", "medicine"];
  const { allNotifs } = useContext(NotifProvider);
  const isFocused = useIsFocused();
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    console.log("inside notifications useEffect");
    console.log(allNotifs);
    setNotifs(allNotifs);
  }, [isFocused]);
  /*useEffect(() => {
    fetch(`http://ec2-3-96-185-233.ca-central-1.compute.amazonaws.com:3000/users?userId=${firebase.auth().currentUser.uid}`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("Response from server is", responseJson);
      console.log(responseJson["user"]["schedule"]);
      console.log(responseJson["user"]["schedule"][0]);
    })
    .catch((error) => {
         console.error(error);
    });
  }, []);*/



  return (
    <View style={styles.container}>
      <View style={{height: 20}} />
      <Text style={styles.title}>My Pilldex</Text>
      <View style={{height: 10}} />
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.options} onPress={() => navigation.navigate('Home')}>Main</Text>
        <Text style={styles.options}>Notifications</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.pageSelector} />
      <View style={{height: 10}} />
      <FlatList
        data={notifs}
        extradata={notifs}
        keyExtractor={(item) => Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.listElem}>
            <Text style={styles.notifText}>{item}</Text>
          </View>
        )}
      />
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
    textAlign: 'center'
  },
  options: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 20,
    marginHorizontal: 35,
  },
  line: {
    height: 0.75,
    width: width,
    backgroundColor: '#A2E1E2',
    marginTop: 5
  },
  pageSelector: {
    height: 8,
    width: 120,
    borderRadius: 4,
    backgroundColor: '#538083',
    marginTop: -5,
    marginLeft: 115
  },
  listElem: {
    height: 40,
    width: 350,
    borderRadius: 15,
    borderColor: '#9FB7B9',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  notifText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    textAlign: 'center'
  }
});

export default NotificationsScreen;
