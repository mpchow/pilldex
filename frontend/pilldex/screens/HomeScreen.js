import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';

const width = Dimensions.get('window').width;

function HomeScreen({ navigation }) {
  const { logout } = useContext(AuthContext);
  const [date, setDate] = useState({});
  const dayArray = ["Sunday", "Monday", "Tuesday",
                    "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthArray = ["January", "February", "March", "April", "May",
                      "June", "July", "August", "September", "October",
                      "November", "December"];

  // in progress
  /*useEffect(() => {
    const now = new Date();
    var dateObj = {
      dayOfWeek: dayArray[now.getDay()], // string
      month: monthArray[now.getMonth()], // string
      date: now.getDate(), // number
      year: now.getFullYear() // number
    };
    setDate(dateObj);
  });*/

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Pilldex</Text>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.options}>Main</Text>
        <Text style={styles.options}
              onPress={() => navigation.navigate('Notifications')}>
              Notifications
        </Text>
      </View>
      <View style={styles.line} />
      <View style={styles.pageSelector} />

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.button}
                          onPress={() => logout()}>
          <Text style={styles.btnText}>LOG OUT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
                          onPress={() => navigation.navigate('NewPill')}>
          <Text style={styles.btnText}>NEW PILL</Text>
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
    width: 55,
    borderRadius: 4,
    backgroundColor: '#538083',
    marginTop: -5,
    marginLeft: -187
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

export default HomeScreen;
