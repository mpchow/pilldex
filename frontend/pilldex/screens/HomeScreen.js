import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import PNController, { displayNotification } from '../components/PNController.js';

const width = Dimensions.get('window').width;
/* Notification: userID, time closed, notification ID
 * 'http://ec2-3-96-185-233.ca-central-1.compute.amazonaws.com:3000/pills/label
 * takenEarly: true
*/
function HomeScreen({ navigation }) {

  const dayArray = ["Sunday", "Monday", "Tuesday",
                    "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthArray = ["January", "February", "March", "April", "May",
                      "June", "July", "August", "September", "October",
                      "November", "December"];
  const [date, setDate] = useState(() => {
    const now = new Date();
    return ({
      dateObj: now,
      dayOfWeek: dayArray[now.getDay()], // string
      month: monthArray[now.getMonth()], // string
      date: now.getDate(), // number
      year: now.getFullYear() // number
    });
  });

  const [schedule,setSchedule] = useState([]);
  const [notifs, setNotifs] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchSchedule();
  }, [refresh]);

  console.log(date);

  function fetchSchedule() {
    fetch(`http://ec2-3-96-185-233.ca-central-1.compute.amazonaws.com:3000/users?userId=${firebase.auth().currentUser.uid}`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson["user"] == null || responseJson["user"] == undefined)
        return;
      console.log("Response from server is", responseJson["user"]["schedule"]);
      setSchedule(responseJson["user"]["schedule"]);
      formatNotifs(responseJson["user"]["schedule"]);
    })
    .catch((error) => {
      console.error(error);
      setSchedule([]);
    });
  }

  function formatNotifs(data) {
    var d = date.dateObj.getDay();
    var ret = [];

    if (data[d] == undefined)
      return;

    data[d].forEach((e) => {
      //const t = Date.parse(e["time"]["reminderTime"]);
      //const time = new Date(t);
      var dateString = "";

      var mins = e["time"]["reminderTime"]["minute"];
      var hours = parseInt(e["time"]["reminderTime"]["hour"], 10);
      if (mins < 10)
        mins = "0" + mins;

      if (hours > 12)
        dateString = (hours - 12) + ":" + mins + " PM";
      else
        dateString = hours + ":" + mins + " AM";

      ret.push({id: e['_id'], name: e['pillName'], food: true,
               drowsy: true, done: e['takenEarly'], dateString: dateString});
    });

    setNotifs(ret);
  }

  function toggleDate(dir) {
    var newDate = date.dateObj;
    newDate.setDate(date.dateObj.getDate() + dir);
    setDate({
      dateObj: newDate,
      dayOfWeek: dayArray[newDate.getDay()],
      month: monthArray[newDate.getMonth()],
      date: newDate.getDate(),
      year: newDate.getFullYear()
    });
    formatNotifs(schedule);
  }

  // set item.done to true and move notif to end of array
  // ids of existing notifs also need to change?? idksksjsjj
  function closeNotification(index) {
    var item = notifs[index];
    if (!item.done) {
      item.done = true;
      setNotifs(prevItems => {
        return prevItems.filter(item => item.id != index);
      });

      item.id = notifs.length;
      setNotifs(prevItems => {
        return [...prevItems, item];
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={{height: 20}} />
      <Text style={styles.title}>My Pilldex</Text>
      <View style={{height: 10}} />
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.options}>Main</Text>
        <Text style={styles.options}
              onPress={() => navigation.navigate('Notifications')}>
              Notifications
        </Text>
      </View>
      <View style={styles.line} />
      <View style={styles.pageSelector} />

      <View style={{height: 5}} />
      <View style={styles.subHeading}>
        <SimpleLineIcons style={styles.arrow1} name="arrow-left" colour='#000' size={26}
                         onPress={() => toggleDate(-1)} />
        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.dayText}>{date.dayOfWeek}</Text>
          <Text style={styles.dateText}>{date.month} {date.date}, {date.year}</Text>
        </View>
        <SimpleLineIcons style={styles.arrow2} name="arrow-right" colour='#000' size={26}
                         onPress={() => toggleDate(1)} />
      </View>
      <View style={{height: 0.75, width: width - 60, backgroundColor: '#000', marginTop: 5}} />

      <FlatList
        data={notifs}
        extradata={notifs}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.notifBox}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
              <TouchableOpacity style={item.done ? styles.checkDone : styles.checkBox}
                                onPress={() => closeNotification(item.id)}/>
              <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-evenly', marginLeft: 8}}>
                <Text style={styles.medName}>{item.name}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <Ionicons name="alarm-outline" color="#000" size={25} />
                  <Text style={styles.pillTime}>{item.dateString}</Text>
                </View>
                <Text>{item.food && item.drowsy ? "Take with Food, Causes Drowsiness" :
                       item.drowsy ? "Causes Drowsiness" :
                       item.food ? "Take with Food" : ""}</Text>
              </View>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button}
                        onPress={() => navigation.navigate('NewPill')}>
        <Text style={styles.btnText}>NEW PILL</Text>
      </TouchableOpacity>
      <View style={{height:10}} />
        <TouchableOpacity style={styles.button}
                          onPress={() => displayNotification("Test Notification")}>
          <Text style={styles.btnText}>TEST</Text>
        </TouchableOpacity>
        <View style={{height:10}} />
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
    width: 55,
    borderRadius: 4,
    backgroundColor: '#538083',
    marginTop: -5,
    marginLeft: -187
  },
  subHeading: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: width - 60,
  },
  arrow1: {
    marginLeft: -45,
    marginRight: 45
  },
  arrow2: {
    marginLeft: 45,
    marginRight: -45
  },
  dayText: {
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
    fontSize: 30,
    color: '#46B1C9'
  },
  dateText: {
    textAlign: 'center',
    fontFamily: 'Inter-Light',
    fontSize: 22,
    marginTop: -5,
    marginBottom: -5
  },
  notifBox: {
    width: width - 60,
    height: 100,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#84C0C6',
    marginTop: 10
  },
  checkBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: '#84C0C6',
    borderWidth: 1.5,
    marginLeft: 15
  },
  checkDone: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#84C0C6',
    borderColor: '#84C0C6',
    borderWidth: 1.5,
    marginLeft: 15
  },
  medName: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 28,
    color: '#538083'
  },
  pillTime: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15
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
