import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function SchedulerScreen({ navigation, route }) {

  const { user, register } = useContext(AuthContext);
  const { email, password } = route.params;

  // will go to default values or the user's prev settings
  const [changeRoutine, setChangeRoutine] = useState(false);
  const [userData, setUserData] = useState({});
  const [wakeup, setWakeup] = useState("");
  const [bedtime, setBedtime] = useState("");
  const [bfast, setBfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [routine, setRoutine] = useState([
    {title: "Wake-up", "time": wakeup, "AM": false, "PM": false},
    {title: "Bedtime", "time": bedtime, "AM": false, "PM": false},
    {title: "Breakfast", "time": bfast, "AM": false, "PM": false},
    {title: "Lunch", "time": lunch, "AM": false, "PM": false},
    {title: "Dinner", "time": dinner, "AM": false, "PM": false}
  ]);

  useEffect(() => {
    if (user)
      getUserRoutine();
  }, [changeRoutine]);

  function getUserRoutine() {
    fetch(`http://ec2-3-96-185-233.ca-central-1.compute.amazonaws.com:3000/users?userId=${firebase.auth().currentUser.uid}`, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((res) => {
      console.log("in fetch scheduler");
      console.log(res["user"]);
      setWakeup(res["user"]['wakeupHr'] + ":" + res["user"]['wakeupMin']);
      setBedtime(res["user"]['sleepHr'] + ":" + res["user"]['sleepMin']);
      setBfast(res["user"]['breakfastHr'] + ":" + res["user"]['breakfastMin']);
      setLunch(res["user"]['lunchHr'] + ":" + res["user"]['lunchMin']);
      setDinner(res["user"]['dinnerHr'] + ":" + res["user"]['dinnerMin']);
      formatRoutine(res["user"]);

      var data = { token: res["user"]['token'], userID: res["user"]['userId'], schedule: res["user"]['schedule']};
      setUserData(data);
    })
    .catch((error) => {
         console.error(error);
    });
  }

  function formatRoutine(data) {
    setRoutine([
      {title: "Wake-up", "time": formatTime(data['wakeupHr'], data['wakeupMin']),
             "AM": data['wakeupAM'], "PM": !data['wakeupAM']},
      {title: "Bedtime", "time": formatTime(data['sleepHr'], data['sleepMin']),
             "AM": data['sleepAM'], "PM": !data['sleepAM']},
      {title: "Breakfast", "time": formatTime(data['breakfastHr'], data['breakfastMin']),
             "AM": data['breakfastAM'], "PM": !data['breakfastAM']},
      {title: "Lunch", "time": formatTime(data['lunchHr'], data['lunchMin']),
             "AM": data['lunchAM'], "PM": !data['lunchAM']},
      {title: "Dinner", "time": formatTime(data['dinnerHr'], data['dinnerMin']),
             "AM": data['dinnerAM'], "PM": !data['dinnerAM']}
    ]);
  }

  function formatTime(hours, mins) {
    if (mins < 10)
      mins = "0" + mins;
    return hours + ":" + mins;
  }

  function updateRoutine(index, field, newValue) {
    var routineCopy = [...routine];
    var isPM = routineCopy[index]["PM"];
    var isAM = routineCopy[index]["AM"];
    if (field == "time") { // go ahead and update time
      switch(index) {
        case 0:
          setWakeup(newValue);
          break;
        case 1:
          setBedtime(newValue);
          break;
        case 2:
          setBfast(newValue);
          break;
        case 3:
          setLunch(newValue);
          break;
        case 4:
          setDinner(newValue);
          break;
      }
    } else { // only NONE or ONE of AM/PM can be selected
      if (!isPM && !isAM) {
        routineCopy[index][field] = true;
      } else if (isPM && !isAM) {
        routineCopy[index][field] = true;
        routineCopy[index]["PM"] = false;
      } else if (!isPM && isAM) {
        routineCopy[index][field] = true;
        routineCopy[index]["AM"] = false;
      } else {
        routineCopy[index][field] = false;
      }
    }
    setRoutine(routineCopy);
  }

  async function checkInputs() {
    /* Update the state times first for error checking */
    var copy = [...routine];
    for (let i = 0; i < copy.length; i++) {
      switch(i) {
        case 0:
          copy[i]["time"] = wakeup;
          break;
        case 1:
          copy[i]["time"] = bedtime;
          break;
        case 2:
          copy[i]["time"] = bfast;
          break;
        case 3:
          copy[i]["time"] = lunch;
          break;
        case 4:
          copy[i]["time"] = dinner;
          break;
      }
    }
    setRoutine(copy);

    for (let i = 0; i < copy.length; i++) {
      const elem = copy[i];

      if (!elem.AM && !elem.PM) {
        Alert.alert("Please select AM or PM for " + elem.title);
        return;
      } else if (elem.time == "") {
        Alert.alert("Please enter a time for " + elem.title);
        return;
      }

      /* check that time input is okay */
      const timeCheck = elem.time.split(":");
      if (timeCheck.length != 2) {
        Alert.alert("Please enter a time in HH:MM format for " + elem.title);
        return;
      }

      const hours = parseInt(timeCheck[0]);
      const mins = parseInt(timeCheck[1]);
      if (isNaN(hours) || isNaN(mins) || hours < 1 ||
          hours > 12 || mins < 0 || mins >= 60) {
        Alert.alert("Please enter a valid time for " + elem.title);
        return;
      }
    }

    if (!user)
      register(email, password, routine);
    else {
      /* PUT REQUEST HERE TO UPDATE USER'S SCHEDULE */
      const token = await firebase.messaging().getToken();
      const wake = wakeup.split(":");
      const sleep = bedtime.split(":");
      const brfast = bfast.split(":");
      const lnch = lunch.split(":");
      const din = dinner.split(":");

      const wakeHr = (parseInt(wake[0]) === 12 && routine[0]["AM"]) ? 0 : parseInt(wake[0]);
      const sleepHr = (parseInt(sleep[0]) === 12 && routine[1]["AM"]) ? 0 : parseInt(sleep[0]);
      const bfastHr = (parseInt(brfast[0]) === 12 && routine[2]["AM"]) ? 0 : parseInt(brfast[0]);
      const lunchHr = (parseInt(lnch[0]) === 12 && routine[3]["AM"]) ? 0 : parseInt(lnch[0]);
      const dinHr = (parseInt(din[0]) === 12 && routine[4]["AM"]) ? 0 : parseInt(din[0]);

      fetch('http://ec2-3-96-185-233.ca-central-1.compute.amazonaws.com:3000/users', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: token,
          userId: firebase.auth().currentUser.uid,
          wakeupHr: wakeHr,
          wakeupMin: parseInt(wake[1]),
          wakeupAM: routine[0]["AM"],
          sleepHr: sleepHr,
          sleepMin: parseInt(sleep[1]),
          sleepAM: routine[1]["AM"],
          breakfastHr: bfastHr,
          breakfastMin: parseInt(brfast[1]),
          breakfastAM: routine[2]["AM"],
          lunchHr: lunchHr,
          lunchMin: parseInt(lnch[1]),
          lunchAM: routine[3]["AM"],
          dinnerHr: dinHr,
          dinnerMin: parseInt(din[1]),
          dinnerAM: routine[4]["AM"],
          schedule: userData.schedule
        })
      });
      navigation.navigate('Profile');
    }
  }

  return (
    <View style={styles.container}>
      <View style={{height: 20}} />
      <Text style={styles.title}>Smart Scheduler</Text>

      <View style={styles.label}>
        <Text style={styles.labelText}>SLEEP</Text>
      </View>

      <View style={styles.routineComponent}>
        <Ionicons name="sunny" color='#A2E1E2' size={30} style={{marginTop: 3}}/>
        <View style={{width: 7}}/>
        <Text style={styles.bigRoutineText}>Wake-Up:</Text>
        <View style={{width: 7}}/>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            testID="Wakeup"
            placeholder = { routine[0]["time"] ? routine[0]["time"] : "HH:MM"}
            style= {styles.input}
            autoCapitalize='none'
            autoCorrect={false}
            maxLength={5}
            onChangeText={(text) => updateRoutine(0, "time", text)}
          />
          <View style={styles.line} />
        </View>
        <View style={{width: 7}}/>
        <TouchableOpacity style={routine[0]["AM"] ? styles.filledCircle :
                                 styles.openCircle}
                          testID="WakeupAM"
                          onPress={() => updateRoutine(0, "AM", true)}>
        </TouchableOpacity>
        <Text style={styles.timeOption}>AM</Text>
        <View style={{width: 7}}/>
        <TouchableOpacity style={routine[0]["PM"] ? styles.filledCircle :
                                 styles.openCircle}
                          testID="WakeupPM"
                          onPress={() => updateRoutine(0, "PM", true)}>
        </TouchableOpacity>
        <Text style={styles.timeOption}>PM</Text>
      </View>

      <View style={styles.routineComponent}>
        <Ionicons name="moon" color='#A2E1E2' size={30} style={{marginTop: 3}}/>
        <View style={{width: 7}}/>
        <Text style={styles.bigRoutineText}>Bedtime:</Text>
        <View style={{marginLeft: 18, alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            testID="Bedtime"
            placeholder = { routine[1]["time"] ? routine[1]["time"] : "HH:MM" }
            style= {styles.input}
            autoCapitalize='none'
            autoCorrect={false}
            maxLength={5}
            onChangeText={(text) => setBedtime(text)}
          />
          <View style={styles.line} />
        </View>
        <View style={{width: 7}}/>
        <TouchableOpacity style={routine[1]["AM"] ? styles.filledCircle :
                                 styles.openCircle}
                          testID="BedtimeAM"
                          onPress={() => updateRoutine(1, "AM", true)}>
        </TouchableOpacity>
        <Text style={styles.timeOption}>AM</Text>
        <View style={{width: 7}}/>
        <TouchableOpacity style={routine[1]["PM"] ? styles.filledCircle :
                                 styles.openCircle}
                          testID="BedtimePM"
                          onPress={() => updateRoutine(1, "PM", true)}>
        </TouchableOpacity>
        <Text style={styles.timeOption}>PM</Text>
      </View>

      <View style={styles.longLabel}>
        <Text style={styles.labelText}>EATING HABITS</Text>
      </View>

      <View style={styles.routineComponent}>
        <SimpleLineIcons name="cup" color='#A2E1E2' size={30} style={{marginTop: 3}}/>
        <View style={{width: 7}}/>
        <Text style={styles.smallRoutineText}>Breakfast:</Text>
        <View style={{width: 15}}/>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            testID="Breakfast"
            placeholder = { routine[2]["time"] ? routine[2]["time"] : "HH:MM" }
            style= {styles.input}
            autoCapitalize='none'
            autoCorrect={false}
            maxLength={5}
            onChangeText={(text) => setBfast(text)}
          />
          <View style={styles.line} />
        </View>
        <View style={{width: 7}}/>
        <TouchableOpacity style={routine[2]["AM"] ? styles.filledCircle :
                                 styles.openCircle}
                          testID="BreakfastAM"
                          onPress={() => updateRoutine(2, "AM", true)}>
        </TouchableOpacity>
        <Text style={styles.timeOption}>AM</Text>
        <View style={{width: 7}}/>
        <TouchableOpacity style={routine[2]["PM"] ? styles.filledCircle :
                                 styles.openCircle}
                          testID="BreakfastPM"
                          onPress={() => updateRoutine(2, "PM", true)}>
        </TouchableOpacity>
        <Text style={styles.timeOption}>PM</Text>
      </View>

      <View style={styles.routineComponent}>
        <Ionicons name="fast-food" color='#A2E1E2' size={30} style={{marginTop: 3}}/>
        <View style={{width: 7}}/>
        <Text style={styles.bigRoutineText}>Lunch:</Text>
        <View style={{width: 45}}/>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            testID="Lunch"
            placeholder = { routine[3]["time"] ? routine[3]["time"] : "HH:MM" }
            style= {styles.input}
            autoCapitalize='none'
            autoCorrect={false}
            maxLength={5}
            onChangeText={(text) => setLunch(text)}
          />
          <View style={styles.line} />
        </View>
        <View style={{width: 7}}/>
        <TouchableOpacity style={routine[3]["AM"] ? styles.filledCircle :
                                 styles.openCircle}
                          testID="LunchAM"
                          onPress={() => updateRoutine(3, "AM", true)}>
        </TouchableOpacity>
        <Text style={styles.timeOption}>AM</Text>
        <View style={{width: 7}}/>
        <TouchableOpacity style={routine[3]["PM"] ? styles.filledCircle :
                                 styles.openCircle}
                          testID="LunchPM"
                          onPress={() => updateRoutine(3, "PM", true)}>
        </TouchableOpacity>
        <Text style={styles.timeOption}>PM</Text>
      </View>

      <View style={styles.routineComponent}>
        <MaterialCommunityIcons name="silverware-fork-knife" color='#A2E1E2'
                                size={30} style={{marginTop: 3}}/>
        <View style={{width: 7}}/>
        <Text style={styles.bigRoutineText}>Dinner:</Text>
        <View style={{width: 39}}/>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            testID="Dinner"
            placeholder = { routine[4]["time"] ? routine[4]["time"] : "HH:MM" }
            style= {styles.input}
            autoCapitalize='none'
            autoCorrect={false}
            maxLength={5}
            onChangeText={(text) => setDinner(text)}
          />
          <View style={styles.line} />
        </View>
        <View style={{width: 7}}/>
        <TouchableOpacity style={routine[4]["AM"] ? styles.filledCircle :
                                 styles.openCircle}
                          testID="DinnerAM"
                          onPress={() => updateRoutine(4, "AM", true)}>
        </TouchableOpacity>
        <Text style={styles.timeOption}>AM</Text>
        <View style={{width: 7}}/>
        <TouchableOpacity style={routine[4]["PM"] ? styles.filledCircle :
                                 styles.openCircle}
                          testID="DinnerPM"
                          onPress={() => updateRoutine(4, "PM", true)}>
        </TouchableOpacity>
        <Text style={styles.timeOption}>PM</Text>
      </View>

      <TouchableOpacity style={styles.submitButton}
                        onPress={() => checkInputs()}>
        <Text style={styles.submitText}>SUBMIT</Text>
      </TouchableOpacity>

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
  label: {
    backgroundColor: '#538083',
    height: 35,
    width: 170,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 30
  },
  longLabel: {
    backgroundColor: '#538083',
    height: 35,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 30
  },
  labelText: {
    fontFamily: 'Inter-Medium',
    fontSize: 22,
    color: '#fff'
  },
  routineComponent: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bigRoutineText: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 25,
    color: '#538083'
  },
  smallRoutineText: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 22,
    color: '#538083'
  },
  input: {
    width: 60,
    fontSize: 19,
    textAlign: 'center',
    fontFamily: 'Inter-Light',
    fontStyle: 'italic'
  },
  line: {
    height: 0.75,
    width: 65,
    marginTop: -8,
    backgroundColor:'#46B1C9'
  },
  filledCircle: {
    backgroundColor: '#538083',
    borderRadius: 10,
    height: 20,
    width: 20,
    marginTop: 3
  },
  openCircle: {
    borderColor: '#538083',
    borderWidth: 1,
    borderRadius: 10,
    height: 20,
    width: 20,
    marginTop: 3
  },
  timeOption: {
    fontFamily: 'Inter-Light',
    fontSize: 20,
    marginTop: 3,
    marginLeft: 5
  },
  submitButton: {
    width: 140,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#46B1C9',
    borderRadius: 25,
    marginTop: 50
  },
  submitText: {
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    color: '#46B1C9'
  }
});

export default SchedulerScreen;
