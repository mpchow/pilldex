import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const width = Dimensions.get('window').width;

function ProfileScreen({ navigation }) {

  const { logout } = useContext(AuthContext);

  function signOut() {
    Alert.alert('Sign Out',
      'Sign out of pilldex?',
      [{
          text: 'Yes',
          onPress: () => logout()
       },
       {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
       }],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.container}>
      <View style={{height: 20}} />
      <Text style={styles.title}>My Profile</Text>
      <View style={{height: 35}} />
      <View style={styles.profileOption}>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center'}}
                          onPress={() => navigation.navigate('Scheduler', {email: "", password: ""})}>
          <Text style={styles.optionText}>Smart Schedule</Text>
          <SimpleLineIcons style={{marginLeft: 128, marginBottom: 3}}
                           name="arrow-right" color='#538083' size={23}
          />
        </TouchableOpacity>
        <View style={styles.line} />
      </View>
      <TouchableOpacity style={styles.button}
                        onPress={() => signOut()}>
        <Text style={styles.btnText}>LOG OUT</Text>
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
  profileOption: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  optionText: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 24,
    color: '#538083'
  },
  line: {
    height: 0.75,
    width: width - 60,
    backgroundColor: '#84C0C6'
  },
  button: {
    height: 60,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: '#9FB7B9',
    borderRadius: 35,
    marginTop: 300,
    marginLeft: 5
  },
  btnText: {
    fontFamily: 'Inter-SemiBold',
    color: '#9FB7B9',
    fontSize: 20,
    textAlign: 'center'
  }
});

export default ProfileScreen;
