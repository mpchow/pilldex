import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function SchedulerScreen({ navigation }) {
  // will go to default values or the user's prev settings
  const [routine, setRoutine] = useState([
    {"time": "07:00", "AM": false, "PM": false},
    {"time": "22:00", "AM": false, "PM": false},
    {"time": "08:00", "AM": false, "PM": false},
    {"time": "12:00", "AM": false, "PM": false},
    {"time": "18:00", "AM": false, "PM": false}
  ]);

  function updateRoutine(index, field, newValue) {
    var routineCopy = [...routine];
    var isPM = routineCopy[index]["PM"];
    var isAM = routineCopy[index]["AM"];
    if (field == "time") { // go ahead and update time
      routineCopy[index][field] = newValue;
    }
    // if AM is already TRUE and PM is FALSE, deselect AM
    // if AM is FALSE and PM is TRUE, select AM and deselect PM
    // if AM and PM are BOTH FALSE, select AM and without touching PM

    // if PM is already TRUE and AM is FALSE, deselect PM
    // if PM is FALSE and AM is TRUE, select PM and deselect AM
    // if PM and AM are BOTH FALSE, select PM and without touching AM
    else if (field == "AM") { // only NONE or ONE of AM/PM can be selected
      if (!isPM && !isAM) {
        routineCopy[index][field] = true; // set AM to true
      } else if (isPM && !isAM) {
        routineCopy[index][field] = true;
        routineCopy[index]["PM"] = false;
      } else {
        routineCopy[index][field] = false;
      }
    } else {
      if (!isPM && !isAM) {
        routineCopy[index][field] = true; // set PM to true
      } else if (!isPM && isAM) {
        routineCopy[index][field] = true;
        routineCopy[index]["AM"] = false;
      } else {
        routineCopy[index][field] = false;
      }
    }
    setRoutine(routineCopy);
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
            placeholder = {routine[0]["time"]}
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
                          onPress={() => updateRoutine(0, "AM", true)}>
        </TouchableOpacity>
        <Text style={styles.timeOption}>AM</Text>
        <View style={{width: 7}}/>
        <TouchableOpacity style={routine[0]["PM"] ? styles.filledCircle :
                                 styles.openCircle}
                          onPress={() => updateRoutine(0, "PM", true)}>
        </TouchableOpacity>
        <Text style={styles.timeOption}>PM</Text>
      </View>

      <View style={styles.routineComponent}>
        <Ionicons name="sunny" color='#A2E1E2' size={30} style={{marginTop: 3}}/>
        <View style={{width: 7}}/>
        <Text style={styles.bigRoutineText}>Bedtime:</Text>
        <View style={{width: 7}}/>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            placeholder = {routine[1]["time"]}
            style= {styles.input}
            autoCapitalize='none'
            autoCorrect={false}
            maxLength={5}
            onChangeText={(text) => updateRoutine(1, "time", text)}
          />
          <View style={styles.line} />
        </View>
        <View style={{width: 7}}/>
        <TouchableOpacity style={routine[1]["AM"] ? styles.filledCircle :
                                 styles.openCircle}
                          onPress={() => updateRoutine(1, "AM", true)}>
        </TouchableOpacity>
        <Text style={styles.timeOption}>AM</Text>
        <View style={{width: 7}}/>
        <TouchableOpacity style={routine[1]["PM"] ? styles.filledCircle :
                                 styles.openCircle}
                          onPress={() => updateRoutine(1, "PM", true)}>
        </TouchableOpacity>
        <Text style={styles.timeOption}>PM</Text>
      </View>

      <View style={styles.longLabel}>
        <Text style={styles.labelText}>EATING HABITS</Text>
      </View>

      <View style={styles.routineComponent}>
        <Ionicons name="sunny" color='#A2E1E2' size={30} style={{marginTop: 3}}/>
        <View style={{width: 7}}/>
        <Text style={styles.bigRoutineText}>Breakfast:</Text>
        <View style={{width: 7}}/>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            placeholder = {routine[2]["time"]}
            style= {styles.input}
            autoCapitalize='none'
            autoCorrect={false}
            maxLength={5}
            onChangeText={(text) => updateRoutine(2, "time", text)}
          />
          <View style={styles.line} />
        </View>
        <View style={{width: 7}}/>
        <TouchableOpacity style={routine[2]["AM"] ? styles.filledCircle :
                                 styles.openCircle}
                          onPress={() => updateRoutine(2, "AM", true)}>
        </TouchableOpacity>
        <Text style={styles.timeOption}>AM</Text>
        <View style={{width: 7}}/>
        <TouchableOpacity style={routine[2]["PM"] ? styles.filledCircle :
                                 styles.openCircle}
                          onPress={() => updateRoutine(2, "PM", true)}>
        </TouchableOpacity>
        <Text style={styles.timeOption}>PM</Text>
      </View>

      <View style={styles.routineComponent}>
        <Ionicons name="sunny" color='#A2E1E2' size={30} style={{marginTop: 3}}/>
        <View style={{width: 7}}/>
        <Text style={styles.bigRoutineText}>Lunch:</Text>
        <View style={{width: 7}}/>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            placeholder = {routine[3]["time"]}
            style= {styles.input}
            autoCapitalize='none'
            autoCorrect={false}
            maxLength={5}
            onChangeText={(text) => updateRoutine(3, "time", text)}
          />
          <View style={styles.line} />
        </View>
        <View style={{width: 7}}/>
        <TouchableOpacity style={routine[3]["AM"] ? styles.filledCircle :
                                 styles.openCircle}
                          onPress={() => updateRoutine(3, "AM", true)}>
        </TouchableOpacity>
        <Text style={styles.timeOption}>AM</Text>
        <View style={{width: 7}}/>
        <TouchableOpacity style={routine[3]["PM"] ? styles.filledCircle :
                                 styles.openCircle}
                          onPress={() => updateRoutine(3, "PM", true)}>
        </TouchableOpacity>
        <Text style={styles.timeOption}>PM</Text>
      </View>

      <View style={styles.routineComponent}>
        <Ionicons name="sunny" color='#A2E1E2' size={30} style={{marginTop: 3}}/>
        <View style={{width: 7}}/>
        <Text style={styles.bigRoutineText}>Dinner:</Text>
        <View style={{width: 7}}/>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            placeholder = {routine[4]["time"]}
            style= {styles.input}
            autoCapitalize='none'
            autoCorrect={false}
            maxLength={5}
            onChangeText={(text) => updateRoutine(4, "time", text)}
          />
          <View style={styles.line} />
        </View>
        <View style={{width: 7}}/>
        <TouchableOpacity style={routine[4]["AM"] ? styles.filledCircle :
                                 styles.openCircle}
                          onPress={() => updateRoutine(4, "AM", true)}>
        </TouchableOpacity>
        <Text style={styles.timeOption}>AM</Text>
        <View style={{width: 7}}/>
        <TouchableOpacity style={routine[4]["PM"] ? styles.filledCircle :
                                 styles.openCircle}
                          onPress={() => updateRoutine(4, "PM", true)}>
        </TouchableOpacity>
        <Text style={styles.timeOption}>PM</Text>
      </View>

      <TouchableOpacity style={styles.submitButton}
                        onPress={() => navigation.goBack()}>
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
