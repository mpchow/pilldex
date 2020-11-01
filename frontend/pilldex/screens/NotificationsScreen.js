import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import auth from '@react-native-firebase/auth';

const width = Dimensions.get('window').width;

function NotificationsScreen({ navigation }) {

  /*useEffect(() => {
    fetch(`http://ec2-3-96-185-233.ca-central-1.compute.amazonaws.com:3000/users?userId=${firebase.auth().currentUser.uid}`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("Response from server is", responseJson);
    })
    .catch((error) => {
         console.error(error);
    });
  });*/

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
});

export default NotificationsScreen;
