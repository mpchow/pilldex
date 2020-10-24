import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

function PillInfoScreen({ navigation, route }) {
  const { pillName, pillAmount } = route.params;
  return (
    
     <View style={styles.container}>
     <Text style={styles.title}>{pillName}</Text>
     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Pill Info Screen for {pillName} and there are only {pillAmount} left</Text>
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

export default PillInfoScreen;
