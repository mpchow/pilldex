import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import Logo from '../components/Logo';
import auth, { firebase } from '@react-native-firebase/auth';

function NewUserScreen({ navigation }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pw, confirmPW] = useState("");

  const { register } = useContext(AuthContext);

  function checkFields() {
    if (password.length < 6) {
      Alert.alert("This password is too weak, please enter a new one");
      return;
    } else if (email.split('@').length != 2) {
      Alert.alert("Invalid Email Address");
      return;
    } else if (pw != password) {
      Alert.alert("Passwords do not match!");
      return;
    }

    navigation.navigate('Scheduler', {email: email, password: password});
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <View style={{height: 30}} />
      <Logo />
      <TextInput
          placeholder = "Full Name"
          style= {styles.input}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText = {(text) => setName(text)}
      />
      <TextInput
          testID="Email-Input"
          placeholder = "Email"
          style= {styles.input}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText = {(text) => setEmail(text)}
      />
      <TextInput
          testID="Password-Input"
          placeholder = "Password"
          secureTextEntry={true}
          style= {styles.input}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText = {(text) => setPassword(text)}
      />
      <TextInput
          testID="Password-Confirm"
          placeholder = "Confirm Password"
          secureTextEntry={true}
          style= {styles.input}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText = {(text) => confirmPW(text)}
      />


      <View style={{flexDirection: 'row', padding: 10, justifyContent:'space-between'}}>
        <TouchableOpacity style={styles.button}
                          onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
                          onPress={() => checkFields()}>
          <Text style={styles.btnText}>CREATE ACCOUNT</Text>
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
  },
  title: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 40,
    color: '#538083'
  },
  input: {
    width: 315,
    height: 50,
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 5,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,
    fontFamily: 'Inter-Light'
  },
  text: {
    fontFamily: 'Quicksand',
    fontSize: 20, color: '#000000',
    paddingTop: 26,
  },
  button: {
    height: 60,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9FB7B9',
    borderRadius: 35,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5
  },
  btnText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  },
});


export default NewUserScreen;
